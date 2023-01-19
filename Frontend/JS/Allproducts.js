let htl = document.getElementById("HTL");
let lth = document.getElementById("LTH");
let Container = document.getElementById("ThreeCardContainerX");
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
    let res = await fetch(`${baseURL}/products`);
    let data = await res.json();
    RenderData(data.Products);
  } catch (error) {
    console.log(error);
  }
}
let query = "";
fetchproducts();

function RenderData(products) {
  Container.innerHTML = "";
  products = products.map((item) => {
    return `
    <div class="ChildBoxes">
        <div class="childimage">
          <img src="Images/Home/fest3.jpg" alt="" />
        </div>
        <div class="details">
          <label class="titleX"
            >Monster Ultimate (T) Gaming Chair in Black & Grey Colour</label
          ><br />
          <label class="brandX">Green Soul</label><br />
          <label class="priceX">₹ 19,690</label>
          <label class="cutprX">₹ 1350</label><br />
          <label class="typeX">Home Decor</label>
          <label class="discountX">44% Off</label><br />
          <label class="ratingX">Rating : 9.2 ⭐</label><br />
          <button class="addtocartX">Add To cart</button>
          <img class="heart" data-like="notlike" src="./Images/icons/blakheart.png" alt="">
        </div>
        </div>
    `;
  });
}
