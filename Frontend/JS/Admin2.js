let baseURL = "http://localhost:4500";
let Initiator = JSON.parse(sessionStorage.getItem("current-user"));
let Editscontainer = document.getElementById("ThreeCardContainerX");
let EditSecitonBlock = document.getElementById("EditSecitonBlock");
if (!Initiator || Initiator.role !== "Admin") {
  spinner.style.display = "block"; //!Spinner
  swal("Admin's ID not found", "Please Login Again", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

let AddProductForm = document.getElementById("addproductform");
AddProductForm.addEventListener("submit", (e) => {
  spinner.style.display = "none"; //!Spinner
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
  spinner.style.display = "block"; //!Spinner
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
    spinner.style.display = "none"; //!Spinner
    swal("Added Product", "Product Added Successfully!", "success");
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    swal("Something Went Wrong", "", "warning");
    console.log(error);
  }
}

AllEditProducts();
Editscontainer.style.display = "grid";
async function AllEditProducts() {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/products/`);
    let data = await res.json();
    RenderEditProducts(data.Products);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
function RenderEditProducts(data) {
  Editscontainer.style.display = "grid";
  EditSecitonBlock.style.display = "none";
  spinner.style.display = "block"; //!Spinner

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
        <div class="ItemDetails">
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
      spinner.style.display = "block"; //!Spinner
      FetchOneEditorProduct(e.target.dataset.id);
    });
  }
  for (const deletet of AllDeletors) {
    deletet.addEventListener("click", (e) => {
      spinner.style.display = "block"; //!Spinner
      swal({
        title: "Are you sure?",
        text: "Once deleted, This product will be removed Forever!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          DeleteProduct(e.target.dataset.id);
        } else {
          swal("Item is still in the Database.", "", "info");
          spinner.style.display = "none"; //!Spinner
        }
      });
    });
  }

  spinner.style.display = "none"; //!Spinner
}

async function DeleteProduct(ProductID) {
  try {
    let res = await fetch(`${baseURL}/products/delete/${ProductID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
    });
    let data = await res.json();
    if (data.deleted) {
      console.log(data);
      swal("Deleted Product Successfully", "Database is Updated", "success");
      AllEditProducts();
      spinner.style.display = "none"; //!Spinner
    } else {
      swal("Something Went Wrong", "", "error");
      spinner.style.display = "none"; //!Spinner
    }
  } catch (error) {
    swal("Something Went Wrong", "", "error");
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
async function EditProduct(ProductID, payload) {
  try {
    let res = await fetch(`${baseURL}/products/update/${ProductID}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });
    let data = await res.json();
    if (data.updated) {
      console.log(data);
      swal("Updated Product Successfully", "Database is Updated", "success");
      AllEditProducts();
      spinner.style.display = "none"; //!Spinner
    } else {
      swal("Something Went Wrong", "", "error");
      spinner.style.display = "none"; //!Spinner
    }
  } catch (error) {
    swal("Something Went Wrong", "", "error");
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}

//? <!----------------------------------------------- < Editing Filters> ----------------------------------------------->

let productsearch = document.getElementById("productsearch");
let EditTypeSelector = document.getElementById("EditTypeSelector");
let regexx = productsearch.value;
let typee = EditTypeSelector.value || "FURNITURE";
productsearch.addEventListener("input", () => {
  spinner.style.display = "block"; //!Spinner
  let regexx = productsearch.value;
  let typee = EditTypeSelector.value || "HOME DECOR";
  FetchQueryProducts(typee, regexx);
});
EditTypeSelector.addEventListener("change", () => {
  spinner.style.display = "block"; //!Spinner
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
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}

//? <!----------------------------------------------- < Editing One Single Product> ----------------------------------------------->

// ? -------------------------------------------<Edit a Product>-----------------------------------------------------------
let EditId = null;
async function FetchOneEditorProduct(id) {
  EditId = id;
  try {
    let res = await fetch(`${baseURL}/products?_id=${id}`);
    let data = await res.json();
    EditProductBlockDisplay(data.Products[0]);
  } catch (error) {
    console.log(error);
  }
}
function EditProductBlockDisplay(obj) {
  spinner.style.display = "block"; //!Spinner
  let Editscontainer = document.getElementById("ThreeCardContainerX");
  let EditSecitonBlock = document.getElementById("EditSecitonBlock");
  Editscontainer.style.display = "none";
  EditSecitonBlock.style.display = "block";
  let Content = `
  <div id="Editortopdiv" >
  <div  id="editorimage"> <img width="100%" style="object-fit: cover;" src="${obj.thumbnail}"> </div>
  <div class="details">
  <center>    <h4 class="AdminHeads"><u>Editing This Product</u></h4></center>
    <div>
      <h5>${obj.title}</h5>
      <label id="editordescp"><b>Description :</b> ${obj.description}</label><br>
            <label><b>Brand :</b> ${obj.brand}</label><br>
            <label><b>Type :</b> ${obj.type}</label><br>
            <label><b>Rating :</b> ${obj.rating}</label><br>
           <label><b>Discoutn :</b> ${obj.discount}/-</label><br>
     </div>
      </div>
  </div>
  <div class="edit-product-card">
  <div class="changers">
        <form id="changeDataForm">

                   <div id="TitleNDesc">
                   <label>Change Product Title<br>
                    <textarea id="changetitle" type="text"  rows="4" cols="28" placeholder="Enter
                      Product Title" required>${obj.title}</textarea>
                    </label>

                    <label>Change Product Description<br>
                    <textarea id="changedescription" type="text" rows="4" cols="28"
                    placeholder="Enter Product Description" required>${obj.description}</textarea>
                    </label>
  
                   </div>
                  
                   <div>
                   <label>Change Product Type<br>
                   <input id="changetype" type="text" data-id=${obj._id} value=${obj.type}
                    placeholder="Enter Product Type" required />
                   </label>

                   <label>Change Product Price<br>
                   <input id="changeprice" type="number" data-id=${obj._id} value=${obj.price}
                    placeholder="Enter Product Price" required />
                   </label>
 
                   <label>Change Product Discount<br>
                   <input id="changediscount" value=${obj.discount} type="number"
                    placeholder="Enter Product Discount Percentage" required />
                   </label>
 
                   <label>Change Product Rating<br>
                   <input id="changerating" type="number" value=${obj.rating} min="0" step="0.1"
                   placeholder="Enter Product Rating" required />
                   </label>

                   <label>Change Product Brand<br>
                   <input id="changebrand" type="text" value=${obj.brand}
                   placeholder="Enter Product Brand" required/>
                   </label>
       
                   <label>Change Product Thumbnail<br>
                   <input id="changethumbnail" type="text" value=${obj.thumbnail}
                   placeholder="Enter ThumbnailURL" required />
                   </label>
 
                   <label>Change Product Image 1<br>
                   <input id="changeimage1" type="text" value=${obj.images[0]}
                   placeholder="Enter ImageUrl" required />
                   </label>
 
                   <label>Change Product Image 2<br>
                 <input id="changeimage2" type="text" value=${obj.images[1]}
                 placeholder="Enter ImageUrl" required />
                 </label>
 


                   </div>

                  <div class="EditNSubmit">
                  <button id="cancelbutton">Cancel</button>
                  <input type="submit" data-one=${obj._id} class="cardbutton"
                  id="viewproduct" value="Save Changes">
             
                  </div>

                </form>
    </div>
  
      </div>
  
  `;

  EditSecitonBlock.innerHTML = Content;
  let SaveProduct = document.getElementById("changeDataForm");
  let CancelEdite = document.getElementById("cancelbutton");
  CancelEdite.addEventListener("click", (e) => {
    e.preventDefault();
    AllEditProducts();
    return;
  });
  SaveProduct.addEventListener("submit", (e) => {
    spinner.style.display = "block"; //!Spinner
    e.preventDefault();
    let Payload = {
      title: SaveProduct.changetitle.value,
      description: SaveProduct.changedescription.value,
      price: SaveProduct.changeprice.value,
      discount: SaveProduct.changediscount.value,
      type: SaveProduct.changetype.value,
      rating: SaveProduct.changerating.value,
      brand: SaveProduct.changebrand.value,
      thumbnail: SaveProduct.changethumbnail.value,
      images: [SaveProduct.changeimage1.value, SaveProduct.changeimage2.value],
    };
    ChangeProductDetail(EditId, Payload);
  });
  spinner.style.display = "none"; //!Spinner
}
async function ChangeProductDetail(id, payload) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(`${baseURL}/products/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    });
    let data = await res.json();
    if (data.updated) {
      console.log(data);
      swal("Updated Product Successfully", "Database is Updated", "success");
      setTimeout(() => {
        spinner.style.display = "block"; //!Spinner
        AllEditProducts();
      }, 1000);
      spinner.style.display = "none"; //!Spinner
    } else {
      swal("Something Went Wrong", "", "error");
      spinner.style.display = "none"; //!Spinner
    }
  } catch (error) {
    swal("Something Went Wrong", "", "error");
    spinner.style.display = "none"; //!Spinner
    console.log(error);
  }
}
