let AllImages = document.querySelectorAll("section img");
for (const image of AllImages) {
  image.addEventListener("click", () => {
    spinner.style.display = "block"; //!Spinner
    spinner.style.display = "none"; //!Spinner
    window.location.href = "AllProducts.html";
  });
}
