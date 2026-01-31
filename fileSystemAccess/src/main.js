import "./style.css";

document.querySelector("#app").innerHTML = `
  <h2>(기능1) 텍스트 파일 열기</h2>
  <button id="openFileBtn">파일 열기</button>
  <pre id="fileContent"></pre>

  <h2>(기능2) 텍스트 파일 저장</h2>
  <textarea id="textArea" rows="5" cols="50">여기에 저장할 텍스트를 입력하세요...</textarea><br>
  <button id="saveFileBtn">파일 저장</button>

  <h2>(기능3) 디렉토리 열기</h2>
  <button id="openDirectoryBtn">디렉토리 열기</button>
  <ul id="fileList" style="list-style: none;"></ul>
`;

// (기능1) 텍스트 파일 열기
document.getElementById("openFileBtn").addEventListener("click", async () => {
  const [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: "Text Files",
        accept: { "text/plain": [".txt"] },
      },
    ],
  });

  const file = await fileHandle.getFile();
  const text = await file.text();
  document.getElementById("fileContent").textContent = text;
});

// (기능2) 텍스트 파일 저장
document.getElementById("saveFileBtn").addEventListener("click", async () => {
  const text = document.getElementById("textArea").value;

  const handle = await window.showSaveFilePicker({
    suggestedName: "saved.txt",
    types: [
      {
        description: "Text Files",
        accept: { "text/plain": [".txt"] },
      },
    ],
  });

  const writable = await handle.createWritable();
  await writable.write(text);
  await writable.close();
});

// (기능3) 디렉토리 열기
document
  .getElementById("openDirectoryBtn")
  .addEventListener("click", async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const fileList = document.getElementById("fileList");
      fileList.innerHTML = "";

      for await (const [name, handle] of directoryHandle.entries()) {
        const li = document.createElement("li");
        li.textContent = handle.kind === "file" ? `📄 ${name}` : `📁 ${name}`;
        fileList.appendChild(li);
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      throw err;
    }
  });
