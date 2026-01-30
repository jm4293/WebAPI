import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>이미지 지연 로딩</h1>
  <div class="image-container">
    <div class="lazy-image" data-src="./01.jpg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./02.jpeg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./03.jpeg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./04.jpeg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./05.jpeg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./06.jpeg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./07.jpeg">
      이미지 로딩 중...
    </div>
    <div class="lazy-image" data-src="./08.jpeg">
      이미지 로딩 중...
    </div>
  </div>
`;

// Intersection Observer 설정
const observerOptions = {
  root: null, // viewport를 root로 사용
  rootMargin: "0px",
  threshold: 0.5, // 30%가 보이면 트리거
};

// 이미지가 뷰포트에 들어올 때 실행될 콜백
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      const src = lazyImage.getAttribute("data-src");

      // 이미지 로드
      const img = new Image();
      img.onload = () => {
        lazyImage.style.backgroundImage = `url(${src})`;
        lazyImage.textContent = "";
        lazyImage.classList.add("loaded");
      };
      img.onerror = () => {
        lazyImage.textContent = "이미지 로드 실패";
        lazyImage.classList.add("error");
      };
      img.src = src;

      // 관찰 중지
      observer.unobserve(lazyImage);
    }
  });
};

// Observer 생성
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 모든 lazy-image 요소 관찰 시작
const lazyImages = document.querySelectorAll(".lazy-image");
lazyImages.forEach((image) => observer.observe(image));
