import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
  <h1>파일 드래그 앤 드롭</h1>
  <div id="drop-area">
    <p>폴더를 끌어다 놓으세요</p>
  </div>
  <div id="file-list">
    <h2>읽은 파일 목록:</h2>
    <ul id="files">
      <li>파일이 여기에 표시됩니다.</li>
    </ul>
  </div>
`;

const dropArea = document.getElementById("drop-area");
const fileListElement = document.getElementById("files");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("highlight");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("highlight");
});

dropArea.addEventListener("drop", async (e) => {
  e.preventDefault();
  dropArea.classList.remove("highlight");
  fileListElement.innerHTML = "";

  const items = e.dataTransfer.items;
  if (items) {
    for (let i = 0; i < items.length; i++) {
      try {
        const handle = await items[i].getAsFileSystemHandle();

        await traverseFileSystemHandle(handle);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

function displayFile(file, path = "") {
  const listItem = document.createElement("li");

  listItem.textContent = `경로: ${path}${file.name} (크기: ${file.size} bytes, 타입: ${file.type})`;

  fileListElement.appendChild(listItem);

  if (file.type.startsWith("text/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(
        `%c 파일 ${path}${file.name} 내용:`,
        "color:yellow;font-weight:bold;font-size:1.5em",
      );
      console.log(e.target.result);
    };

    reader.readAsText(file);
  }
}

async function traverseFileSystemHandle(handle, path = "") {
  if (handle.kind === "file") {
    const file = await handle.getFile();
    displayFile(file, path);
  } else if (handle.kind === "directory") {
    const directoryIterator = handle.values();
    for await (const entry of directoryIterator) {
      await traverseFileSystemHandle(entry, path + handle.name + "/");
    }
  }
}
