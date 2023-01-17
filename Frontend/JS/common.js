let closetop1 = document.getElementById("close-top1");
let topfirst = document.getElementById("top1");
var navbar = document.getElementById("stickynav");
let popover = document.getElementById("popover");
var sticky = navbar.offsetTop;

window.addEventListener("load", () => {
  setTimeout(() => {
    popover.style.display = "block";
    popover.style.opacity = "1";
  }, 2000);
  setTimeout(() => {
    popover.style.display = "none";
    popover.style.opacity = "0";
  }, 7000);
});
closetop1.addEventListener("click", () => {
  topfirst.style.opacity = "0.0";
  topfirst.style.transform = "translateX(-50px)";

  setTimeout(() => {
    topfirst.style.display = "none";
  }, 300);
});
window.onscroll = function () {
  navbarstick();
  scrollFunction();
};
function topFunction() {
  document.documentElement.scrollTop = 0;
}

function navbarstick() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

//? <!----------------------------------------------- < Megamenu> ----------------------------------------------->

let furmenu = document.getElementById("furmenu");
let decormenu = document.getElementById("decormenu");
let petsmenu = document.getElementById("petsmenu");
let lampsmenu = document.getElementById("lampsmenu");

document.addEventListener("mouseover", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button1]");
  if (ddbtn) {
    furmenu.style.display = "grid";
    furmenu.dataset.visible = "Y";
  }
});
document.addEventListener("click", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button1]");
  if (!ddbtn) {
    furmenu.style.display = "none";
    furmenu.dataset.visible = "X";
  }
});
document.addEventListener("mouseover", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button2]");
  if (!ddbtn) {
    decormenu.style.display = "none";
    decormenu.dataset.visible = "X";
  } else {
    if (decormenu.dataset.visible == "Y") {
      decormenu.style.display = "none";
      decormenu.dataset.visible = "X";
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    } else {
      decormenu.style.display = "grid";
      decormenu.dataset.visible = "Y";
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    }
  }
});
document.addEventListener("mouseover", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button3]");
  if (!ddbtn) {
    petsmenu.style.display = "none";
    petsmenu.dataset.visible = "X";
  } else {
    if (petsmenu.dataset.visible == "Y") {
      petsmenu.style.display = "none";
      petsmenu.dataset.visible = "X";
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    } else {
      petsmenu.style.display = "grid";
      petsmenu.dataset.visible = "Y";
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    }
  }
});
document.addEventListener("mouseover", (e) => {
  const ddbtn = e.target.matches("[data-dropdown-button4]");
  if (!ddbtn) {
    lampsmenu.style.display = "none";
    lampsmenu.dataset.visible = "X";
  } else {
    if (lampsmenu.dataset.visible == "Y") {
      lampsmenu.style.display = "none";
      lampsmenu.dataset.visible = "X";
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    } else {
      lampsmenu.style.display = "grid";
      lampsmenu.dataset.visible = "Y";
      furmenu.style.display = "none";
      furmenu.dataset.visible = "X";
    }
  }
});
let mybutton = document.getElementById("myBtn");
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//? <!----------------------------------------------- < Mega Searchbar> ----------------------------------------------->

