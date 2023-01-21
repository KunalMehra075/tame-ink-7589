let AllImages = document.querySelectorAll("section img");
for (const image of AllImages) {
  image.addEventListener("click", () => {
    window.location.href = "AllProducts.html";
  });
}
