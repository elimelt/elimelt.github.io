const BASE_URL = 'https://blink.tail8ab50a.ts.net:8443';
const PAGE_SIZE = 50;

const state = {
  connection: 'closed',
  channel: 'general',
  messages: [],
  inputText: '',
  unsentQueue: [],
  reconnectAttempts: 0,
  nextBefore: null,
  isLoadingHistory: false,
  hasMoreHistory: true,
  seenKeys: new Set()
};

let ws = null;
let visitorWs = null;
const minDelay = 2000;
const maxDelay = 10000;
const maxRetries = 5;

let chatReconnectDelay = minDelay;
let chatRetries = 0;
let visitorRetries = 0;
let chatReconnectTimer = null;
let visitorReconnectTimer = null;

function getMessageKey(msg) {
  const id = msg.visitor?.ip || msg.ip || msg.sender || "";
  const content = msg.text || msg.type || "";
  return `${msg.timestamp}|${id}|${content}`;
}

function isDuplicate(msg) {
  const key = getMessageKey(msg);
  if (state.seenKeys.has(key)) return true;
  state.seenKeys.add(key);
  return false;
}

function getWsUrl(channel) {
  return `wss://blink.tail8ab50a.ts.net:8443/ws/chat/${encodeURIComponent(
    channel
  )}`;
}

function setConnection(status, showRetry = false) {
  state.connection = status;
  const statusEl = document.getElementById("chat-status");
  const sendBtn = document.getElementById("chat-send-btn");
  const retryBtn = document.getElementById("chat-retry-btn");
  if (statusEl) statusEl.textContent = status;
  if (sendBtn) sendBtn.disabled = status !== "open";
  if (retryBtn) retryBtn.style.display = showRetry ? "inline-block" : "none";
}

function setLoading(loading) {
  state.isLoadingHistory = loading;
  const loader = document.getElementById("chat-loader");
  if (loader) loader.style.display = loading ? "block" : "none";
}

function createMessageElement(msg) {
  const item = document.createElement("div");
  const isPresence = msg.type === "join" || msg.type === "leave";
  item.className = isPresence ? "chat-event" : "chat-msg";

  if (isPresence) {
    const ip = msg.visitor?.ip || msg.ip || "unknown";
    const action = msg.type === "join" ? "connected" : "disconnected";
    const time = new Date(
      msg.timestamp || msg.visitor?.connected_at || Date.now()
    ).toLocaleTimeString();
    item.textContent = `${ip} ${action} • ${time}`;
  } else {
    const meta = document.createElement("div");
    meta.className = "chat-meta";
    meta.textContent = `${msg.sender ?? "unknown"} • ${new Date(
      msg.timestamp ?? Date.now()
    ).toLocaleTimeString()}`;
    const text = document.createElement("div");
    text.className = "chat-text";
    text.textContent = msg.text;
    item.appendChild(meta);
    item.appendChild(text);
  }
  return item;
}

function renderMessageAtBottom(msg, autoScroll = true) {
  const msgsEl = document.getElementById("chat-messages");
  if (!msgsEl) return;
  const item = createMessageElement(msg);
  msgsEl.appendChild(item);
  if (autoScroll) msgsEl.scrollTop = msgsEl.scrollHeight;
}

function renderMessagesAtTop(messages) {
  const msgsEl = document.getElementById("chat-messages");
  if (!msgsEl) return;
  const prevScrollHeight = msgsEl.scrollHeight;
  const fragment = document.createDocumentFragment();
  messages.forEach((msg) => fragment.appendChild(createMessageElement(msg)));
  msgsEl.insertBefore(fragment, msgsEl.firstChild);
  msgsEl.scrollTop = msgsEl.scrollHeight - prevScrollHeight;
}

async function fetchHistory(initial = false) {
  if (state.isLoadingHistory || (!initial && !state.hasMoreHistory)) return;
  setLoading(true);

  const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
  if (state.nextBefore && !initial) params.set("before", state.nextBefore);

  try {
    const res = await fetch(
      `${BASE_URL}/chat/${encodeURIComponent(state.channel)}/history?${params}`
    );
    const body = await res.json();
    const msgs = (body.messages || []).filter((m) => !isDuplicate(m));

    if (msgs.length === 0) {
      state.hasMoreHistory = false;
    } else {
      msgs.reverse();
      state.messages = [...msgs, ...state.messages];
      state.nextBefore = body.next_before || state.nextBefore;
      renderMessagesAtTop(msgs);
    }
  } catch (err) {
    console.error("Failed to fetch history:", err);
  } finally {
    setLoading(false);
  }
}

