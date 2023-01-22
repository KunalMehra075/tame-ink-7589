let BaseURL = "http://localhost:4500";

let pre1 = document.getElementById("pre1");
let pre2 = document.getElementById("pre2");
let collapse1 = document.getElementById("collapseOne");
let collapse2 = document.getElementById("collapseTwo");
let collapse3 = document.getElementById("collapseThree");
let collapse4 = document.getElementById("collapseFour");
let clbtn1 = document.getElementById("clbtn1");
let clbtn2 = document.getElementById("clbtn2");
let clbtn3 = document.getElementById("clbtn3");
let clbtn4 = document.getElementById("clbtn4");
let resend = document.getElementById("resend");

let cont = document.getElementById("continue");
cont.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner
  collapse1.classList.remove("show");
  collapse2.classList.add("show");
  clbtn1.classList.add("collapsed");
  clbtn2.classList.remove("collapsed");
  clbtn1.ariaExpanded = "false";
  clbtn2.ariaExpanded = "true";
  spinner.style.display = "none"; //!Spinner
});

let paynow = document.getElementById("paynow");
paynow.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner

  swal({
    title: "Confirm the Order?",
    text: "Payment Will Be recieved when order will be delivered.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      collapse3.classList.remove("show");
      collapse4.classList.add("show");
      clbtn3.classList.add("collapsed");
      clbtn4.classList.remove("collapsed");
      clbtn3.ariaExpanded = "false";
      clbtn4.ariaExpanded = "true";

      spinner.style.display = "none"; //!Spinner

      timerfn();

      let otpalert = document.getElementById("otpalert");
      otpalert.style.display = "block";
      setTimeout(() => {
        otpalert.style.height = "45px";
      }, 200);
      setTimeout(() => {
        otpalert.style.display = "none";
        otpalert.style.height = "0px";
      }, 5000);
    } else {
      swal("Payment Unsuccessful");
      spinner.style.display = "none"; //!Spinner

      setTimeout(() => {
        window.location.href = "cart.html";
      }, 1000);
    }
  });
});

pre1.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner
  pre1.classList.add("activeadd");
  pre2.classList.remove("activeadd");
  spinner.style.display = "none"; //!Spinner
  swal({
    title: "Choose this Address?",
    text: "H.no 70 New Basti Ranjhi Jabalpur",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      spinner.style.display = "block"; //!Spinner
      collapse2.classList.remove("show");
      collapse3.classList.add("show");
      clbtn2.classList.add("collapsed");
      clbtn3.classList.remove("collapsed");
      clbtn2.ariaExpanded = "false";
      clbtn3.ariaExpanded = "true";
      spinner.style.display = "none"; //!Spinner
    }
  });
});
pre2.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner
  pre2.classList.add("activeadd");
  pre1.classList.remove("activeadd");
  spinner.style.display = "none"; //!Spinner
  swal({
    title: "Choose this Address?",
    text: "Sec 2/3 Near CB Mall, Ashok Nagar Indore",
    icon: "info",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      spinner.style.display = "block"; //!Spinner
      collapse2.classList.remove("show");
      collapse3.classList.add("show");
      clbtn2.classList.add("collapsed");
      clbtn3.classList.remove("collapsed");
      clbtn2.ariaExpanded = "false";
      clbtn3.ariaExpanded = "true";
      spinner.style.display = "none"; //!Spinner
    }
  });
});

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  }
}

function timerfn() {
  let timer = document.getElementById("timer");
  let otptime = setInterval(() => {
    let x = +timer.innerText;
    x--;
    if (x < 10) {
      x = "0" + x;
    }
    timer.innerHTML = x;
    if (x == 0) {
      clearTimeout(otptime);
      return;
    }
  }, 1000);
}

resend.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner
  swal("OTP Sent!", "OTP sent to your registered mobile no.!", "info");

  spinner.style.display = "none"; //!Spinner

  let otpalert = document.getElementById("otpalert");
  otpalert.style.display = "block";
  setTimeout(() => {
    otpalert.style.height = "45px";
  }, 100);
  setTimeout(() => {
    otpalert.style.display = "none";
    otpalert.style.height = "0px";
  }, 5000);
});

//? <!----------------------------------------------- < Order Summary> ----------------------------------------------->

let Initiator = JSON.parse(sessionStorage.getItem("current-user"));
let CartItems = [];
GetCartItems(Initiator._id);
async function GetCartItems(id) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${BaseURL}/carts?UserID=${id}`);
    let data = await res.json();
    RenderCartData(data.Items);
    CartItems = [...data.Items];
    UpdateTotal(CartItems);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
UpdateTotal(CartItems);

//? <!----------------------------------- <Updating Total Function> ----------------------------------------------->

function UpdateTotal(cartitems) {
  spinner.style.display = "block"; //!Spinner
  let total = 0;
  let totalitems = 0;
  for (const item of cartitems) {
    total += item.Quantity * item.price;
    totalitems += item.Quantity;
  }
  let tmtl1 = document.getElementById("tmtl1");
  let tmtli = document.getElementById("tmtli");
  let tmtl2 = document.querySelector(" #tmtl2");
  tmtl1.innerText = `₹${total}`;
  tmtl2.innerText = `₹${total}`;
  tmtli.innerText = totalitems;
  spinner.style.display = "none"; //!Spinner
}

function RenderCartData(data) {
  spinner.style.display = "block"; //!Spinner
  if (data.length === 0) {
    // "warning","success","error","info"
    swal("Looks like your cart is empty..", "Redirecting you..", "info");
    setTimeout(() => {
      spinner.style.display = "none"; //!Spinner
      window.location.href = "AllProducts.html";
    }, 1200);
  }
  let productList = document.querySelector(".showproducts");

  let newArray = data.map((item) => {
    return `
        <div class="product-card">
              <div><img src=
              \"${item.thumbnail}\" alt="" /></div>
              <div>
                <h5>${item.title.substring(0, 55)}</h5>
                <label>Price:<a> ${item.price}</a>/-</label> <space></space>
                <label>Rating: ${item.rating} 
                <img data-id=${item._id} width="14px" 
                src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
                <img data-id=${item._id} width="14px" 
                src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
                <img data-id=${item._id} width="14px" 
                src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
                <img data-id=${item._id} width="14px" 
                src="https://ii1.pepperfry.com/images/svg/vip-rating-filled-star.svg" alt="">
                <img data-id=${item._id} width="14px" 
                src="https://ii1.pepperfry.com/images/svg/vip-rating-half-filled-star.svg" alt="">
                </label><br />
                <label>Color: Silver</label><br />
                <label for="">Quantity :</label>
                <label class="quantity" data-id=${item.id}
                 >${item.Quantity}</label>
        
                <label>Size: M</label><span></span><br />
                
              </div>
            </div> 
        `;
  });
  productList.innerHTML = newArray.join(" ");
  spinner.style.display = "none"; //!Spinner
}
let finish = document.getElementById("finish");
finish.addEventListener("click", (e) => {
  spinner.style.display = "none"; //!Spinner
  let otpbox = document.getElementById("sessionNo");
  if (otpbox.value !== "9573") {
    spinner.style.display = "none"; //!Spinner
    swal("Incorrect OTP", "Please enter correct OTP", "error");
    return;
  }
  DeleteCartMany(Initiator._id);
});

async function DeleteCartMany(id) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${BaseURL}/carts/deleteAll/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    if (data.done) {
      spinner.style.display = "none"; //!Spinner
      swal(
        "Order Confirmed!",
        "Thankyou! Your Order will be delivered in few days",
        "success"
      );
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    } else {
      swal("Something Went Wrong", "", "error");
    }
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
