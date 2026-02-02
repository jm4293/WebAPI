import "./style.css";

document.querySelector("#app").innerHTML = /* html */ `
  <h1>파일 압축하여 다운로드</h1>
  <input type="file" id="fileInput">
  <button id="compressAndDownloadBtn" disabled>파일 압축</button>
  <p id="status">상태</p>
  <a id="downloadLink" href="#" style="display: none;">압축 파일 다운로드</a>
`;

const fileInput = document.getElementById("fileInput");
const compressAndDownloadBtn = document.getElementById(
  "compressAndDownloadBtn",
);
const statusText = document.getElementById("status");
const downloadLink = document.getElementById("downloadLink");

let selectedFile = null;
fileInput.onchange = (event) => {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    compressAndDownloadBtn.disabled = false;
    statusText.textContent = `선택된 파일: ${selectedFile.name} (${selectedFile.size} Bytes)`;
  } else {
    compressAndDownloadBtn.disabled = true;
    statusText.textContent = "파일이 선택되지 않았습니다.";
    downloadLink.style.display = "none";
  }
};

compressAndDownloadBtn.onclick = async () => {
  if (!selectedFile) {
    statusText.textContent = "먼저 파일을 선택해주세요!";
    return;
  }

  compressAndDownloadBtn.disabled = true;
  statusText.textContent = "파일 압축 중... 잠시만 기다려 주세요.";

  try {
    const originalStream = selectedFile.stream();
    const compressedStream = originalStream.pipeThrough(
      new CompressionStream("gzip"),
    );
    const compressedResponse = new Response(compressedStream);
    const compressedBlob = await compressedResponse.blob();

    // 다운로드 링크 생성
    const downloadUrl = URL.createObjectURL(compressedBlob);
    downloadLink.href = downloadUrl;
    downloadLink.download = selectedFile.name + ".gz";
    downloadLink.style.display = "inline";
    statusText.textContent = "압축 완료! 다운로드 버튼을 클릭하세요.";
  } catch (error) {
    statusText.textContent = "압축 중 오류가 발생했습니다.";
    downloadLink.style.display = "none";
  } finally {
    compressAndDownloadBtn.disabled = false;
  }
};
