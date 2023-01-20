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
let UserNameX = document.getElementById("UserNameX");
let UserEmail = document.getElementById("UserEmail");
let UserMobile = document.getElementById("UserMobile");
let UserGender = document.getElementById("UserGender");
let UserRole = document.getElementById("UserRole");
let UserCartDetails = document.getElementById("UserCartDetails");
let UserFavoriteDivs = document.getElementById("UserFavoriteDivs");
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
    RenderOFFCANVAS(user);
  } else {
    username.innerText = "";
    UserPresent.style.display = "none";
    LoginForm.style.display = "block";
  }
  if (!user && popover) {
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

function RenderOFFCANVAS(user) {
  UserNameX.innerText = user.name;
  UserEmail.innerText = user.email;
  UserMobile.innerText = user.mobile;
  UserGender.innerText = user.gender;
  UserRole.innerText = user.role;
  FetchCartProducts(user._id);
  FetchFavorites(user._id);
}
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
async function FetchCartProducts(userid) {
  try {
    let res = await fetch(`${baseURL}/carts?UserID=${userid}`);
    let data = await res.json();
    RenderOffCanvasCart(data.Items);
  } catch (error) {
    console.log(error);
  }
}
async function FetchFavorites(userid) {
  try {
    let res = await fetch(`${baseURL}/favorites?UserID=${userid}`);
    let data = await res.json();
    RenderOffCanvasFav(data.Items);
  } catch (error) {
    console.log(error);
  }
}
function RenderOffCanvasCart(products) {
  if (products.length === 0) {
    UserCartDetails.innerHTML = `
    <div id="Fetchcanvascart">
    <!-- Canvaschilds -->
    <br/>
    <center>No Favorites </center>
    <div>
    <div style="display: flex;justify-content:space-between;">
      <label><b>Total Items :</b> 0</label>
   
      <label><b>Total Price :</b> <span style="color:red;
        font-weight:600;
      ">₹0</span></label>
    </div>
    <a href="Cart.html">  <button id="gotocartX" class="WhiteRedbtn">
    Proceed to Cart</button></a>
   </div>
`;
    return;
  }

  let totalmm = 0;
  let totalitemsmm = 0;
  for (const i of products) {
    totalmm += i.price * i.Quantity;
    totalitemsmm += i.Quantity;
  }

  products = products
    .map((item) => {
      return `
  
    <div class="ChildCanvas">
    <div><img height="100px" src="${item.thumbnail}" alt=""></div>
    <div id="canvas2nd">
      <label id="canvasTitle">${item.title.substring(0, 25)}</label><br>
      <label id="canvasDescp" for="">
      ${item.description.substring(0, 50)}</label><br>
      <label id="canvasRating" for="">Rating :${item.rating}
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-half-filled-star.svg" alt="">
      
      </label>
    </div>
  <div id="canvasPrice">
 <b> Price:</b>
 ₹${item.price}
  </div>
  <div id="canvasQnty">
  <b> Qty:</b>
  ${item.Quantity}
  </div>
  </div>`;
    })
    .join(" ");

  UserCartDetails.innerHTML = `
    <div id="Fetchcanvascart">
    <!-- Canvaschilds -->
    ${products}
    <div>
    <div style="display: flex;justify-content:space-between;">
      <label><b>Total Items :</b> ${totalitemsmm}</label>
   
      <label><b>Total Price :</b> <span style="color:red;
        font-weight:600;
      ">₹${totalmm}</span></label>
    </div>
    <a href="Cart.html">  <button id="gotocartX" class="WhiteRedbtn">
    Proceed to Cart</button></a>
    <hr>
   </div>

    
    `;
}
function RenderOffCanvasFav(products) {
  if (products.length === 0) {
    UserFavoriteDivs.innerHTML = `
    <center>No Favorites </center>
`;
    return;
  }
  products = products
    .map((item) => {
      return `
  
    <div class="ChildCanvas">
    <div><img height="100px" src="${item.thumbnail}" alt=""></div>
    <div id="canvas2nd">
      <label id="canvasTitle">${item.title.substring(0, 25)}</label><br>
      <label id="canvasDescp" for="">
      ${item.description.substring(0, 50)}</label><br>
      <label id="canvasRating" for="">Rating :${item.rating}
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
      <img data-id=${item._id} width="11px" 
      src="https://ii1.pepperfry.com/images/svg/vip-rating-half-filled-star.svg" alt="">
      
      </label>
    </div>
  <div id="canvasPrice">
 <b> Price:</b>
 ₹${item.price}
  </div>
  <div id="canvasQnty">
  <b> Brand:</b>
  ${item.brand}
  <br/>
  <br/>
  <img width="25px" class="FavRemovers" data-id=${item._id}
 src="Images/icons/redheart.png" alt="" tooltip="Remove">
  </div>
  </div>`;
    })
    .join(" ");

  UserFavoriteDivs.innerHTML = `
    ${products}
    <hr>
    `;
  let FavRemovers = document.getElementsByClassName("FavRemovers");
  for (const frvs of FavRemovers) {
    frvs.addEventListener("click", (e) => {
      swal({
        title: "Remove From Fav?",
        text: "Item will be removed from Favorites",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          DeleteFav(e.target.dataset.id);
        } else {
          swal("Item is in favorites");
        }
      });
    });
  }
}
async function DeleteFav(id) {
  try {
    let res = await fetch(`${baseURL}/favorites/delete/${id}`, {
      method: "DELETE",
    });
    let data = await res.json();
    console.log(data);
    swal("Removed from Favorites", "", "success");
    FetchFavorites(user._id);
  } catch (error) {
    console.log(error);
  }
}
