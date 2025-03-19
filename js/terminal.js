/**
 * terminal.js
 * Creates a typewriter effect for the terminal output
 */

(function() {
  const terminalOutput = document.getElementById('terminal-output');
  
  // The text to type out
  const aboutText = `
Hello! I'm Elijah Melton, a software engineer.

My technical interests include:
- Distributed systems architecture
- Performance optimization
- System reliability engineering
- Open source development

When I'm not coding, you might find me exploring the latest in computer science research, contributing to open source projects, or diving into technical papers.

I believe in writing clean, maintainable code and building systems that gracefully handle failure.

Type 'help' for more commands...just kidding, this isn't a real terminal. But it could be! ;)
  `.trim();

  let i = 0;
  const speed = 20; // typing speed in milliseconds

  function typeWriter() {
    if (i < aboutText.length) {
      // Handle special characters for HTML display
      const char = aboutText.charAt(i);
      if (char === '\n') {
        terminalOutput.innerHTML += '<br>';
      } else if (char === ' ' && aboutText.charAt(i-1) === '\n') {
        terminalOutput.innerHTML += '&nbsp;';
      } else {
        terminalOutput.innerHTML += aboutText.charAt(i);
      }
      i++;
      
      // Random slight variation in typing speed for realism
      const randomSpeed = speed + Math.random() * 30 - 15;
      
      // Pause longer at the end of sentences and paragraphs
      const nextChar = aboutText.charAt(i);
      const currentChar = aboutText.charAt(i-1);
      let timeout = randomSpeed;
      
      if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
        timeout = speed * 5;
      } else if (currentChar === '\n') {
        timeout = speed * 3;
      }
      
      setTimeout(typeWriter, timeout);
    }
  }

  // Start typing when the element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Check if element is in viewport on scroll
  let hasStartedTyping = false;
  
  function checkScroll() {
    if (!hasStartedTyping && isInViewport(terminalOutput)) {
      hasStartedTyping = true;
      typeWriter();
      window.removeEventListener('scroll', checkScroll);
    }
  }

  // Initial check in case the element is already in viewport
  checkScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', checkScroll);
})();