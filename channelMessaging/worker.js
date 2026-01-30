let port;

self.onmessage = (event) => {
  if (event.data === "init3") {
    port = event.ports[0];
  }

  port.onmessage = (event) => {
    const received = event.data.toUpperCase();
    port.postMessage(`[워커 응답]: ${received}`);
  };
};
