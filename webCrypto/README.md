# Web Crypto API

## 개요
Web Crypto API는 웹 페이지에서 암호화와 복호화 작업을 수행하기 위한 API입니다. AES-GCM 대칭 암호화를 사용하여 평문을 암호화하고, 암호화된 데이터를 다시 복호화하여 원본을 복원하는 기능을 제공합니다. 모든 결과는 console에 출력됩니다.

## 권한
필요한 권한 없음. 단, `crypto.subtle`은 HTTPS 또는 localhost 환경에서만 사용 가능합니다.

## 폴더 구조
```
webCrypto/
├── index.html          # 앱 진입점 HTML 파일
└── src/
    ├── main.js         # Web Crypto API를 사용한 암호화/복호화 로직
    └── style.css       # 스타일 파일
```

## 파일 설명

### index.html
앱의 진입점 파일로, `src/main.js`와 `src/style.css`를 로드합니다. UI 렌더링은 없으며 모든 작업 결과가 console에 출력됩니다.

### src/main.js
Web Crypto API를 활용한 AES-256-GCM 암호화 및 복호화 로직을 포함합니다.

- **키 생성**: `crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"])`를 사용하여 AES-256 암호화 키를 생성합니다.
- **평문 변환**: `TextEncoder`를 사용하여 평문 `"안녕하세요, Web Crypto API!"`를 `Uint8Array`로 변환합니다.
- **IV 생성**: `crypto.getRandomValues(new Uint8Array(12))`를 사용하여 12바이트의 초기화 벡터(IV)를 랜덤으로 생성합니다.
- **암호화**: `crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data)`를 호출하여 평문을 암호화합니다.
- **Base64 변환 및 출력**: 암호화된 `ArrayBuffer`와 IV를 각각 `btoa()`를 사용하여 Base64 문자열로 변환하여 console에 출력합니다.
- **복호화**: `crypto.subtle.decrypt()`를 호출하여 암호화된 데이터를 복호화합니다. 이때 Base64로 변환된 IV를 `base64ToArrayBuffer` 함수를 사용하여 다시 `ArrayBuffer`로 복원합니다.
- **텍스트 복원**: `TextDecoder`를 사용하여 복호화된 `ArrayBuffer`를 원래 텍스트 문자열로 변환하여 console에 출력합니다.

### src/style.css
기본 스타일 파일입니다.

## 동작 순서
1. 페이지가 로드되면 `crypto.subtle.generateKey()`로 AES-256 암호화 키를 생성합니다.
2. `TextEncoder`를 사용하여 평문을 `Uint8Array`로 변환합니다.
3. `crypto.getRandomValues()`로 12바이트의 랜덤 IV를 생성합니다.
4. `crypto.subtle.encrypt()`를 호출하여 평문을 AES-GCM 방식으로 암호화합니다.
5. 암호화된 데이터와 IV를 Base64 문자열로 변환하여 console에 출력합니다.
6. Base64로 변환된 IV를 `base64ToArrayBuffer` 함수로 다시 `ArrayBuffer`로 복원합니다.
7. `crypto.subtle.decrypt()`를 호출하여 암호화된 데이터를 복호화합니다.
8. `TextDecoder`를 사용하여 복호화된 결과를 원래 텍스트로 변환하여 console에 출력하며, 복호화가 올바르게 동작하는지 검증합니다.
