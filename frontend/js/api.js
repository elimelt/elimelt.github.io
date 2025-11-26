/*
{"name":"DevStack Public API","version":"1.0.0","description":"Public API endpoints for DevStack","endpoints":[
{"path":"/","method":"GET","description":"API info"},{"path":"/health","method":"GET","description":"Health check"},{"path":"/example","method":"GET","description":"Example endpoint"},{"path":"/cache/{key}","method":"GET","description":"Get cached value"},{"path":"/cache/{key}","method":"POST","description":"Set cached value"},{"path":"/visitors","method":"GET","description":"Get active visitors and visit log"},{"path":"/ws/visitors","method":"WS","description":"Real-time visitor updates via WebSocket"}]}
*/

const BASE_URL = 'https://blink.tail8ab50a.ts.net:8443';

/*
example:
{"total_containers":1,"services":[{"name":"api","status":"running","image":"blink.tail8ab50a.ts.net:8443/api","cpu_percent":0.000000,"memory_mb":1.000000,"memory_percent":0.000000}]}
*/
const getSystem = () =>
  fetch(`${BASE_URL}/system`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching api system:', error);
      return error;
    });

/*
example:
{"name":"DevStack Public API","version":"1.0.0","description":"Public API endpoints for DevStack","endpoints":[{"path":"/","method":"GET","description":"API info"},{"path":"/health","method":"GET","description":"Health check"},{"path":"/example","method":"GET","description":"Example endpoint"},{"path":"/cache/{key}","method":"GET","description":"Get cached value"},{"path":"/cache/{key}","method":"POST","description":"Set cached value"},{"path":"/visitors","method":"GET","description":"Get active visitors and visit log"},{"path":"/ws/visitors","method":"WS","description":"Real-time visitor updates via WebSocket"}]}
*/
const getIndex = () =>
  fetch(`${BASE_URL}/`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching api info:', error);
      return error;
    });

/*
example:
{"status":"ok","redis":"healthy"}
*/
const getHealth = () =>
  fetch(`${BASE_URL}/health`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching api health:', error);
      return error;
    });

/*
example:
{"message":"Hello from DevStack API!","timestamp":"2025-11-26T00:00:00Z","status":"success"}
*/
const getExample = () =>
  fetch(`${BASE_URL}/example`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching api example:', error);
      return error;
    });

/*
example not found:
{"key":"test","value":null,"found":false}

example found:

*/
const getCache = () =>
  fetch(`${BASE_URL}/cache/${key}`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching api cache:', error);
      return error;
    });

const postCache = (key, value, ttl = 999999) =>
  fetch(`${BASE_URL}/cache/${key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value, ttl }),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error posting api cache:', error);
      return error;
    });

const getVisitors = () =>
  fetch(`${BASE_URL}/visitors`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching api visitors:', error);
      return error;
    });

const getWsVisitors = (callbacks = {}) => {
  const ws = new WebSocket(`wss://blink.tail8ab50a.ts.net:8443/ws/visitors`);

  const {
    onConnect = () => console.log('Connected to visitor tracking'),
    onVisitorJoin = (visitor) => console.log('Visitor joined:', visitor),
    onVisitorLeave = (ip) => console.log('Visitor left:', ip),
    onUpdate = (data) => console.log('Update:', data),
    onError = (error) => console.error('WebSocket error:', error),
    onDisconnect = () => console.log('Disconnected from visitor tracking'),
  } = callbacks;

  ws.onopen = () => {
    onConnect();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === 'ping') {
        ws.send('pong');
      } else if (data.type === 'join') {
        onVisitorJoin(data.visitor);
        onUpdate(data);
      } else if (data.type === 'leave') {
        onVisitorLeave(data.ip);
        onUpdate(data);
      } else {
        onUpdate(data);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  ws.onerror = (error) => {
    onError(error);
  };

  ws.onclose = () => {
    onDisconnect();
  };

  return {
    ws,
    close: () => ws.close(),
    send: (data) => ws.send(JSON.stringify(data)),
  };
};
// Usage example:
/*
const visitorTracker = getWsVisitors({
  onConnect: () => {
    console.log('Tracking visitors...');
  },
  onVisitorJoin: (visitor) => {
    console.log(`New visitor from ${visitor.location.city}, ${visitor.location.country}`);
    updateVisitorUI(visitor);
  },
  onVisitorLeave: (ip) => {
    console.log(`Visitor ${ip} left`);
    removeVisitorFromUI(ip);
  },
  onUpdate: (data) => {
    // Refresh visitor list
    getVisitors().then(updateVisitorList);
  },
  onError: (error) => {
    console.error('Connection error:', error);
    // Attempt reconnect after 5 seconds
    setTimeout(() => {
      visitorTracker = getWsVisitors(callbacks);
    }, 5000);
  },
  onDisconnect: () => {
    console.log('Connection closed');
  }
});
// Later, to close the connection:
visitorTracker.close();
*/

export { getSystem, getIndex, getHealth, getExample, getCache, postCache, getVisitors, getWsVisitors };