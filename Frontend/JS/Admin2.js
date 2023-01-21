let baseURL = "http://localhost:4500";
let Initiator = JSON.parse(sessionStorage.getItem("current-user"));
window.addEventListener("load", () => {
  preloader.style.display = "none";
});

if (!Initiator || Initiator.role !== "Admin") {
  swal("Admin's ID not found", "Please Login Again", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

let AddProductForm = document.getElementById("addproductform");
AddProductForm.addEventListener("submit", (e) => {
  spinner.style.display = "block";
  e.preventDefault();
  let prp = +AddProductForm.price.value;
  let dis = +AddProductForm.discount.value;
  let rat = +AddProductForm.rating.value;
  let desc = AddProductForm.description.value;
  if (!prp) {
    prp = Math.floor(Math.random() * 10000);
    if (prp < 999) prp = 1999;
  }
  if (!dis) {
    dis = Math.floor(Math.random() * 100);
    if (dis < 10) dis = 12;
  }
  if (!rat) {
    rat = Math.floor(Math.random() * 100) / 10;
    if (rat < 5) rat = 8.2;
  }
  if (!desc) {
    desc =
      "Urban Living is transforming the perception of Indian Craft by offering premium quality furniture at approachable prices. We specialise in developing sofas, loungers and chairs for residential and hospitality marketsContemporary Style Sofas are very current and in trend. Its a very fluid, simplistic style which takes its cues from the in-vogue polishes, textures and colours of the season and is bereft of any ornamentation or embellishments. In this style you can see nods to modern, traditional, art deco and even futuristic design..";
  }
  let product = {
    title: AddProductForm.title.value,
    type: AddProductForm.type.value,
    price: +AddProductForm.price.value || prp,
    brand: AddProductForm.brand.value,
    thumbnail: AddProductForm.thumbnail.value,
    rating: AddProductForm.rating.value || rat,
    images: [AddProductForm.img1.value, AddProductForm.img2.value],
    discount: AddProductForm.discount.value || dis,
    description: AddProductForm.description.value || desc,
  };
  AddProduct(product);
});
async function AddProduct(product) {
  try {
    let res = await fetch(`${baseURL}/products/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(product),
    });
    let data = await res.json();
    console.log(data);
    spinner.style.display = "none";
    swal("Added Product", "Product Added Successfully!", "success");
  } catch (error) {
    swal("Something Went Wrong", "", "warning");
    console.log(error);
  }
}

AllEditProducts();
async function AllEditProducts() {
  spinner.style.display = "block";
  try {
    let res = await fetch(`${baseURL}/products/`);
    let data = await res.json();
    RenderEditProducts(data.Products);
  } catch (error) {
    console.log(error);
  }
}
function RenderEditProducts(data) {
  let Editscontainer = document.getElementById("ThreeCardContainerX");
  if (data.length == 0) {
    Editscontainer.innerHTML = `
    <p style="color: red;font-weight:600px;font-size:20px">No Products Found...</p>`;

    spinner.style.display = "none";
    return;
  }
  data = data
    .map((item) => {
      return `
 
    <div class="ChildBoxes">
        <div class="childimage">
          <img width="100px" src="${item.thumbnail}" alt="" />
        </div>
        <div class="details">
          <label class="titleX">${item.title.substring(0, 50)}</label><br />
          <label class="brandX">${item.brand}</label><br />
          <label class="priceX">₹${item.price}</label>
          <label class="cutprX">₹${item.price + 1000}</label><br />
          <label class="typeX">${item.type}</label>
          <label class="discountX">${item.discount}% Off</label><br />
          <label class="ratingX">Rating : ${item.rating} ⭐</label><br />
          <button data-id=${item._id} class="EditProductX">Edit</button>
          <button data-id=${item._id} class="DeleteProductX">Delete</button>
        </div>
      </div>
    
    `;
    })
    .join("");
  Editscontainer.innerHTML = data;
  let AllEditors = document.getElementsByClassName("EditProductX");
  let AllDeletors = document.getElementsByClassName("DeleteProductX");
  for (const editt of AllEditors) {
    editt.addEventListener("click", (e) => {
      console.log("Edit", e.target.dataset.id);
    });
  }
  for (const deletet of AllDeletors) {
    deletet.addEventListener("click", (e) => {
      console.log("Delete", e.target.dataset.id);
    });
  }

  spinner.style.display = "none";
}

let productsearch = document.getElementById("productsearch");
let EditTypeSelector = document.getElementById("EditTypeSelector");
let regexx = productsearch.value;
let typee = EditTypeSelector.value || "FURNITURE";
productsearch.addEventListener("input", () => {
  spinner.style.display = "block";
  let regexx = productsearch.value;
  let typee = EditTypeSelector.value || "HOME DECOR";
  FetchQueryProducts(typee, regexx);
});
EditTypeSelector.addEventListener("change", () => {
  spinner.style.display = "block";
  let typee = EditTypeSelector.value || "FURNITURE";
  FetchQueryProducts(typee);
});
async function FetchQueryProducts(query, title = "", sort = 1, discount = 0) {
  try {
    let res = await fetch(
      `${baseURL}/products/query?type=${query}&search=${title}&sort=${sort}&discount=${discount}`
    );
    let data = await res.json();
    RenderEditProducts(data.Products);
  } catch (error) {
    console.log(error);
  }
}
