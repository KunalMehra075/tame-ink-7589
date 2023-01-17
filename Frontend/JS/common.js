let closetop1 = document.getElementById("close-top1");
let topfirst = document.getElementById("top1");
var navbar = document.getElementById("stickynav");
var sticky = navbar.offsetTop;

closetop1.addEventListener("click", () => {
  topfirst.style.opacity = "0.0";
  topfirst.style.transform = "translateX(-50px)";

  setTimeout(() => {
    topfirst.style.display = "none";
  }, 300);
});
window.onscroll = function () {
  navbarstick();
};

function navbarstick() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});
