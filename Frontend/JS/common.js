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

let furmenu = document.getElementById("furmenu");
let decormenu = document.getElementById("decormenu");
let petsmenu = document.getElementById("petsmenu");
let lampsmenu = document.getElementById("lampsmenu");

document.addEventListener("click", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button1]");
  if (!ddbtn) {
    furmenu.style.display = "none";
    furmenu.dataset.visible = "X";
  } else {
    if (furmenu.dataset.visible == "Y") {
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    } else {
      furmenu.style.display = "grid";
      furmenu.dataset.visible = "Y";
    }
  }
});
document.addEventListener("click", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button2]");
  if (!ddbtn) {
    decormenu.style.display = "none";
    decormenu.dataset.visible = "X";
  } else {
    if (decormenu.dataset.visible == "Y") {
      decormenu.style.display = "none";
      decormenu.dataset.visible = "X";
    } else {
      decormenu.style.display = "grid";
      decormenu.dataset.visible = "Y";
    }
  }
});
document.addEventListener("click", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button3]");
  if (!ddbtn) {
    petsmenu.style.display = "none";
    petsmenu.dataset.visible = "X";
  } else {
    if (petsmenu.dataset.visible == "Y") {
      petsmenu.style.display = "none";
      petsmenu.dataset.visible = "X";
    } else {
      petsmenu.style.display = "flex";
      petsmenu.dataset.visible = "Y";
    }
  }
});
document.addEventListener("click", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button4]");
  if (!ddbtn) {
    lampsmenu.style.display = "none";
    lampsmenu.dataset.visible = "X";
  } else {
    if (lampsmenu.dataset.visible == "Y") {
      lampsmenu.style.display = "none";
      lampsmenu.dataset.visible = "X";
    } else {
      lampsmenu.style.display = "flex";
      lampsmenu.dataset.visible = "Y";
    }
  }
});
let mybutton = document.getElementById("myBtn");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.documentElement.scrollTop = 0;
}
