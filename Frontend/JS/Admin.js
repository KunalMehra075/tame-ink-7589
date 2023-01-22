let allnavs = document.querySelectorAll("#Navigator>button");
let allsects = document.querySelectorAll(".AllSects>section");
let welcome = document.getElementById("WelcomeAdmin");
let adminimg = document.getElementById("adminimg");
let hex1 = document.getElementById("hex1");
let hex2 = document.getElementById("hex2");
let welcomehead = document.getElementById("welcomehead");
let welcomesubhead = document.getElementById("welcomesubhead");
let btn0 = document.getElementById("bxn0");
let btn1 = document.getElementById("bxn1");
let btn2 = document.getElementById("bxn2");
let btn3 = document.getElementById("bxn3");
let btn4 = document.getElementById("bxn4");
let btn5 = document.getElementById("bxn5");
let btn6 = document.getElementById("bxn6");
let img1 = document.getElementById("thumbnail");
let img2 = document.getElementById("img1");
let img3 = document.getElementById("img2");
let sxm1 = document.getElementById("sxmimg1");
let sxm2 = document.getElementById("sxmimg2");
let sxm3 = document.getElementById("sxmimg3");
let spinner = document.getElementById("spinner");
var navbar = document.getElementById("stickynav");
var sticky = navbar.offsetTop;
//? <!----------------------------------------------- < offcanvas.js> ----------------------------------------------->
let user = JSON.parse(sessionStorage.getItem("current-user"));
let UserPresent = document.getElementById("UserPresent");
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
let ADR = document.getElementById("AdminRedirect");
ADR.addEventListener("click", () => {
  window.addEventListener("load", () => {
    spinner.style.display = "block"; //!Spinner
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
    spinner.style.display = "none"; //!Spinner
  });

  img1.addEventListener("input", () => {
    spinner.style.display = "block"; //!Spinner
    sxm1.setAttribute("src", img1.value);
    spinner.style.display = "none"; //!Spinner
  });
  img2.addEventListener("input", () => {
    spinner.style.display = "block"; //!Spinner
    sxm2.setAttribute("src", img2.value);
    spinner.style.display = "none"; //!Spinner
  });

  img3.addEventListener("input", () => {
    spinner.style.display = "block"; //!Spinner
    sxm3.setAttribute("src", img3.value);
    spinner.style.display = "none"; //!Spinner
  });

  function removefn() {
    spinner.style.display = "block"; //!Spinner
    for (let i = 0; i < allnavs.length; i++) {
      allnavs[i].classList.remove("activenav");
    }
    for (let i = 0; i < allsects.length; i++) {
      allsects[i].style.display = "none";
    }
    spinner.style.display = "none"; //!Spinner
  }
  btn0.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    btn0.classList.add("activenav");
    welcome.style.display = "none";
    allsects[0].style.display = "block";
    spinner.style.display = "none"; //!Spinner
  });
  btn1.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    btn1.classList.add("activenav");
    welcome.style.display = "none";
    allsects[1].style.display = "block";
    spinner.style.display = "none"; //!Spinner
  });
  btn2.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    btn2.classList.add("activenav");
    welcome.style.display = "none";
    allsects[2].style.display = "block";
    spinner.style.display = "none"; //!Spinner
  });
  btn3.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    btn3.classList.add("activenav");
    welcome.style.display = "none";
    allsects[3].style.display = "block";
    spinner.style.display = "none"; //!Spinner
  });
  btn4.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    btn4.classList.add("activenav");
    welcome.style.display = "none";
    allsects[4].style.display = "block";
    spinner.style.display = "none"; //!Spinner
  });
  btn5.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    btn5.classList.add("activenav");
    welcome.style.display = "none";
    allsects[5].style.display = "block";
    spinner.style.display = "none"; //!Spinner
  });
  btn6.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    removefn();
    welcome.style.display = "flex";
    btn6.classList.add("activenav");
    spinner.style.display = "none"; //!Spinner
  });

  //? <!----------------------------------------------- < Common.js> ----------------------------------------------->

  function navbarstick() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  window.location.href = "admin.html";
});
window.addEventListener("load", () => {
  spinner.style.display = "block"; //!Spinner
  canvasname.innerHTML = user.name;
  canvasemail.innerHTML = user.email;
  canvasid.innerHTML = `ID.- ${user._id}`;
  UserPresent.style.display = "block";
  spinner.style.display = "none"; //!Spinner
  RenderOFFCANVAS(user);
});
logout.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner
  swal({
    title: "Logout?",
    text: "You will be logged out of your account",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      sessionStorage.clear();
      localStorage.clear();
      spinner.style.display = "none"; //!Spinner
      window.location.href = "index.html";
    } else {
      spinner.style.display = "none"; //!Spinner
      return;
    }
  });
});

function RenderOFFCANVAS(user) {
  spinner.style.display = "block"; //!Spinner
  spinner.style.display = "block";
  UserNameX.innerText = user.name;
  UserEmail.innerText = user.email;
  UserMobile.innerText = user.mobile;
  UserGender.innerText = user.gender;
  UserRole.innerText = user.role;
  if (user.role === "Admin") {
    ADR.style.display = "block";
  }
  spinner.style.display = "none"; //!Spinner
  FetchCartProducts(user._id);
  FetchFavorites(user._id);
}
//! <!----------------------------------------------- < Login Section> ----------------------------------------------->

async function FetchCartProducts(userid) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/carts?UserID=${userid}`);
    let data = await res.json();
    RenderOffCanvasCart(data.Items);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
async function FetchFavorites(userid) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/favorites?UserID=${userid}`);
    let data = await res.json();
    RenderOffCanvasFav(data.Items);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
function RenderOffCanvasCart(products) {
  spinner.style.display = "block"; //!Spinner
  if (products.length === 0) {
    UserCartDetails.innerHTML = `
    <div id="Fetchcanvascart">
    <!-- Canvaschilds -->
    <br/>
    <center>No items in Cart </center>
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
    spinner.style.display = "none"; //!Spinner
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
  spinner.style.display = "none"; //!Spinner
}
function RenderOffCanvasFav(products) {
  spinner.style.display = "block"; //!Spinner
  if (products.length === 0) {
    UserFavoriteDivs.innerHTML = `
    <center>No Favorites </center>
    <hr>
`;
    spinner.style.display = "none"; //!Spinner
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
      spinner.style.display = "block"; //!Spinner
      spinner.style.display = "none"; //!Spinner
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
          spinner.style.display = "none"; //!Spinner
          swal("Item is in favorites");
        }
      });
    });
  }
  spinner.style.display = "none"; //!Spinner
}
async function DeleteFav(id) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/favorites/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    console.log(data);
    spinner.style.display = "none"; //!Spinner
    swal("Removed from Favorites", "", "success");
    FetchFavorites(user._id);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
