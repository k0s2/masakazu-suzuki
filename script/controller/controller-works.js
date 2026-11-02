// 画像切り替え用
let imageChangeCount = 0;

// 切り替えタイミング（ms）
const imageChangeDuration = 2000;

/**
 * 初期化
 */
$(document).ready(function () {

  // 画像切り替え用
  imageChangeCount = 0;

  // 画像切り替え
  setInterval(() => {
    imageAnimation();
  }, imageChangeDuration);

});

/**
 * ギャラリー画像の切り替え
 */
function imageAnimation() {

  const animationTargets = document.querySelectorAll(".images img");

  const item = animationTargets[imageChangeCount];

  if (
    item
    && item.getAttribute("data-image1")
    && item.getAttribute("data-image2")
  ) {
    item.src = item.getAttribute("data-image2");

    setTimeout(() => {
      item.src = item.getAttribute("data-image1");
    }, imageChangeDuration);

  }

  imageChangeCount++;

  if (imageChangeCount >= animationTargets.length) {
    imageChangeCount = 0;
  }

}
