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

self.onmessage = (event) => {
  const maxNumber = event.data;
  const primes = findPrimes(maxNumber);
  self.postMessage(primes);
};
