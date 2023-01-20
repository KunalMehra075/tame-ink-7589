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
//! <!----------------------------------------------- < Login Section> ----------------------------------------------->
let UserLoginForm = document.getElementById("LoginForm");
UserLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let creds = {
    email: UserLoginForm.emailX.value,
    pass: UserLoginForm.passX.value,
  };
  console.log(creds.email, creds.pass);

  if (creds.email == "admin@gmail.com" && creds.pass == "kunal143") {
    swal({
      title: "Welcome Back Admin! ",
      text: "Do you want to redirect to Admin's Portal?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((admin) => {
      if (admin) {
        setTimeout(() => {
          window.location.href = "Admin.html";
        }, 1000);
      } else {
        LoginFunction(creds);
      }
    });
  } else {
    LoginFunction(creds);
  }
});
async function LoginFunction(creds) {
  try {
    let res = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    let data = await res.json();

    if (data.exist === false) {
      swal("User Dosen't Exists!", "Please Signup First!", "warning");
      return;
    }
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("current-user", JSON.stringify(data.user));
    swal("Login Successful!", "You are logged in, Lets Explore!", "success");
    setTimeout(() => {
      window.location.href = "";
    }, 2000);
  } catch (error) {
    swal("Something Went Wrong.", "Server Error 504 ", "error");
    console.log(error);
  }
}
