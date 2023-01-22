let Initiator = JSON.parse(sessionStorage.getItem("current-user"));
let CartItems = [];
GetCartItems(Initiator._id);

async function GetCartItems(id) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/carts?UserID=${id}`);
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
  let Total = document.getElementById("BigTotal");
  let totalitms = document.getElementById("totalitems");
  let total1 = document.querySelector(
    " #totals > div:nth-child(1) > label:nth-child(2)"
  );
  total1.innerText = `₹${total}`;
  Total.innerText = `₹${total}`;
  totalitms.innerText = totalitems;
  spinner.style.display = "none"; //!Spinner
}

// }
//? <!-------------------------------------<ShowData on Checkout Page> ----------------------------------------------->

function RenderCartData(data) {
  spinner.style.display = "block"; //!Spinner
  let productList = document.querySelector(".showproducts");
  if (data.length === 0) {
    productList.innerHTML = ` <label>Your Basket is Empty..</label>
  <a href="AllProducts.html"
    ><button class="EmptyCart">Lets look for Products-></button></a
  >`;
    spinner.style.display = "none"; //!Spinner
    return;
  }
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
                <label for="">Quantity</label>
                <button data-id="${item._id}" 
                class="plusminus" id="minus">➖</button>
                <input class="quantity" data-id=${item._id}
                 value="${item.Quantity}">
                <button data-id="${item._id}" 
                class="plusminus" id="plus">➕</button>
                <label>Size: M</label><span></span><br />
                <div class="cardbuttons">
                  <button class="removeNview" data-id="${item._id}"
                   id="remove">Remove from Cart</button>
                  <button class="removeNview" data-one="${item._id}"
                    id="view">View Product Details</button>
                </div>
              </div>
            </div> 
        `;
  });
  productList.innerHTML = newArray.join(" ");

  // ?------------------------------------<Remove From Cart>------------------------------------------------

  let allremove = document.querySelectorAll("#remove");
  for (const remove of allremove) {
    remove.addEventListener("click", function (event) {
      spinner.style.display = "block"; //!Spinner
      let id = event.target.dataset.id;
      swal({
        title: "Remove Item from cart?",
        text: "Item will be removed from basket.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          spinner.style.display = "none"; //!Spinner
          RemoveProductCrt(id);
        } else {
          spinner.style.display = "none"; //!Spinner
          swal("Item is in the Cart");
        }
      });
    });
  }

  let AllView = document.querySelectorAll("#view");
  for (const view of AllView) {
    view.addEventListener("click", function (e) {
      spinner.style.display = "block"; //!Spinner
      setTimeout(() => {
        window.location.href = "AllProducts.html";
      }, 500);
    });
  }

  // ?------------------------------------<Decrease Quantity and Update Total>------------------------------------------------

  let Allminus = document.querySelectorAll("#minus");
  for (const minus of Allminus) {
    minus.addEventListener("click", (event) => {
      spinner.style.display = "block"; //!Spinner
      if (event.target.nextElementSibling.value == 1) {
        spinner.style.display = "none"; //!Spinner
        return;
      } else {
        let id = event.target.dataset.id;
        event.target.nextElementSibling.value--;
        let qty = +event.target.nextElementSibling.value;
        ChangeProductQty(id, qty);
      }
    });
  }
  // ?------------------------------------<Increase Quantity and Update Total>------------------------------------------------

  let Allplus = document.querySelectorAll("#plus");
  for (const plus of Allplus) {
    plus.addEventListener("click", (event) => {
      spinner.style.display = "block"; //!Spinner
      if (event.target.previousElementSibling.value > 10) {
        swal(
          "Cannot add more products!",
          "Please order in bulk to add more products!",
          "error"
        );
        spinner.style.display = "none"; //!Spinner
        return;
      }
      let id = event.target.dataset.id;
      event.target.previousElementSibling.value++;
      let qty = +event.target.previousElementSibling.value;
      ChangeProductQty(id, qty);
    });
  }
  //? <!----------------------------------------------- Extra Function ----------------------------------------------->
  // .Check Delivery
  let check = document.getElementById("checkbutton");
  check.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    let pincode = document.getElementById("delievery-input").value;
    swal(
      "Bingo!",
      `These products are available in your locations! \n Pincode :${pincode}`,
      "success"
    );
    spinner.style.display = "none"; //!Spinner
    document.getElementById("delievery-input").value = "";
  });

  //? <!----------------------------------------------- < extra> ----------------------------------------------->

  let checkout = document.getElementById("Checkout");

  checkout.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
  spinner.style.display = "none"; //!Spinner
}

async function ChangeProductQty(id, qty) {
  spinner.style.display = "block"; //!Spinner
  let payload = {
    Quantity: +qty,
  };
  try {
    let res = await fetch(`${baseURL}/carts/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });
    let data = await res.json();
    console.log(data);
    GetCartItems(Initiator._id);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
async function RemoveProductCrt(id) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/carts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    console.log(data);
    swal("Deleted!", "Product Removed From Cart", "info");
    GetCartItems(Initiator._id);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
