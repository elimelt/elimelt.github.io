import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import html2canvas from "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm";

const STYLES = `
  :host { display: block; width: 100%; }
  .toggle { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; opacity: 0.6; cursor: pointer; user-select: none; margin-bottom: 0.5rem; }
  .toggle:hover { opacity: 1; }
  .toggle input { cursor: pointer; }
  .content { display: block; }
  .content a { color: var(--accent); }
  canvas { display: block; width: 100%; height: auto; }
`;

class ClothPhysics {
  constructor(width, height, segmentsX = 20) {
    this.width = width;
    this.height = height;
    this.segmentsX = segmentsX;
    this.segmentsY = Math.round(segmentsX * (height / width));
    this.damping = 0.97;
    this.gravity = 0.0004;
    this.timestepSq = 0.5;
    this.particles = [];
    this.constraints = [];
    this.initParticles();
    this.initConstraints();
  }

  initParticles() {
    const startX = -this.width / 2;
    const startY = this.height / 2;
    const segW = this.width / this.segmentsX;
    const segH = this.height / this.segmentsY;

    for (let y = 0; y <= this.segmentsY; y++) {
      for (let x = 0; x <= this.segmentsX; x++) {
        const px = startX + x * segW;
        const py = startY - y * segH;
        this.particles.push({
          pos: new THREE.Vector3(px, py, 0),
          prev: new THREE.Vector3(px, py, 0),
          restX: px,
          restY: py,
          pinned: y === 0,
          dragging: false,
        });
      }
    }
  }

  initConstraints() {
    const cols = this.segmentsX + 1;
    const segW = this.width / this.segmentsX;
    const segH = this.height / this.segmentsY;
    const diag = Math.sqrt(segW * segW + segH * segH);

    for (let y = 0; y <= this.segmentsY; y++) {
      for (let x = 0; x <= this.segmentsX; x++) {
        const i = y * cols + x;
        if (x < this.segmentsX)
          this.constraints.push({ p1: i, p2: i + 1, rest: segW });
        if (y < this.segmentsY)
          this.constraints.push({ p1: i, p2: i + cols, rest: segH });
        if (x < this.segmentsX && y < this.segmentsY) {
          this.constraints.push({ p1: i, p2: i + cols + 1, rest: diag });
          this.constraints.push({ p1: i + 1, p2: i + cols, rest: diag });
        }
      }
    }
  }

  simulate() {
    const ceilingY = this.height / 2;
    const floorY = -this.height / 2;
    const rollRadius = 40;

    for (const p of this.particles) {
      if (p.pinned || p.dragging) continue;

      const vel = p.pos.clone().sub(p.prev).multiplyScalar(this.damping);
      p.prev.copy(p.pos);
      p.pos.add(vel);

      p.pos.y -= this.gravity * this.timestepSq;
      p.pos.y += (p.restY - p.pos.y) * 0.02;
      p.pos.x += (p.restX - p.pos.x) * 0.02;
      p.pos.z *= 0.9;

      if (p.pos.y > ceilingY) {
        const excess = p.pos.y - ceilingY;
        const angle = Math.min(excess / rollRadius, Math.PI * 0.8);
        p.pos.y = ceilingY + Math.sin(angle) * rollRadius * 0.2;
        p.pos.z = -Math.cos(angle) * rollRadius * 0.3 - 10;
      }

      if (p.pos.y < floorY) {
        p.pos.y = floorY;
        p.prev.y = floorY;
      }
    }

    for (let iter = 0; iter < 4; iter++) {
      for (const c of this.constraints) {
        const p1 = this.particles[c.p1];
        const p2 = this.particles[c.p2];
        if (p1.dragging && p2.dragging) continue;

        const diff = p2.pos.clone().sub(p1.pos);
        const dist = diff.length();
        if (dist === 0) continue;

        const correction = diff.multiplyScalar((dist - c.rest) / dist / 2);
        if (!p1.pinned && !p1.dragging) p1.pos.add(correction);
        if (!p2.pinned && !p2.dragging) p2.pos.sub(correction);
      }
    }
  }

  findNearest(x, y, maxDist = 100) {
    let nearest = null;
    let minDist = maxDist * maxDist;
    for (const p of this.particles) {
      if (p.pinned) continue;
      const dist = (p.pos.x - x) ** 2 + (p.pos.y - y) ** 2;
      if (dist < minDist) {
        minDist = dist;
        nearest = p;
      }
    }
    return nearest;
  }
}

class ClothRenderer {
  constructor(shadowRoot, texture, physics) {
    this.shadowRoot = shadowRoot;
    this.physics = physics;
    this.scale = window.devicePixelRatio || 2;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -physics.width / 2,
      physics.width / 2,
      physics.height / 2,
      -physics.height / 2,
      1,
      2000
    );
    this.camera.position.z = 500;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(this.scale);
    this.renderer.setSize(physics.width, physics.height);
    this.renderer.domElement.style.pointerEvents = "auto";
    shadowRoot.appendChild(this.renderer.domElement);

