import "./style.css";

const contents = [
  ["1번", "./01.jpg"],
  ["2번", "./02.jpeg"],
  ["3번", "./03.jpeg"],
  ["4번", "./04.jpeg"],
  ["5번", "./05.jpeg"],
  ["6번", "./06.jpeg"],
];

let nextInt = 0;
function getNextContent() {
  const v = ++nextInt % contents.length;

  return `
    <div>${contents[v][0]}</div>
    <img src="${contents[v][1]}" />
  `;
}

document.querySelector("#app").innerHTML = /*html*/ `
  <div class="container">
    <div id="content">
      ${getNextContent()}
    </div>
  </div>
  <button id="btnChangeContent">콘텐츠 변경</button>
`;

const btnChangeContent = document.getElementById("btnChangeContent");

btnChangeContent.onclick = async () => {
  const content = document.getElementById("content");

  if (!document.startViewTransition) {
    content.innerHTML = getNextContent();
    return;
  }

  const viewTrans = document.startViewTransition(() => {
    content.innerHTML = getNextContent();
  });

  btnChangeContent.disabled = true;
  await viewTrans.finished;
  btnChangeContent.disabled = false;
};
