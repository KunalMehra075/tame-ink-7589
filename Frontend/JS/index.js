// -----------------------------------Sliders --------------------------------------

const nxtbtn = document.querySelector("#nxt-but");
const prebtn = document.querySelector("#pre-but");

if (prebtn && nxtbtn) {
  prebtn.addEventListener("click", () => {
    document
      .querySelector("#Slider")
      .setAttribute("class", "compslidtranslatePRE");
  });
  nxtbtn.addEventListener("click", () => {
    document
      .querySelector("#Slider")
      .setAttribute("class", "compslidtranslateNXT");
  });
}
// --------------------------------------------------------------------------------------//

let AllProductButtons = document.querySelectorAll(
  ".main-mega-menu p,.main-mega-menu a,#ThreeCardParent > div > img, #FourCardParent > div > img, #SixCardParent > div > img"
);
AllProductButtons.forEach((item) => {
  item.addEventListener("click", () => {
    window.location.href = "AllProducts.html";
  });
});
