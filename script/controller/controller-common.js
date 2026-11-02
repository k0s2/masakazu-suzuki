// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {

  if (event.persisted) {
    window.location.reload();
  }

};

/**
 * 初期化
 */
$(document).ready(function () {

  // ハンバーガーボタン
  const hamburgerButton = document.querySelector(".hamburgerButton");
  hamburgerButton.addEventListener("click", () => {

    // 開閉
    pushHamburgerButton();

  });

});

/**
 * ハンバーガーボタン
 */
function pushHamburgerButton(mode = 0) {

  const button = document.querySelector(".hamburgerButton");

  const menu = document.querySelector(".menuList");

  switch (mode) {

    // 開く
    case 1:
      button.classList.add("open");
      menu.classList.add("open");
      break;

    // 閉じる
    case 2:
      button.classList.remove("open");
      menu.classList.remove("open");
      break;

    // トグル
    default:
      button.classList.toggle("open");
      menu.classList.toggle("open");

  }

}
