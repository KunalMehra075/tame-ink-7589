let baseURL = "http://localhost:4500";

let signform = document.getElementById("SignupForm");
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
    console.log(data);
    // "warning","success","error","info"
    if (data.exist) {
      swal("User Already Exists!", "Please Login.", "warning");
      return;
    }
    if (!data.Err) {
      swal("Signup Successful!", "You are now Registered!", "success");
      sessionStorage.setItem("current-user", JSON.stringify(data.User));
    } else {
      swal("Something Went Wrong.", "", "error");
    }
  } catch (error) {
    console.log(error);
  }
}
