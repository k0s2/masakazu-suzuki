$(document).ready(function () {
  // ================================================================

  const imageContainer = document.querySelector(".gallery");

  // 表示する画像の数
  const imageMaxCount = 261;

  // 画像収納ディレクトリ
  const folderPath = "./image/colorAndShape";

  // ------------------------------------------------
  // ランダムにインデックスを指定
  // ------------------------------------------------

  let arr = [];
  for (let i = 0; i < imageMaxCount; i++) {
    arr[i] = i + 1;
  }

  let len = arr.length;
  let targets = [];
  for (let j = 0; j < imageMaxCount; j++, len--) {
    rndNum = Math.floor(Math.random() * len);
    targets.push(arr[rndNum]);
    arr[rndNum] = arr[len - 1];
  }

  // ------------------------------------------------
  // 要素を追加。
  // ------------------------------------------------

  targets.forEach((id) => {

    const division = document.createElement("div");
    division.classList.add("item");
    division.classList.add("clickable");

    const image = document.createElement("img");
    image.setAttribute(
      "src",
      folderPath + "/list/art_" + String(id).padStart(4, "0") + ".png"
    );

    division.appendChild(image);
    imageContainer.appendChild(division);

    // イベント付加
    division.addEventListener("click", () => {

      // セッションストレージにデータをセット
      sessionStorage.setItem("index", id);
      sessionStorage.setItem("prev", "./allArts.html");

      // ページ遷移
      open("detail.html", "_self");

    });

  });

  // ================================================================
});