    this.texture = new THREE.CanvasTexture(texture);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false;

    this.geometry = new THREE.PlaneGeometry(
      physics.width,
      physics.height,
      physics.segmentsX,
      physics.segmentsY
    );
    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.scene.add(this.mesh);
  }

  update() {
    const positions = this.geometry.attributes.position.array;
    for (let i = 0; i < this.physics.particles.length; i++) {
      positions[i * 3] = this.physics.particles[i].pos.x;
      positions[i * 3 + 1] = this.physics.particles[i].pos.y;
      positions[i * 3 + 2] = this.physics.particles[i].pos.z;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
    this.renderer.render(this.scene, this.camera);
  }

  updateTexture(canvas) {
    this.texture.image = canvas;
    this.texture.needsUpdate = true;
  }

  dispose() {
    this.renderer.dispose();
    this.geometry.dispose();
    this.texture.dispose();
  }
}

class ClothContent extends HTMLElement {
  static get observedAttributes() {
    return ["wiggle"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.initialized = false;
  }

  connectedCallback() {
    this.wiggleEnabled = this.getAttribute("wiggle") === "true";
    this.init();
  }

  attributeChangedCallback(name, _old, val) {
    if (name === "wiggle" && this.initialized) this.setWiggle(val === "true");
  }

  disconnectedCallback() {
    this.cleanup();
    if (this.liveContent?.parentNode)
      this.liveContent.parentNode.removeChild(this.liveContent);
  }

  async init() {
    this.width = this.offsetWidth || 720;
    this.liveContent = document.createElement("div");
    while (this.firstChild) this.liveContent.appendChild(this.firstChild);

    this.setupStyles();
    this.setupToggle();

    if (!this.wiggleEnabled) {
      this.showHTML();
      this.initialized = true;
      return;
    }

    await this.showCloth();
    this.initialized = true;
  }

  setupStyles() {
    const style = document.createElement("style");
    style.textContent = STYLES;
    this.shadowRoot.appendChild(style);
  }

  setupToggle() {
    const label = document.createElement("label");
    label.className = "toggle";
    label.innerHTML = `<input type="checkbox" ${
      this.wiggleEnabled ? "checked" : ""
    }/> wiggle`;
    this.checkbox = label.querySelector("input");
    this.checkbox.addEventListener("change", () =>
      this.setWiggle(this.checkbox.checked)
    );
    this.shadowRoot.appendChild(label);
  }

  setWiggle(enabled) {
    this.wiggleEnabled = enabled;
    if (this.checkbox) this.checkbox.checked = enabled;
    enabled ? this.showCloth() : this.showHTML();
  }

  showHTML() {
    this.cleanup();
    this.shadowRoot.querySelector("canvas")?.remove();
    this.liveContent.style.cssText = "";
    this.liveContent.className = "content";
    if (this.liveContent.parentNode === document.body)
      document.body.removeChild(this.liveContent);
    this.shadowRoot.appendChild(this.liveContent);
  }

  async showCloth() {
    if (this.liveContent.parentNode === this.shadowRoot)
      this.shadowRoot.removeChild(this.liveContent);
    this.captureComputedColors();
    this.moveLiveContentOffscreen();

    await new Promise((r) => requestAnimationFrame(r));
    await document.fonts.ready;

    try {
      const canvas = await this.capture();
      this.physics = new ClothPhysics(this.contentWidth, this.contentHeight);
      this.clothRenderer = new ClothRenderer(
        this.shadowRoot,
        canvas,
        this.physics
      );
      this.setupInteraction();
      this.setupResizeObserver();
      this.setupThemeObserver();
      this.animate();
      setTimeout(() => this.recapture(), 2000);
    } catch (e) {
      this.showHTML();
    }
  }

  captureComputedColors() {
    const self = getComputedStyle(this);
    this.computedColors = {
      text: self.color,
      font: self.fontFamily,
      fontSize: self.fontSize,
      lineHeight: self.lineHeight,
      links: [],
    };
    this.liveContent.querySelectorAll("a").forEach((a) => {
      this.computedColors.links.push({
        el: a,
        color: getComputedStyle(a).color,
      });
    });
  }

  moveLiveContentOffscreen() {
    this.liveContent.style.cssText = `
      position: fixed; left: -9999px; top: 0; width: ${
        this.width
      }px; padding: 0;
      background: transparent; color: ${this.computedColors.text};
      font-family: ${this.computedColors.font || "system-ui"};
      font-size: ${this.computedColors.fontSize || "16px"};
      line-height: ${this.computedColors.lineHeight || "1.5"};
    `;

    this.computedColors.links.forEach(({ el, color }) => {
      el.style.color = color;
    });

    if (!this.liveContent.parentNode)
      document.body.appendChild(this.liveContent);
  }

  async capture() {
    const canvas = await html2canvas(this.liveContent, {
      backgroundColor: null,
      scale: window.devicePixelRatio || 2,
      useCORS: true,
      logging: false,
    });
    this.contentWidth = this.liveContent.offsetWidth;
    this.contentHeight = this.liveContent.offsetHeight;
    if (!this.contentWidth || !this.contentHeight)
      throw new Error("Zero dimensions");
    return canvas;
  }

  async recapture() {
    if (this.isRecapturing || !this.clothRenderer) return;
    this.isRecapturing = true;
    try {
      const canvas = await this.capture();
      this.clothRenderer.updateTexture(canvas);
    } catch (e) {}
    this.isRecapturing = false;
  }

  setupInteraction() {
    const toWorld = (e) => {
      const rect = this.getBoundingClientRect();
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      return {
        x: ((cx - rect.left) / rect.width - 0.5) * this.physics.width,
        y: (0.5 - (cy - rect.top) / rect.height) * this.physics.height,
      };
    };

    let dragP = null;
    this.addEventListener("mousedown", (e) => {
      dragP = this.physics.findNearest(toWorld(e).x, toWorld(e).y);
      if (dragP) dragP.dragging = true;
    });
    this.addEventListener("mousemove", (e) => {
      if (dragP) {
        const p = toWorld(e);
        dragP.pos.x = dragP.prev.x = p.x;
        dragP.pos.y = dragP.prev.y = p.y;
      }
    });
    const endMouse = () => {
      if (dragP) dragP.dragging = false;
      dragP = null;
    };
    this.addEventListener("mouseup", endMouse);
    this.addEventListener("mouseleave", endMouse);

    let touchP = null,
      touchStart = { x: 0, y: 0 },
      isTouchDrag = false;
    this.addEventListener(
      "touchstart",
      (e) => {
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchP = this.physics.findNearest(toWorld(e).x, toWorld(e).y);
        isTouchDrag = false;
      },
      { passive: true }
    );
    this.addEventListener(
      "touchmove",
      (e) => {
        if (!touchP) return;
        const dx = Math.abs(e.touches[0].clientX - touchStart.x),
          dy = Math.abs(e.touches[0].clientY - touchStart.y);
        if (!isTouchDrag && dx > 10 && dx > dy) {
          isTouchDrag = true;
          touchP.dragging = true;
        }
        if (isTouchDrag) {
          e.preventDefault();
          const p = toWorld(e);
          touchP.pos.x = touchP.prev.x = p.x;
          touchP.pos.y = touchP.prev.y = p.y;
        }
      },
      { passive: false }
    );
    this.addEventListener("touchend", () => {
      if (touchP) touchP.dragging = false;
      touchP = null;
      isTouchDrag = false;
    });
  }

  setupResizeObserver() {
    const target =
      document.querySelector(".main-content") || this.parentElement || this;
    this.resizeObserver = new ResizeObserver(() => {
      const newW = this.offsetWidth;
      if (newW > 0 && Math.abs(newW - this.width) > 10) this.handleResize();
    });
    this.resizeObserver.observe(target);
  }

  setupThemeObserver() {
    this.themeObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class" && this.wiggleEnabled) {
          this.handleThemeChange();
          break;
        }
      }
    });
    this.themeObserver.observe(document.body, { attributes: true });
  }

  async handleThemeChange() {
    if (this.isChangingTheme || !this.clothRenderer) return;
    this.isChangingTheme = true;

    if (this.liveContent.parentNode === document.body) {
      document.body.removeChild(this.liveContent);
    }
    this.shadowRoot.appendChild(this.liveContent);
    this.liveContent.style.cssText = "";

    await new Promise((r) => requestAnimationFrame(r));
    this.captureComputedColors();
    this.moveLiveContentOffscreen();

    await new Promise((r) => requestAnimationFrame(r));
    try {
      const canvas = await this.capture();
      this.clothRenderer.updateTexture(canvas);
    } catch (e) {}
    this.isChangingTheme = false;
  }

  async handleResize() {
    if (this.isResizing) return;
    this.isResizing = true;
    this.cleanup();
    this.width = this.offsetWidth || 720;
    this.liveContent.style.width = this.width + "px";
    await new Promise((r) => requestAnimationFrame(r));
    try {
      const canvas = await this.capture();
      this.physics = new ClothPhysics(this.contentWidth, this.contentHeight);
      this.clothRenderer = new ClothRenderer(
        this.shadowRoot,
        canvas,
        this.physics
      );
      this.setupInteraction();
      this.animate();
    } catch (e) {}
    this.isResizing = false;
  }

  animate() {
    if (!this.isConnected || !this.physics) return;
    this.animationId = requestAnimationFrame(() => this.animate());
    this.physics.simulate();
    this.clothRenderer.update();
  }

  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.themeObserver) {
      this.themeObserver.disconnect();
      this.themeObserver = null;
    }
    if (this.clothRenderer) {
      this.clothRenderer.dispose();
      this.clothRenderer = null;
    }
    this.physics = null;
  }
}

customElements.define("cloth-content", ClothContent);
