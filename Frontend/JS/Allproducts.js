let htl = document.getElementById("HTL");
let lth = document.getElementById("LTH");
let Container = document.getElementById("ThreeCardContainerX");
let initiator = JSON.parse(sessionStorage.getItem("current-user"));
htl.addEventListener("click", () => {
  htl.classList.add("htlid");
  lth.classList.remove("htlid");
});
lth.addEventListener("click", () => {
  htl.classList.remove("htlid");
  lth.classList.add("htlid");
});
async function fetchproducts(query) {
  try {
    let res = await fetch(`${baseURL}/products?type=${query}`);
    let data = await res.json();
    RenderData(data.Products);
  } catch (error) {
    console.log(error);
  }
}

let query = sessionStorage.getItem("product-type") || "HOME+DECOR";
fetchproducts(query);

function RenderData(products) {
  Container.innerHTML = "";
  products = products
    .map((item) => {
      return `
    <div class="ChildBoxes" data-id=${item._id}>
        <div class="childimage">
          <img data-id=${item._id} src="${item.thumbnail}" alt="" />
        </div>
        <div class="details" data-id=${item._id}>
          <label class="titleX" data-id=${item._id}
            >${item.title.substring(0, 70)}</label
          ><br />
          <label data-id=${item._id} class="brandX">${item.brand}</label><br />
          <label data-id=${item._id} class="priceX">₹${item.price}</label>
          <label data-id=${item._id} class="cutprX">
          ₹${+item.price + 1000}</label><br />
          <label data-id=${item._id} class="typeX">
          ${item.type}</label>
          <label data-id=${item._id} class="discountX">
          ${item.discount}% Off</label><br />
          <label data-id=${item._id} class="ratingX">Rating : ${item.rating} 
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
          <button data-id=${item._id}
           class="addtocartX" Add-to-cart>Add To cart</button>
          <img class="heart"
           data-like="notlike" src="./Images/icons/blakheart.png" alt="">
        </div>
        </div>
    `;
    })
    .join(" ");

  Container.innerHTML = products;
  let addtocartbtns = document.getElementsByClassName("addtocartX");
  for (const button of addtocartbtns) {
    button.addEventListener("click", (e) => {
      if (!initiator) {
        swal("Please Login First!", "No user currently logged in", "warning");
        return;
      }
      AddToCartFunction(initiator._id, e.target.dataset.id);
    });
  }
  let ChildBoxes = document.getElementsByClassName("ChildBoxes");
  for (const box of ChildBoxes) {
    box.addEventListener("click", (e) => {
      sessionStorage.setItem("oneproduct", e.target.dataset.id);
      if (!e.target.matches("[Add-to-cart]")) {
        console.log("Childbox");
        window.location.href = "Oneproduct.html";
      }
    });
  }
}
function AddToCartFunction(UserID, productID) {
  if (!initiator) {
    swal("Please Login First", "No user in", "info");
    return;
  }
  FetchProductForCart(productID, UserID);
}
async function FetchProductForCart(id, userid) {
  try {
    let res = await fetch(`${baseURL}/products?_id=${id}`);
    let data = await res.json();
    AddtoCart(data.Products[0], userid);
  } catch (error) {
    console.log(error);
  }
}
async function AddtoCart(product, userid) {
  let obj = {
    title: product.title,
    type: product.type,
    price: product.price,
    brand: product.brand,
    rating: product.rating,
    thumbnail: product.thumbnail,
    images: [product.images[0], product.images[1]],
    discount: product.discount,
    description: product.description,
    UserID: userid,
    ProductID: product._id,
    Quantity: 1,
    UserName: initiator.name,
  };

  try {
    let res = await fetch(`${baseURL}/cart/post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let data = await res.json();

    if (data.exist) {
      swal("Already in cart!", "Product already added in cart!", "info");
    } else {
      swal("Added to Cart!", "Product Added Successfully!", "success");
    }
  } catch (error) {
    console.log(error);
  }
}
