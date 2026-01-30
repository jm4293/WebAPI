class LikeButton extends HTMLElement {
  #onIncrementButtonClick;

  // 컴포넌트가 생성될때 호출
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <div>
        <button id="incrementButton">Like</button>
        <svg width="20" height="20" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 30 C150 0, 200 60, 100 160 C0 60, 50 0, 100 30"
            fill="#007bff"/>
        </svg>
        <span></span>
      </div>

      <style>
        div {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }

        button {
          padding: 1px 5px;
          font-size: 0.6rem;
          cursor: pointer;
          border: none;
          border-radius: 0.3em;
          background-color: #007bff;
          color: white;
          transition: background-color 0.2s;
          opacity: 0.4;
          transition: opacity 0.5s;
        }

        button:hover {
          opacity: 1;
        }

        button:active {
          background-color: #0056b3;
        }

        svg {
          zoom: 0.6;
          margin-left: .25em;
        }

        span {
          font-size: 0.6rem;
          font-weight: bold;
          color: #000
        }
      </style>
    `;
  }

  // 컴포넌트가 페이지에 추가될때 호출
  connectedCallback() {
    this.#onIncrementButtonClick = () => {
      this.count += 1;

      const span = this.shadowRoot.querySelector("span");
      span.textContent = this.count;
    };

    this.shadowRoot
      .querySelector("#incrementButton")
      .addEventListener("click", this.#onIncrementButtonClick);
  }

  // 컴포넌트가 페이지에서 제거될때 호출
  disconnectedCallback() {
    if (this.#onIncrementButtonClick) {
      this.shadowRoot
        .querySelector("#incrementButton")
        .removeEventListener("click", this.#onIncrementButtonClick);
    }
  }

  // 컴포넌트가 다른 페이지(iframe 등)로 이동될때
  adoptedCallback(oldDocument, newDocument) {}

  get count() {
    return parseInt(this.getAttribute("initial-count"), 10) || 0;
  }

  set count(value) {
    if (value !== this.count) {
      const event = new CustomEvent("count-changed", {
        detail: { newCount: value, oldCount: this.count },
      });
      this.dispatchEvent(event);

      this.setAttribute("initial-count", value);
    }
  }

  static get observedAttributes() {
    return ["initial-count"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "initial-count" && oldValue !== newValue) {
      this.count = parseInt(newValue, 10) || 0;

      if (this.shadowRoot) {
        const span = this.shadowRoot.querySelector("span");
        span.textContent = this.count;
      }
    }
  }
}

customElements.define("like-button", LikeButton);

export { LikeButton };
