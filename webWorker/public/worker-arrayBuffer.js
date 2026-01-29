self.onmessage = (event) => {
  const { buffer, width, height } = event.data;

  const data = new Uint8ClampedArray(buffer);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const gray = (r + g + b) / 3;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  self.postMessage({ buffer: buffer, width, height }, [buffer]);
};
