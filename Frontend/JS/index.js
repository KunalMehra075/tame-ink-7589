// ----------------------------------------------------------Sliders --------------------------------------
// slider buttons--------:----
const nxtbtn = document.querySelector("#nxt-but");
const prebtn = document.querySelector("#pre-but");
// -------------------------------------------slider1 -------------------------------------------//
prebtn.addEventListener("click", () => {
  document
    .querySelector("#Slider")
    .setAttribute("class", "compslidtranslatePRE");
});
nxtbtn.addEventListener("click", () => {
  document
    .querySelector("#Slider")
    .setAttribute("class", "compslidtranslateNXT");
});
let AllProductButtons = document.querySelectorAll(
  ".main-mega-menu p,.main-mega-menu a,#ThreeCardParent > div > img, #FourCardParent > div > img, #SixCardParent > div > img"
);
AllProductButtons.forEach((item) => {
  item.addEventListener("click", () => {
    window.location.href = "AllProducts.html";
  });
});

//? <!----------------------------------------------- < AutoComplete Search bar> ----------------------------------------------->
var countries = [
  "chair",
  "table",
  "sofa",
  "bed",
  "dresser",
  "bookshelf",
  "desk",
  "couch",
  "ottoman",
  "cabinet",
  "armchair",
  "nightstand",
  "wardrobe",
  "coffee table",
  "rocking chair",
  "recliner",
  "loveseat",
  "futon",
  "bunk bed",
  "area rug",
  "lamp",
  "artwork",
  "throw pillow",
  "candle",
  "vase",
  "picture frame",
  "mirror",
  "clocks",
  "plants",
  "curtains",
  "blinds",
  "carpet",
  "throw blanket",
  "cushions",
  "wall decor",
  "wallpaper",
  "furniture covers",
  "pet bed",
  "pet toys",
  "pet food",
  "pet grooming supplies",
  "pet collar",
  "pet leash",
  "pet carrier",
  "dog kennel",
  "cat tree",
  "bird cage",
  "fish tank",
  "turtle tank",
  "pet grooming table",
  "pet shampoo",
  "pet treats",
  "pet first aid kit",
  "floor lamp",
  "table lamp",
  "desk lamp",
  "chandelier",
  "pendant light",
  "ceiling light",
  "wall sconce",
  "outdoor lighting",
  "landscape lighting",
  "LED lights",
  "smart lights",
  "light bulbs",
  "light fixtures",
  "dimmable lights",
  "clothes hangers",
  "clothes rack",
  "clothes steamer",
  "laundry hamper",
  "laundry basket",
  "laundry detergent",
  "ironing board",
  "clothes iron",
  "sewing machine",
  "mannequin",
  "dress form",
  "sewing supplies",
  "fabric",
  "patterns",
  "thread",
  "zipper",
  "buttons",
  "beads",
  "needles",
  "scissors",
  "paint brushes",
  "paint rollers",
  "paint tray",
  "paint samples",
  "paint cans",
  "wall paint",
  "ceiling paint",
  "trim paint",
  "primer",
  "stain",
  "varnish",
  "polyurethane",
  "paint thinner",
  "paint remover",
  "paint brushes",
  "paint rollers",
  "paint tray",
  "paint samples",
  "paint cans",
  "wall paint",
  "ceiling paint",
  "trim paint",
  "primer",
  "stain",
  "varnish",
  "polyurethane",
  "paint thinner",
  "paint remover",
  "handbag",
  "purse",
  "wallet",
  "watch",
  "jewelry",
  "necklace",
  "bracelet",
  "earrings",
  "ring",
  "body jewelry",
  "hair accessories",
  "sunglasses",
  "eyeglasses",
  "hat",
  "scarf",
  "gloves",
  "socks",
  "tights",
  "shoes",
  "boots",
  "sandals",
  "flip flops",
  "slippers",
  "dress shoes",
  "sneakers",
  "loafers",
  "clogs",
  "belts",
  "ties",
  "bow ties",
  "suspenders",
  "cufflinks",
  "pocket square",
  "lapel pin",
  "hair tie",
  "hair clip",
  "hairpin",
  "hair band",
];
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.addEventListener("click", () => {
      window.location.href = "index.html";
    });
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
autocomplete(document.getElementById("myInput"), countries);
