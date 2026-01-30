import "./style.css";
import "./LikeButton";

document.querySelector("#app").innerHTML = `
  <div>
    <div>01</div>
    <img src="./02.jpeg" />
    <like-button id="a" initial-count="0"></like-button>
  </div>

  <br/>

  <div>
    <div>02</div>
    <img src="./03.jpeg" />
    <like-button initial-count="2"></like-button>
  </div>
`;

a.addEventListener("count-changed", (event) => {
  console.log(
    `Like button count changed from ${event.detail.oldCount} to ${event.detail.newCount}`,
  );
});
