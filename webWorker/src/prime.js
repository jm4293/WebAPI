import "./style.css";

document.querySelector("#prime").innerHTML = `
  <h1>소수 계산기 (WebWorker)</h1>
  <label for="maxNumber">최대 숫자 입력:</label>
  <input type="number" id="maxNumber" min="1">
  <button id="btnCalculatePrimes">계산</button>
  <p id="result">결과가 여기에 표시됩니다.</p>
`;

const maxNumberInput = document.getElementById("maxNumber");
const btnCalculatePrimes = document.getElementById("btnCalculatePrimes");
const resultElement = document.getElementById("result");

btnCalculatePrimes.onclick = () => {
  const maxNumber = parseInt(maxNumberInput.value);

  if (isNaN(maxNumber) || maxNumber < 1) {
    resultElement.textContent = "유효한 최대 숫자를 입력하세요.";
    return;
  }

  // const primes = findPrimes(maxNumber);
  // resultElement.textContent = `${maxNumber} 이하의 소수 개수는 ${primes.length}개입니다.`;

  // --------------- Web Worker 사용 예제 ---------------
  resultElement.textContent = "계산 중...";

  // Web Worker 생성
  const worker_prime = new Worker("worker-prime.js");

  // 워커에 최대 숫자 전송
  worker_prime.postMessage(maxNumber);

  // 워커로부터 결과 수신
  worker_prime.onmessage = (event) => {
    const primes = event.data;
    resultElement.textContent = `${maxNumber} 이하의 소수 개수는 ${primes.length}개입니다.`;
    worker_prime.terminate(); // 작업 완료 후 워커 종료
  };

  // 오류 처리
  worker_prime.onerror = (error) => {
    resultElement.textContent = `오류 발생: ${error.message}`;
    worker_prime.terminate(); // 오류 발생 시 워커 종료
  };
};

// 소수 판별 함수
function isPrime(num) {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function findPrimes(maxNumber) {
  const primes = [];

  for (let i = 2; i <= maxNumber; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}
