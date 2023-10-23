import close from "./image/close_icon.svg";
import media from "./image/media_icon.svg";
import arrow from "./image/arrow_back_icon.svg";

const modal = `
  <div class="modal_close">
    <img width="22px" height="22px" src=${close} alt="close_icon_logo />
  </div>
  <div class="modal_card">
    <div class="modal_header">
      <div class="modal_back">
        <img width="32px" height="24px" src=${arrow} alt="arrow_back_icon" />
      </div>
      <h2>새 게시물 만들기</h2>
      <p>공유하기</p>
    </div>
    <div class="modal_main">
      <img src=${media} alt="media_icon" />
      <h3>사진과 동영상을 업로드 해보세요.</h3>
      <label for="file">
        <p>컴퓨터에서 선택</p>
      </label>
      <input type="file" name="file" id="file" />
    </div>
  </div>
  `;

const addPostBtn = document.querySelector(".add-post");

addPostBtn.addEventListener("click", () => {
  const modalEl = document.createElement("div");
  modalEl.setAttribute("class", "modal_layout");
  modalEl.innerHTML = modal;
  document.body.prepend(modalEl);

  const removeBtn = document.querySelector(".modal_close > img");
  removeBtn.addEventListener("click", () => {
    document.body.removeChild(modalEl);
  });
});