var Furnitures = [
  " Sofas",
  "3 Seater Sofas",
  "2 Seater Sofas",
  "1 Seater Sofas",
  "Sofa Sets",
  "LHS Sectionals",
  "RHS Sectionals",
  "Corner Sofas",
  "Chaise Loungers",
  "Sofa Cum Beds",
  "Futons",
  "Recliners",
  "1 Seater",
  "2 Seater",
  "3 Seater",
  "Recliner Sets",
  "Futons",
  "Recliners",
  "1 Seater",
  "2 Seater",
  "3 Seater",
  "Recliner Sets",
  "Sofa Chairs",
  "Wing Chairs",
  "Lounge Chairs",
  "Slipper Chairs",
  "Barrel Chairs",
  "Office Chairs",
  "Ergonomic Chairs",
  "Executive Chairs",
  "Training Chairs",
  "Guest Chairs",
  "Cantilever Chairs",
  "Gaming Chairs",
  "Bean Bags",
  "Chairs",
  "Arm Chairs",
  "Rocking Chairs",
  "Folding Chairs",
  "Iconic Chairs",
  "Cafe Chairs",
  "Seating",
  "Settees",
  "Benches",
  "Ottomans",
  "Pouffes",
  "Recamiers",
  "Foot Stools",
  "Seating Stools",
  "Centre Tables",
  "Coffee Tables",
  "Coffee Table Sets",
  "End Tables",
  "Nest of Tables",
  "C Shaped Tables",
  "TV & Media Units",
  "TV Consoles",
  "TV Shelves",
  "TV Units",
  "Shoe Racks",
  "Shoe Cabinets",
  "Open Shoe Racks",
  "Shoe Rack & Seat",
  "Tilt Out Racks",
  "Dining Sets",
  "4 Seater Sets",
  "6 Seater Sets",
  "8 Seater Sets",
  "2 Seater Sets",
  "Dining Chairs",
  "Dining Tables",
  "Console Tables",
  "Bar Furniture",
  "Bar Cabinets",
  "Bar Trolleys",
  "Bar Stools",
  "Bar Table Sets",
  "Wine Racks",
  "Beds",
  "Queen Size Beds",
  "King Size Beds",
  "Single Beds",
  "Poster Bed",
  "Folding Beds",
  "Bedside Tables",
  "Night Stands",
  "Bedside Chests",
  "Bedside Cabinets",
  "Dressing Tables",
  "Dressers",
  "Dressing Cabinets",
  "Dressing Consoles",
  "Dressing Units",
  "Wardrobes",
  "1 Door",
  "2 Door",
  "3 Door",
  "4 Door",
  "4+ Door",
  "Sliding Door",
  "Cabinetry",
  "Sideboards",
  "Chest of Drawers",
  "Plastic Cabinets",
  "Book Shelves",
  "Book Cases",
  "Kitchen Cabinets",
  "Office Cabinets",
  "Trunks",
  "Study Tables",
  "Writing Tables",
  "Computer Tables",
  "Hutch Desks",
  "Foldable Tables",
  "Wall Mounted",
  "Portable Tables",
  "Office Tables",
  "Outdoor",
  "Swings",
  "Hammocks",
  "Tables",
  "Table & Chair Sets",
  "Seating",
  "Plastic Chairs",
  "Kids & Teens",
  "Cribs",
  "Beds",
  "Bunk Beds",
  "Study",
  "Wardrobes",
  "Book Shelves",
  "Storage",
  "Seating",
  "Bean Bags",
  "Furniture Care",
  "Furniture Care Kit",
  "Sofa Spa",
  "Chair Spa",
  "Hammocks",
  "Tables",
  "Table & Chair Sets",
  "Seating",
  "Plastic Chairs",
  "Kids & Teens",
  "Cribs",
  "Hambeds",
  "Bunk Beds",
  "Study",
  "Wardrobes",
  "Book Shelves",
  "Storage",
  "Seating",
  "Bean Bags",
  "Furniture Care",
  "Furniture Care Kit",
  "Sofa Spa",
  "Chair Spa",
  "Builloks",
  "Tables",
  "Table & Chair Sets",
  "Seating",
  "Plastic Chairs",
  "Kids & Teens",
  "Cribs",
  "Roasters",
  "Bunk Beds",
  "Study",
  "Wardrobes",
  "Book Shelves",
  "Storage",
  "Seating",
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
  var currentFocus;

  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.addEventListener("click", () => {
      window.location.href = "AllProducts.html";
    });

    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;

          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;

      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;

      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
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
autocomplete(document.getElementById("megasearch"), Furnitures);
