import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>스트리밍 클라이언트</h1>
  <button id="btnFetchData">데이터 실시간 처리</button>
  <button id="btnDownloadData">데이터를 파일로 저장</button>
`;

const btnFetchData = document.getElementById("btnFetchData");
const btnDownloadData = document.getElementById("btnDownloadData");

btnFetchData.onclick = async () => {
  const url = "http://localhost:3000/stream/10";
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    console.error("네트워크 응답에 문제가 있습니다.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let done = false;

  btnFetchData.disabled = true;

  console.log("데이터 스트리밍 시작...");

  let ctnChunks = 0;
  let dataLength = 0;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    if (done) {
      console.log("데이터 스트리밍 완료.");
      break;
    }

    const chunkAsString = decoder.decode(value, { stream: true });
    ctnChunks++;
    dataLength += chunkAsString.length;

    console.log(`청크 #${ctnChunks} 수신, 길이: ${chunkAsString.length}`);
  }

  console.log(`총 ${ctnChunks}개의 청크 수신, 총 길이: ${dataLength}`);
  btnFetchData.disabled = false;
};

btnDownloadData.onclick = async () => {
  const url = "http://localhost:3000/stream/100";
  const filename = "streamed_data.txt";

  try {
    const response = await fetch(url);

    if (!response.ok || !response.body) {
      throw new Error("네트워크 응답에 문제가 있습니다.");
    }

    const fileHandle = await window.showSaveFilePicker({
      suggestedName: filename,
    });
    const writableStream = await fileHandle.createWritable();
    btnDownloadData.disabled = true;

    let receivedBytes = 0;
    const progressStream = new TransformStream({
      transform(chunk, controller) {
        receivedBytes += chunk.length;
        console.log(`수신된 바이트: ${receivedBytes}`);
        controller.enqueue(chunk);
      },
    });

    await response.body.pipeThrough(progressStream).pipeTo(writableStream);

    alert(`데이터가 ${filename} 파일로 저장되었습니다.`);
  } catch (error) {
    console.error("데이터 다운로드 중 오류 발생:", error);
  }

  btnDownloadData.disabled = false;
};
