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

// Smooth scroll to section on navigation click
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href");
    document.querySelector(sectionId).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// Wait for the page to fully load
window.addEventListener('load', function() {
  // Get the loader element
  var loader = document.getElementById('loader');
  
  // Hide the loader
  loader.style.display = 'none';
});
