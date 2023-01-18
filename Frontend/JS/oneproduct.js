let megalist = document.getElementById("navbar");

function scrollFunction() {
  if (!mybutton) return;
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    mybutton.style.display = "block";
    megalist.style.display = "none";
  } else {
    mybutton.style.display = "none";
    megalist.style.display = "flex";
  }
}
window.onscroll = function () {
  navbarstick();
  scrollFunction();
};
