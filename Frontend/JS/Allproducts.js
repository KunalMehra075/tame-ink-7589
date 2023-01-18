let htl = document.getElementById("HTL");
let lth = document.getElementById("LTH");
htl.addEventListener("click", () => {
  htl.classList.add("htlid");
  lth.classList.remove("htlid");
});
lth.addEventListener("click", () => {
  htl.classList.remove("htlid");
  lth.classList.add("htlid");
});
let hmm = document.getElementsByClassName("ChildBoxes");
for (let i = 0; i < hmm.length; i++) {
  hmm[i].addEventListener("mouseenter", () => {
    hmm[i].children[1].children[12].style.display = "block";
  });
  hmm[i].addEventListener("mouseleave", () => {
    hmm[i].children[1].children[12].style.display = "none";
  });
}
