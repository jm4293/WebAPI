import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>URL 객체 테스트</h1>
  <div id="download">다운로드</div>
`;

const strURL =
  "https://userA:pw1234@example.com:8080/path?qa=1&qb=test#section";
const url = new URL(strURL);

console.log(`${url}`);
console.log(`href → ${url.href}`);
console.log(`hostname → ${url.hostname}`);
console.log(`port → ${url.port}`);
console.log(`host → ${url.host}`);
console.log(`protocol → ${url.protocol}`);
console.log(`origin → ${url.origin}`); // 출처
console.log(`pathname → ${url.pathname}`);
console.log(`search → ${url.search}`);
console.log(`hash → ${url.hash}`);
console.log(`username → ${url.username}`);
console.log(`password → ${url.password}`);

console.log(url.searchParams.get("qb"));
url.searchParams.set("qb", "zest");
console.log(url.searchParams.get("qb"));

url.searchParams.append("qc", "apple");
console.log(`${url}`);

console.log(`qc키를 갖고 있음: ${url.searchParams.has("qc")}`);

url.searchParams.delete("qc");
console.log(`qc키를 갖고 있음: ${url.searchParams.has("qc")}`);

for (let key of url.searchParams.keys()) {
  console.log(`?${key} = ${url.searchParams.get(key)}`);
}

url.protocol = "xs:";
console.log(`${url}`);

const base = "https://api.example.com";
const params = new URLSearchParams({
  id: "123",
  type: "user",
});
const newUrl = new URL(`/data?${params}`, base);

console.log(newUrl.href);

console.log(URL.canParse("example.com"));

const downloadDiv = document.getElementById("download");
downloadDiv.onclick = (e) => {
  e.preventDefault();

  const text = "Hello, world! This is sample data.";
  const blob = new Blob([text], { type: "text/plain" });

  // Blob을 위한 임시 URL 생성
  const url = URL.createObjectURL(blob);
  console.log(url);

  const link = document.createElement("a");
  link.href = url;
  link.download = "hello-world.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
