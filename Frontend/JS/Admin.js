let btn0 = document.getElementById("bxn0");
let btn1 = document.getElementById("bxn1");
let btn2 = document.getElementById("bxn2");
let btn3 = document.getElementById("bxn3");
let btn4 = document.getElementById("bxn4");
let btn5 = document.getElementById("bxn5");
let btn6 = document.getElementById("bxn6");
let allnavs = document.querySelectorAll("#Navigator>button");
let allsects = document.querySelectorAll(".AllSects>section");
let welcome = document.getElementById("WelcomeAdmin");
let adminimg = document.getElementById("adminimg");
let hex1 = document.getElementById("hex1");
let hex2 = document.getElementById("hex2");
let welcomehead = document.getElementById("welcomehead");
let welcomesubhead = document.getElementById("welcomesubhead");
let img1 = document.getElementById("thumbnail");
let img2 = document.getElementById("img1");
let img3 = document.getElementById("img2");
let sxm1 = document.getElementById("sxmimg1");
let sxm2 = document.getElementById("sxmimg2");
let sxm3 = document.getElementById("sxmimg3");

window.addEventListener("load", () => {
  removefn();
  btn6.classList.add("activenav");
  setTimeout(() => {
    hex1.style.opacity = "0.4";
    hex2.style.opacity = "0.4";
  }, 500);
  setTimeout(() => {
    adminimg.style.opacity = "1";
  }, 700);
  setTimeout(() => {
    welcomehead.style.opacity = "1";
  }, 900);
  setTimeout(() => {
    welcomesubhead.style.opacity = "1";
  }, 1000);
});

img1.addEventListener("input", () => {
  sxm1.setAttribute("src", img1.value);
});
img2.addEventListener("input", () => {
  sxm2.setAttribute("src", img2.value);
});

img3.addEventListener("input", () => {
  sxm3.setAttribute("src", img3.value);
});

function removefn() {
  for (let i = 0; i < allnavs.length; i++) {
    allnavs[i].classList.remove("activenav");
  }
  for (let i = 0; i < allsects.length; i++) {
    allsects[i].style.display = "none";
  }
}
btn0.addEventListener("click", () => {
  removefn();
  btn0.classList.add("activenav");
  welcome.style.display = "none";
  allsects[0].style.display = "block";
});
btn1.addEventListener("click", () => {
  removefn();
  btn1.classList.add("activenav");
  welcome.style.display = "none";
  allsects[1].style.display = "block";
});
btn2.addEventListener("click", () => {
  removefn();
  btn2.classList.add("activenav");
  welcome.style.display = "none";
  allsects[2].style.display = "block";
});
btn3.addEventListener("click", () => {
  removefn();
  btn3.classList.add("activenav");
  welcome.style.display = "none";
  allsects[3].style.display = "block";
});
btn4.addEventListener("click", () => {
  removefn();
  btn4.classList.add("activenav");
  welcome.style.display = "none";
  allsects[4].style.display = "block";
});
btn5.addEventListener("click", () => {
  removefn();
  btn5.classList.add("activenav");
  welcome.style.display = "none";
  allsects[5].style.display = "block";
});
btn6.addEventListener("click", () => {
  removefn();
  welcome.style.display = "flex";
  btn6.classList.add("activenav");
});
