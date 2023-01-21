let signform = document.getElementById("SignupForm");
let userpass = null;
let useremail = null;
signform.addEventListener("submit", (e) => {
  e.preventDefault();
  let pass = signform.password.value;
  let conf = signform.confpass.value;
  if (pass.length < 6) {
    swal("Weak Password", "Min length of password should be 6!", "info");
    return;
  }
  if (conf != pass) {
    swal("Passwords do not Match!", "Please re-enter password!", "warning");
    signform.password.value = "";
    signform.confpass.value = "";
    return;
  }

  let mob = +signform.mobile.value;
  if (!mob) {
    mob = Math.floor(Math.random() * 100000000000);
    if (mob < 999999999) {
      mob = 9576842334;
    }
  }
  let obj = {
    name: signform.name.value,
    email: signform.emails.value,
    pass: signform.password.value,
    mobile: signform.mobile.value || mob,
    gender: signform.gender.value,
  };
  userpass = signform.password.value;
  useremail = signform.emails.value;
  AddUser(obj);
});
async function AddUser(user) {
  try {
    let res = await fetch(`${baseURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await res.json();
    // console.log(data);

    if (data.exist) {
      swal("User Already Exists!", "Please Login.", "warning");
      return;
    }
    if (!data.Err) {
      swal("Signup Successful!", "You are now Registered!", "success");
      console.log(data);
      LoginRequest(useremail, userpass);
    } else {
      swal("Something Went Wrong.", "", "error");
    }
  } catch (error) {
    console.log(error);
  }
}

async function LoginRequest(email, pass) {
  let creds = { email, pass };
  try {
    let res = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    let data = await res.json();
    console.log(data);
    if (!data.Err) {
      sessionStorage.setItem("current-user", JSON.stringify(data.user));
      sessionStorage.setItem("token", data.token);
      setTimeout(() => {
        swal(
          "You are now Logged in",
          "Lets Explore, Redirecting to Home page....",
          "success"
        );
      }, 700);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } else {
      console.log(data.Err);
    }
  } catch (error) {
    console.log(error);
  }
}
