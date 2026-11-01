/**
 * ブラウザバック時処理（スマホ対応）
 */
window.onpageshow = function (event) {

  if (event.persisted) {
    window.location.reload();
  }

};

// ================================================================

/**
 * 初期化
 */
$(document).ready(function () {

  // ------------------------------------------------
  // 要素を追加する箇所を指定
  // ------------------------------------------------

  // コンテナ
  const imageContainer = document.querySelector(".container");

  // カテゴリ
  const category = imageContainer.getAttribute("id");

  // 表示する画像の数
  const numImagesToShow = 15;

  // 画像の総数
  const imageMaxCount = 261;

  // ------------------------------------------------
  // 汎用データをセッションストレージに記憶
  // ------------------------------------------------

  sessionStorage.setItem("category", category);

  sessionStorage.setItem("imageMax", imageMaxCount);


  // ------------------------------------------------
  // ランダムにインデックスを指定
  // ------------------------------------------------

  let arr = [];

  for (let i = 0; i < imageMaxCount; i++) {

    arr[i] = i + 1;

  }

  let len = arr.length;

  let targets = [];

  for (let j = 0; j < numImagesToShow; j++, len--) {

    const rndNum = Math.floor(Math.random() * len);

    targets.push(arr[rndNum]);

    arr[rndNum] = arr[len - 1];

  }

  // ------------------------------------------------
  // 抜き出したファイル名を使用して、画像を表示する。
  // ------------------------------------------------

  targets.forEach((k) => {

    // ------------------------------------------------
    // 要素作成
    // ------------------------------------------------

    const image = document.createElement("img");

    image.classList.add("item");

    image.classList.add("clickable");

    const imageFileName =
      "./image/" +
      category +
      "/click/art_" +
      String(k).padStart(4, "0") +
      ".png";

    image.setAttribute("data-src", imageFileName);

    image.setAttribute("data-index", k);

    imageContainer.appendChild(image);

    // ------------------------------------------------
    // ランダム移動
    // ------------------------------------------------

    moveElement(image, true);

  });

  const imgElements = document.querySelectorAll("img.item");

  for (let i = 0; i < imgElements.length; i++) {

    const item = imgElements[i];

    // ------------------------------------------------
    // 遅延読み込み
    // ------------------------------------------------

    item.src = item.getAttribute("data-src");
    item.removeAttribute("data-src");

    // ------------------------------------------------
    // 画像読み込み完了したときの処理
    // ------------------------------------------------

    item.addEventListener("load", () => {

      // 次の移動をスケジュールする
      moveElement(item);

      // 移動終了後に、次の移動をスケジュールするように設定
      item.addEventListener("transitionend", (event) => {

        if (event.target !== item) {
          return;
        }

        // イベント重複防止
        if (event.propertyName !== "left") {
          return;
        }

        moveElement(item);
      });

      // イベント付加
      item.addEventListener("click", () => {
        // セッションストレージにデータをセット
        sessionStorage.setItem("index", item.getAttribute("data-index"));
        sessionStorage.setItem("prev", "./index.html");

        // ページ遷移
        open("detail.html", "_self");
      });

    });

  }

});

// ================================================================

/**
 * 移動速度
 */
const moveSpeed = 150;

// ================================================================

/**
 * 要素ごとの回転角度を管理
 */
const rotationAngles = new WeakMap();

// ================================================================

/**
 * ランダム移動設定
 */
function moveElement(element, pre = false) {

  // ------------------------------------------------
  // 現在座標を取得
  // ------------------------------------------------

  const rect = element.getBoundingClientRect();

  const startX = rect.left + rect.width / 2;

  const startY = rect.top + rect.height / 2;

  // ------------------------------------------------
  // Ｘ座標
  // ------------------------------------------------

  let randomLeft = Math.random() * window.innerWidth;

  // ------------------------------------------------
  // Ｙ座標
  // ------------------------------------------------

  let randomTop = Math.random() * window.innerHeight;

  // ------------------------------------------------
  // 角度
  // ------------------------------------------------

  // 要素の現在角度を取得
  let angle = rotationAngles.get(element);
  if (angle === undefined) {
    angle = 0;
  }

  // －３６０～＋３６０度でランダム設定
  const maxAngle = 360;
  angle += Math.floor(Math.random() * maxAngle);
  angle -= Math.floor(Math.random() * maxAngle);

  // 回転角度を設定
  rotationAngles.set(element, angle);

  // ------------------------------------------------
  //
  // ------------------------------------------------

  if (pre) {

    // 大きさ
    const max = 1.0;
    const min = 0.1;
    const scale = Math.random() * (max - min) + min;

    // 設定
    element.style.width = "calc(max(45vw, 45vh) * " + scale + ")";

  } else {

    // トランジション
    const dist = Math.sqrt(
      Math.pow(startX - randomLeft, 2) + Math.pow(startY - randomTop, 2)
    );

    const time = dist / moveSpeed;
    element.style.transition = "all " + time + "s linear";
  }

  // ------------------------------------------------
  // 移動の反映
  // ------------------------------------------------

  element.style.left = randomLeft + "px";

  element.style.top = randomTop + "px";

  element.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";

}
