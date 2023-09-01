const burger = document.querySelector(".header__burger");
const list = document.querySelector(".header__list");

const toggleMenu = () => {
  burger.classList.toggle("header__burger--active");
  list.classList.toggle("header__list--active");
};
const closeMenu = () => {
  burger.classList.remove("header__burger--active");
  list.classList.remove("header__list--active");
};
document.addEventListener("click", (e) => {
  const click = e.composedPath().includes(burger);
  if (click) {
    toggleMenu();
  } else {
    closeMenu();
  }
});

/////////////////slider////////////////
const sliderLine = document.querySelector(".about__slider-inner");
const sldierImages = document.querySelectorAll(".about__item");
const sliderBtnPrev = document.querySelector(".about__arrow-left");
const sliderBtnNext = document.querySelector(".about__arrow-right");
const sliderDots = document.querySelectorAll(".about__point-span");

let sliderCount = 0;
let sliderWidth;

sliderBtnPrev.addEventListener("click", prevSlide);
sliderBtnNext.addEventListener("click", nextSlide);

function showSlide() {
  sliderWidth = document.querySelector(".about__item").offsetWidth;
  sliderLine.style.width = sliderWidth * sldierImages.length + "px";
  sldierImages.forEach((item) => (item.style.width = sliderWidth + "px"));
  rollSlider();
}
showSlide();

function nextSlide() {
  sliderCount++;
  if (sliderCount >= sldierImages.length) sliderCount = sldierImages.length - 1;
  rollSlider();
  thisSlider(sliderCount);
  arrowInactive();
}

function prevSlide() {
  sliderCount--;
  if (sliderCount < 0) sliderCount = 0;
  rollSlider();
  thisSlider(sliderCount);
  arrowInactive();
}

function arrowInactive() {
  if (!sliderCount) {
    sliderBtnPrev.style.fill = "#8e8e8e";
    sliderBtnPrev.style.cursor = "auto";
  } else {
    sliderBtnPrev.style.fill = "#0c0c0e";
    sliderBtnPrev.style.cursor = "pointer";
  }
  if (sliderCount === sldierImages.length - 1) {
    sliderBtnNext.style.fill = "#8e8e8e";
    sliderBtnNext.style.cursor = "auto";
  } else {
    sliderBtnNext.style.fill = "#0c0c0e";
    sliderBtnNext.style.cursor = "pointer";
  }
}
function rollSlider() {
  sliderLine.style.transform = `translateX(${
    -sliderCount * (sliderWidth + 25)
  }px)`;
}

function thisSlider(index) {
  sliderDots.forEach((item) => {
    item.classList.remove("about__point-active");
  });
  sliderDots[index].classList.add("about__point-active");
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    sliderCount = index;
    rollSlider();
    thisSlider(sliderCount);
  });
});

/////////////////slider////////////////
