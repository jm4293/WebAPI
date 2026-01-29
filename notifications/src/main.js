import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Notifications Module</h1>
  <button id="btnNotification">알림</button>
`;

const btnNotification = document.getElementById("btnNotification");

btnNotification.onclick = () => {
  if (Notification.permission === "granted") {
    const notification = new Notification("새로운 메시지가 도착했습니다!", {
      body: "여기를 클릭하여 메시지를 확인하세요.",
      // icon: "https://via.placeholder.com/128",
    });

    notification.onclick = () => {
      window.open("https://github.com/jm4293/WebAPI");
    };
  } else {
    alert("알림 권한이 필요합니다. 페이지를 새로고침하고 권한을 허용해주세요.");
  }
};

function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("이 브라우저는 알림을 지원하지 않습니다.");
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용되었습니다.");
    } else if (permission === "denied") {
      console.log("알림 권한이 거부되었습니다.");
    } else {
      console.log("알림 권한 요청이 무시되었습니다.");
    }
  });
}

requestNotificationPermission();
