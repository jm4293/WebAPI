import "./style.css";

document.querySelector("#app").innerHTML = `
  <div id="circle" style="margin-bottom: 50px;"></div>

  <button id="btnStartAnimation">시작</button>
  <button id="btnPauseAnimation">일시 중지</button>
  <button id="btnResumeAnimation">재개</button>
  <button id="btnCancelAnimation">취소</button>
  <button id="btnReverseAnimation">역재생</button>
  <div id="box" style="margin-top: 20px;"></div>
`;

const btnStartAnimation = document.querySelector("#btnStartAnimation");
const btnPauseAnimation = document.querySelector("#btnPauseAnimation");
const btnResumeAnimation = document.querySelector("#btnResumeAnimation");
const btnCancelAnimation = document.querySelector("#btnCancelAnimation");
const btnReverseAnimation = document.querySelector("#btnReverseAnimation");
const circle = document.querySelector("#circle");

let animation;

btnStartAnimation.onclick = () => {
  const box = document.querySelector("#box");

  animation = box.animate(
    [
      { transform: "translateX(0px) rotate(0deg)", backgroundColor: "blue" },
      { transform: "translateX(400px) rotate(360deg)", backgroundColor: "red" },
    ],
    {
      duration: 2000,
      iterations: 2,
      direction: "alternate", // normal, reverse, alternate, alternate-reverse
      easing: "ease-in-out", // linear, ease, ease-in, ease-out, ease-in-out
      fill: "forwards", // none, forwards, backwards, both, auto
    },
  );

  console.log(animation.playState);

  animation.onfinish = () => {
    console.log("애니메이션이 완료되었습니다.");
    console.log(animation.playState);
  };

  animation.oncancel = () => {
    console.log("애니메이션이 취소되었습니다.");
    console.log(animation.playState);
  };
};

btnPauseAnimation.onclick = () => {
  if (animation) {
    animation.pause();
    console.log(animation.playState);
  }
};

btnResumeAnimation.onclick = () => {
  if (animation) {
    animation.play();
    console.log(animation.playState);
  }
};

btnCancelAnimation.onclick = () => {
  if (animation) {
    animation.cancel();
    console.log(animation.playState);
  }
};

btnReverseAnimation.onclick = () => {
  if (animation) {
    animation.reverse();
    console.log(animation.playState);
  }
};

circle
  .animate(
    [
      { transform: "translateX(0px) rotate(0deg)" },
      { transform: "translateX(100px) rotate(0deg)", offset: 0.5 },
      { transform: "translateX(420px) rotate(360deg)" },
    ],
    {
      duration: 3000,
      iterations: 1,
      direction: "alternate", // normal, reverse, alternate, alternate-reverse
      easing: "linear", // linear, ease, ease-in, ease-out, ease-in-out
      fill: "forwards", // none, forwards, backwards, both, auto
    },
  )
  .finished.then(() => {
    circle.animate(
      [
        {
          opacity: 1,
          transform: "translateX(420px) scale(1) rotate(0deg)",
        },
        {
          opacity: 0,
          transform: "translateX(420px) scale(0) rotate(3600deg)",
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
        delay: 1000,
      },
    );
  });
