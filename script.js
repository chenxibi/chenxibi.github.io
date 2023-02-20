/* JavaScript */
const nav = document.querySelector("header");
const backToTopButton = document.querySelector(".back-to-top");

// Change navigation bar color on scroll
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 60) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

// Show back to top button on scroll
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 400) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
});

// Smooth scroll to top on button click
backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Portfolio item hover effect
const portfolioItems = document.querySelectorAll(".item");
portfolioItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.querySelector("img").style.transform = "scale(1.05)";
  });
  item.addEventListener("mouseout", () => {
    item.querySelector("img").style.transform = "scale(1)";
  });
});
