let baseURL = "http://localhost:4500";
let Initiator = JSON.parse(sessionStorage.getItem("current-user"));
if (!Initiator || Initiator.role !== "Admin") {
  // "warning","success","error","info"
  swal("Admin's ID not found", "Please Login Again", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

let AddProductForm = document.getElementById("addproductform");
AddProductForm.addEventListener("submit", (e) => {
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
    // "warning","success","error","info"
    swal("Added Product", "Product Added Successfully!", "success");
  } catch (error) {
    swal("Something Went Wrong", "", "warning");
    console.log(error);
  }
}
