let popover = document.getElementById("popover");
let username = document.getElementById("username");
let user = JSON.parse(sessionStorage.getItem("current-user"));
let LoginForm = document.getElementById("LoginForm");
let UserPresent = document.getElementById("UserPresent");
let loginname = document.getElementById("LoginName");
let canvasname = document.getElementById("canvasname");
let canvasemail = document.getElementById("canvasemail");
let canvasid = document.getElementById("canvasid");
let logout = document.getElementById("logout");

window.addEventListener("load", () => {
  if (user) {
    let initial = user.name.split(" ")[0];
    username.innerText = initial;
    canvasname.innerHTML = user.name;
    canvasemail.innerHTML = user.email;
    canvasid.innerHTML = `ID.- ${user._id}`;
    loginname.innerHTML = "Welcome User";
    UserPresent.style.display = "block";
    LoginForm.style.display = "none";
  } else {
    username.innerText = "";
    UserPresent.style.display = "none";
    LoginForm.style.display = "block";
  }
  if (user === "" && popover) {
    setTimeout(() => {
      popover.style.display = "block";
      popover.style.opacity = "1";
    }, 3000);
    setTimeout(() => {
      popover.style.display = "none";
      popover.style.opacity = "0";
    }, 7000);
  }
});
logout.addEventListener("click", () => {
  swal({
    title: "Logout?",
    text: "You will be logged out of your account",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      sessionStorage.clear();
      localStorage.clear;
      window.location.href = "index.html";
    } else {
      return;
    }
  });
});
