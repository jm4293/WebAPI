import "./style.css";

/*
 * AES-GCM
 *A AES: 알고리즘
 * GCM: 운영 모드 (Galois/Counter Mode)
 */

try {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

  const plainText = "안녕하세요, Web Crypto API!";
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipherText = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data,
  );

  console.log("암호화된 데이터 (ArrayBuffer):", cipherText);

  const encryptedBase64 = btoa(
    String.fromCharCode(...new Uint8Array(cipherText)),
  );
  console.log("암호화된 데이터 (Base64):", encryptedBase64);

  const ivBase64 = btoa(String.fromCharCode(...iv));
  console.log("IV (Base64):", ivBase64);

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      // iv: iv,
      iv: base64ToArrayBuffer(ivBase64),
    },
    key,
    cipherText,
  );

  const decoder = new TextDecoder();
  const decryptedText = decoder.decode(decryptedData);
  console.log("복호화된 텍스트:", decryptedText);
} catch (e) {
  console.error("AES-GCM is not supported:", e);
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}
