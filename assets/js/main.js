"use strict";

function setStickyHeader(scroll) {
  const header = document.getElementById("header");
  if (scroll > 10) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function setNavItemActive(scroll) {
  const viewportMiddle = window.innerHeight / 2;

  navLinks.forEach(function (elem) {
    const section = document.querySelector(elem.hash);
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionInViewport =
      viewportMiddle + scroll >= sectionTop &&
      scroll < sectionBottom - viewportMiddle;

    if (sectionInViewport) {
      elem.parentElement.classList.add("active");
    } else {
      elem.parentElement.classList.remove("active");
    }
  });
}

new WOW().init();

const navLinks = [
  ...document.querySelectorAll("nav .navbar-nav .nav-item a"),
  ...document.querySelectorAll("[data-scroll-to]"),
];
const navCollapse = document.querySelector(".navbar-collapse");
const headerHeight = document.getElementById("header").offsetHeight;
navLinks.forEach(function (elem) {
  const section = document.querySelector(elem.hash);
  elem.addEventListener("click", function (event) {
    event.preventDefault();
    navCollapse.classList.remove("show");
    const sectionTop = section.offsetTop;
    window.scrollTo({
      top: sectionTop - headerHeight,
      behavior: "smooth",
    });
  });
});

window.addEventListener("scroll", function (e) {
  const scrollY = window.scrollY;
  setStickyHeader(scrollY);
  setNavItemActive(scrollY);
});

const gallery = document.getElementById("gallery");
fsLightbox.props.type = "image";

imagesLoaded(gallery, function () {
  const isotope = new Isotope(".grid", { transitionDuration: "1s" });
  const portfolioOptions = document.querySelectorAll(".portfolio-menu ul li");
  const defaultOption = portfolioOptions[0].dataset.filter;
  isotope.arrange({
    filter: defaultOption,
  });
  portfolioOptions.forEach(function (option) {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const filterValue = option.dataset.filter;
      isotope.arrange({
        filter: filterValue,
      });
      const siblings = option.parentNode.querySelectorAll(".active");
      siblings.forEach(function (item) {
        item.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});
