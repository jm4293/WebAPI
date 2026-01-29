import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>IndexedDB API</h1>
  <div class="layout">
    <button id="btnAddSampleData">샘플 데이터 추가</button>
    <button id="btnSearchAllUsers">전체 조회</button>
  </div>
  <div class="layout">
    <input type="text" id="searchInput" placeholder="이름 검색 (예: 홍)">
    <button id="btnSearchUsersEqual">일치 검색</button>
    <button id="btnSearchUsersLike">Like 검색</button>
    <button id="btnDeleteSearchedUsers">검색결과 삭제</button>
  </div>
  <div id="output">Info</div>
`;

const btnAddSampleData = document.getElementById("btnAddSampleData");
const btnSearchAllUsers = document.getElementById("btnSearchAllUsers");
const btnSearchUsersEqual = document.getElementById("btnSearchUsersEqual");
const btnSearchUsersLike = document.getElementById("btnSearchUsersLike");
const btnDeleteSearchedUsers = document.getElementById(
  "btnDeleteSearchedUsers",
);
const searchInput = document.getElementById("searchInput");
const domOutput = document.getElementById("output");

const dbName = "내저장소";
const dbVersion = 2;
let db;

const request = indexedDB.open(dbName, dbVersion);

// "내저장소"라는 이름의 IndexedDB 데이터베이스에 없거나 이미 존재하지만 새 버전이 클 때 호출
request.onupgradeneeded = (event) => {
  db = event.target.result;
  const oldVersion = event.oldVersion;
  const newVersion = event.newVersion;

  console.log(`데이터베이스 업그레이드: v${oldVersion} -> v${newVersion}`);

  if (oldVersion !== 0 && oldVersion != newVersion) {
    db.close();
    const deleteRequest = indexedDB.deleteDatabase(dbName);

    deleteRequest.onsuccess = () => {
      document.querySelector("#app").innerHTML = `
        <h1>IndexedDB API</h1>
        <div>기존 데이터베이스가 삭제되었습니다. 페이지를 새로고침 해주세요.</div>
      `;
    };

    deleteRequest.onerror = (event) => {
      console.error("데이터베이스 삭제 실패", event);
    };
  } else {
    const objectStore = db.createObjectStore("users", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("name", "name", { unique: false });
    console.log("객체 저장소 및 인덱스 생성 완료");
  }
};

// 데이터베이스 열기에 성공했을 때 호출
request.onsuccess = (event) => {
  db = event.target.result;
  console.log("데이터베이스 열기 성공", db);
};

// 데이터베이스 열기에 실패했을 때 호출
request.onerror = (event) => {
  console.error("데이터베이스 열기 실패", event);
};

btnAddSampleData.onclick = () => {
  const sampleUsers = [
    { name: "홍길동", age: 30, email: "hong@example.com" },
    { name: "김철수", age: 25, email: "kim@example.com" },
    { name: "이영희", age: 28, email: "lee@example.com" },
    { name: "박민수", age: 22, email: "park@example.com" },
  ];

  const transaction = db.transaction(["users"], "readwrite");
  const objectStore = transaction.objectStore("users");

  sampleUsers.forEach((user) => {
    const request = objectStore.add(user);
    request.onsuccess = () => {
      console.log("샘플 사용자 추가 완료:", user);
    };
    request.onerror = (event) => {
      console.error("샘플 사용자 추가 실패:", event);
    };
  });

  transaction.oncomplete = () => {
    domOutput.innerText = "샘플 사용자 추가 완료";
    console.log("모든 샘플 사용자 추가 트랜잭션 완료");
  };
};

btnSearchAllUsers.onclick = () => {
  const transaction = db.transaction(["users"], "readonly");
  const objectStore = transaction.objectStore("users");
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const users = event.target.result;
    domOutput.innerHTML = "<h2>전체 사용자 목록</h2>";
    users.forEach((user) => {
      domOutput.innerHTML += `
        <div>
          ID: <span class="column-value">${user.id}</span>, 
          이름: <span class="column-value">${user.name}</span>,
          나이: <span class="column-value">${user.age}</span>,
          이메일: <span class="column-value">${user.email}</span>
        </div>
      `;
    });
  };

  request.onerror = (event) => {
    console.error("전체 사용자 조회 실패:", event);
  };
};

btnSearchUsersEqual.onclick = () => {
  const nameToSearch = searchInput.value.trim();
  if (!nameToSearch) {
    alert("검색어를 입력하세요.");
    return;
  }

  const transaction = db.transaction(["users"], "readonly");
  const objectStore = transaction.objectStore("users");
  const index = objectStore.index("name");
  const request = index.getAll(nameToSearch);

  request.onsuccess = (event) => {
    const users = event.target.result;
    domOutput.innerHTML = `<h2>'${nameToSearch}' 일치 사용자 목록</h2>`;
    users.forEach((user) => {
      domOutput.innerHTML += `
        <div>
          ID: <span class="column-value">${user.id}</span>, 
          이름: <span class="column-value">${user.name}</span>,
          나이: <span class="column-value">${user.age}</span>,
          이메일: <span class="column-value">${user.email}</span>
        </div>
      `;
    });
  };

  request.onerror = (event) => {
    console.error("일치 사용자 조회 실패:", event);
  };
};

btnSearchUsersLike.onclick = () => {
  const nameToSearch = searchInput.value.trim();
  if (!nameToSearch) {
    alert("검색어를 입력하세요.");
    return;
  }

  const transaction = db.transaction(["users"], "readonly");
  const objectStore = transaction.objectStore("users");
  const request = objectStore.openCursor();
  // const index = objectStore.index("name");

  const users = [];

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      if (cursor.value.name.includes(nameToSearch)) {
        users.push(cursor.value);
      }
      cursor.continue();
    } else {
      domOutput.innerHTML = `<h2>'${nameToSearch}' 포함 사용자 목록</h2>`;
      users.forEach((user) => {
        domOutput.innerHTML += `
          <div>
            ID: <span class="column-value">${user.id}</span>, 
            이름: <span class="column-value">${user.name}</span>,
            나이: <span class="column-value">${user.age}</span>,
            이메일: <span class="column-value">${user.email}</span>
          </div>
        `;
      });
    }
  };

  request.onerror = (event) => {
    console.error("Like 사용자 조회 실패:", event);
  };
};

btnDeleteSearchedUsers.onclick = () => {
  const nameToSearch = searchInput.value.trim();
  if (!nameToSearch) {
    alert("검색어를 입력하세요.");
    return;
  }

  const transaction = db.transaction(["users"], "readwrite");
  const objectStore = transaction.objectStore("users");
  const request = objectStore.openCursor();

  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      if (cursor.value.name.includes(nameToSearch)) {
        const deleteRequest = cursor.delete();
        deleteRequest.onsuccess = () => {
          console.log("사용자 삭제 완료:", cursor.value);
        };
      }
      cursor.continue();
    }
  };

  transaction.oncomplete = () => {
    domOutput.innerText = `'${nameToSearch}' 포함 사용자 삭제 완료`;
    console.log("검색된 사용자 삭제 트랜잭션 완료");
  };

  request.onerror = (event) => {
    console.error("사용자 삭제 실패:", event);
  };
};
