// ----------------------------------------------------------Sliders --------------------------------------
// slider buttons--------:----
const nxtbtn = document.querySelector("#nxt-but");
const prebtn = document.querySelector("#pre-but");
// -------------------------------------------slider1 -------------------------------------------//
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