async function fetchPresenceEvents(before) {
  const params = new URLSearchParams({
    topic: "visitor_updates",
    limit: "100",
  });
  if (before) params.set("before", before);

  const results = [];
  for (const type of ["join", "leave"]) {
    params.set("type", type);
    try {
      const res = await fetch(`${BASE_URL}/events?${params}`);
      const body = await res.json();
      const events = (body.events || body.messages || []).map((e) => ({
        ...e,
        type,
        ip: e.visitor?.ip || e.ip,
        timestamp: e.timestamp || e.visitor?.connected_at,
      }));
      results.push(...events);
    } catch (err) {
      console.error(`Failed to fetch ${type} events:`, err);
    }
  }
  return results
    .filter((e) => !isDuplicate(e))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

function handleScroll() {
  const msgsEl = document.getElementById("chat-messages");
  if (!msgsEl) return;
  if (
    msgsEl.scrollTop < 50 &&
    !state.isLoadingHistory &&
    state.hasMoreHistory
  ) {
    fetchHistory();
  }
}

function connectChat() {
  if (chatReconnectTimer) {
    clearTimeout(chatReconnectTimer);
    chatReconnectTimer = null;
  }

  if (ws) {
    ws.onclose = null;
    ws.close();
  }

  if (chatRetries >= maxRetries) {
    setConnection("failed - click retry", true);
    return;
  }

  const url = getWsUrl(state.channel);
  setConnection("connecting");
  ws = new WebSocket(url);

  ws.onopen = () => {
    setConnection("open");
    chatRetries = 0;
    chatReconnectDelay = minDelay;
    while (state.unsentQueue.length > 0) {
      ws.send(JSON.stringify({ text: state.unsentQueue.shift() }));
    }
  };

  ws.onmessage = (evt) => {
    let data;
    try {
      data = JSON.parse(evt.data);
    } catch {
      return;
    }
    if (data.type === "ping") return;
    if (data.type === "chat_message" && data.channel === state.channel) {
      if (!isDuplicate(data)) {
        state.messages.push(data);
        renderMessageAtBottom(data);
      }
    }
  };

  ws.onerror = () => setConnection("error");
  ws.onclose = () => {
    chatRetries++;
    if (chatRetries >= maxRetries) {
      setConnection("failed - click retry", true);
      return;
    }
    setConnection(`closed (retry ${chatRetries}/${maxRetries})`);
    chatReconnectTimer = setTimeout(connectChat, chatReconnectDelay);
    chatReconnectDelay = Math.min(chatReconnectDelay * 2, maxDelay);
  };
}

function connectVisitors() {
  if (visitorReconnectTimer) {
    clearTimeout(visitorReconnectTimer);
    visitorReconnectTimer = null;
  }

  if (visitorWs) {
    visitorWs.onclose = null;
    visitorWs.close();
  }

  if (visitorRetries >= maxRetries) {
    console.warn("Visitors WebSocket: max retries reached");
    return;
  }

  visitorWs = new WebSocket("wss://blink.tail8ab50a.ts.net:8443/ws/visitors");

  visitorWs.onopen = () => {
    visitorRetries = 0;
  };

  visitorWs.onmessage = (evt) => {
    let data;
    try {
      data = JSON.parse(evt.data);
    } catch {
      return;
    }
    if (data.type === "ping") return;
    if (data.type === "join" || data.type === "leave") {
      const event = {
        ...data,
        ip: data.visitor?.ip || data.ip,
        timestamp:
          data.timestamp ||
          data.visitor?.connected_at ||
          new Date().toISOString(),
      };
      if (!isDuplicate(event)) {
        state.messages.push(event);
        renderMessageAtBottom(event);
      }
    }
  };

  visitorWs.onclose = () => {
    visitorRetries++;
    if (visitorRetries < maxRetries) {
      visitorReconnectTimer = setTimeout(connectVisitors, minDelay);
    }
  };
}

function sendMessage(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return;
  if (state.connection === "open" && ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ text: trimmed }));
  } else {
    state.unsentQueue.push(trimmed);
  }
}

function retryConnections() {
  chatRetries = 0;
  chatReconnectDelay = minDelay;
  visitorRetries = 0;
  connectChat();
  connectVisitors();
}

async function initChat() {
  const formEl = document.getElementById('chat-form');
  const inputEl = document.getElementById('chat-input');
  const msgsEl = document.getElementById('chat-messages');
  const retryBtn = document.getElementById("chat-retry-btn");

  if (!formEl || !inputEl || !msgsEl) return;

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(inputEl.value);
    inputEl.value = '';
    state.inputText = '';
  });

  inputEl.addEventListener('input', (e) => {
    state.inputText = e.target.value;
  });

  if (retryBtn) {
    retryBtn.addEventListener("click", retryConnections);
  }

  msgsEl.addEventListener('scroll', handleScroll);

  await fetchHistory(true);
  const presenceEvents = await fetchPresenceEvents();
  presenceEvents.forEach(e => renderMessageAtBottom(e, false));
  msgsEl.scrollTop = msgsEl.scrollHeight;

  connectChat();
  connectVisitors();
}

document.addEventListener('DOMContentLoaded', initChat);

export { state, sendMessage, connectChat as connect };

