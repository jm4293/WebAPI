# Prioritized Task Scheduling API (scheduler.postTask)

## 개요
Prioritized Task Scheduling API는 웹 앱에서 작업(task)을 우선순위를 지정하여 스케줄링할 수 있는 기능을 제공합니다. `scheduler.postTask()`를 사용하여 작업을 등록하고, `TaskController`를 활용하여 작업의 우선순위를 동적으로 변경하거나 작업을 취소할 수 있습니다. 이를 통해 브라우저의 메인 스레드 리소스를 효율적으로 관리할 수 있습니다.

## 권한
필요한 권한 없음. **Chrome 109 이상**에서만 지원됩니다.

## 폴더 구조
```
prioritizedTaskScheduling/
├── index.html          # 앱의 진입점, HTML 구조 정의
└── src/
    ├── main.js         # scheduler.postTask 및 TaskController 로직
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 기본 HTML 구조를 정의하며, `main.js`와 `style.css`를 로드합니다.

### src/main.js
Prioritized Task Scheduling API의 핵심 로직을 포함하는 파일입니다. 주요 구성요소는 다음과 같습니다.

- **버튼 렌더링**: 테스크 취소 버튼과 테스크 우선순위 변경 버튼을 생성합니다.
- **TaskController 생성**: `new TaskController()`로 컨트롤러를 생성하여 작업의 취소와 우선순위 변경을 관리합니다.
- **`btnCancelTask` 클릭 핸들러**: `controller.abort("테스크 취소 요청됨")`을 호출하여 등록된 태스크를 취소합니다.
- **`btnChangePriority` 클릭 핸들러**: `controller.setPriority("user-blocking")`을 호출하여 작업의 우선순위를 최고 수준으로 변경합니다.
- **`"prioritychange"` 이벤트 리스너**: `controller.signal`에 이벤트 리스너를 등록하여 우선순위가 변경될 때 이전 우선순위(`previousPriority`)와 현재 우선순위(`priority`)를 console에 출력합니다.
- **`scheduler.postTask()` 호출**: 우선순위를 `"background"`, 지연 시간을 `3000ms`로 설정하고 `signal: controller.signal`을 전달하여 태스크를 등록합니다. 완료 시 `.then()`으로 결과를 출력하고, 오류 시 `.catch()`로 처리합니다.
- **실행 순서 테스트**: `task-1`부터 `task-6`까지의 테스트 코드가 포함되어 있으며, 동기 코드와 다양한 우선순위의 `postTask`를 혼합하여 실행 순서를 검증합니다.

#### 우선순위 수준
| 우선순위 | 설명 |
|---|---|
| `user-blocking` | 즉시 처리가 필요한 사용자 입력 관련 작업 (최고 우선순위) |
| `user-visible` | UI 렌더링 등 사용자에게 표시되는 작업 (기본값) |
| `background` | 백그라운드 처리 가능한 작업 (로그, 서버 요청 등, 최저 우선순위) |

### src/style.css
페이지의 레이아웃과 버튼 등의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 테스크 취소 버튼과 우선순위 변경 버튼이 렌더링됩니다.
2. `new TaskController()`로 컨트롤러가 생성되고, `controller.signal`에 `"prioritychange"` 이벤트 리스너가 등록됩니다.
3. `scheduler.postTask()`를 통해 우선순위 `"background"`, 지연 `3000ms`로 태스크를 등록합니다.
4. 사용자가 **우선순위 변경 버튼**을 클릭하면 `controller.setPriority("user-blocking")`이 호출되어 우선순위가 최고로 변경됩니다.
5. `"prioritychange"` 이벤트가 발생하여 이전 우선순위와 현재 우선순위가 console에 출력됩니다.
6. 태스크가 완료되면 `.then()`을 통해 결과가 console에 출력됩니다.
7. 사용자가 **테스크 취소 버튼**을 클릭하면 `controller.abort()`가 호출되어 태스크가 취소됩니다.
8. 태스크가 취소된 경우 `.catch()`를 통해 취소 오류가 처리되고 console에 출력됩니다.
