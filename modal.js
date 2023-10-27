const modal = `
  <div class="modal_close">
    <img width="22px" height="22px" src="./image/close_icon.svg" alt="close_icon_logo" />
  </div>
  <div class="modal_card">
    <div class="modal_header">
      <div class="modal_back">
        <img width="32px" height="24px" src="./image/arrow_back_icon.svg" alt="arrow_back_icon" />
      </div>
      <h2>새 게시물 만들기</h2>
      <p>공유하기</p>
    </div>
    <div class="modal_main">
      <img src="./image/media_icon.svg" alt="media_icon" />
      <h3>사진과 동영상을 업로드 해보세요.</h3>
      <label for="file">
        <p>컴퓨터에서 선택</p>
      </label>
      <input type="file" name="file" id="file" />
    </div>
  </div>
  `;

function createPost(img) {
  return `
    <div class="modal_post">
      <img width="478px" height="478px" src=${img} alt = "image" />
      <div class="modal_write">
        <textarea placeholder="문구 입력" autofocus></textarea>
      </div>
    </div>
  `;
}

const addPostBtn = document.querySelector(".add-post");
addPostBtn.addEventListener("click", createModal);

function createModal() {
  const modalEl = document.createElement("div");
  modalEl.setAttribute("class", "modal_layout");
  modalEl.innerHTML = modal;

  document.querySelector("body").prepend(modalEl);

  const removeBtn = document.querySelector(".modal_close > img");
  removeBtn.addEventListener("click", () => {
    document.querySelector("body").removeChild(modalEl);
  });

  const fileEl = document.querySelector("#file");
  fileEl.addEventListener("input", () => {
    let reader = new FileReader();
    reader.readAsDataURL(fileEl.files[0]);
    // console.log(fileEl.files[0]);
    reader.onload = () => {
      const imageBase64 = reader.result;
      // console.log(imageBase64);
      document
        .querySelector(".modal_card")
        .setAttribute("class", "modal_card write-post");
      document
        .querySelector(".modal_main")
        .setAttribute("class", "modal_main write-post");

      const backBtn = document.querySelector(".modal_back > img");
      backBtn.style.visibility = "visible";
      const shareBtn = document.querySelector(".modal_header > p");
      shareBtn.style.visibility = "visible";

      document.querySelector(".modal_main").innerHTML = createPost(imageBase64);

      backBtn.addEventListener("click", () => {
        document.querySelector("body").removeChild(modalEl);
        createModal();
      });
      shareBtn.addEventListener("click", () => {
        if (window.indexedDB) {
          const databaseName = "instagram";
          const version = 1;
          const request = indexedDB.open(databaseName, version);
          const data = {
            content: document.querySelector(".modal_write > textarea").value,
            image: imageBase64,
          };

          request.onupgradeneeded = () => {
            request.result.createObjectStore("posts", { autoIncrement: true });
          };
          request.onsuccess = () => {
            const store = request.result
              .transaction("posts", "readwrite")
              .objectStore("posts");

            store.add(data);
          };
        }
      });
    };

    reader.onerror = (error) => {
      alert("Error: ", error);
      document.querySelector("body").removeChild(modalEl);
    };
  });
}
