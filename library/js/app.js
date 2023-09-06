const burger = document.querySelector(".header__burger");
const list = document.querySelector(".header__list");
const dropMenu = document.querySelector(".header__dropmenu");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const buy = document.querySelector(".buy");
const profile = document.querySelector(".profile");

/////////////////burgerMenu////////////////
const toggleMenu = () => {
  burger.classList.toggle("header__burger--active");
  list.classList.toggle("header__list--active");
};
const closeMenu = () => {
  burger.classList.remove("header__burger--active");
  list.classList.remove("header__list--active");
};
/////////////////burgerMenu////////////////

const show = (element) => {
  element.classList.add("active");
};
const hide = (element) => {
  element.classList.remove("active");
};

const activeScrollLock = () => {
  document.querySelector("body").classList.add("scroll-lock");
};
const removeScrollLock = () => {
  document.querySelector("body").classList.remove("scroll-lock");
};

document.addEventListener("click", (event) => {
  const currentElement = event.target;

  if (currentElement.closest(".header__burger")) {
    toggleMenu();
  } else {
    closeMenu();
  }
  if (currentElement.closest(".header__profil")) {
    show(dropMenu);
  } else {
    hide(dropMenu);
  }
  if (currentElement.closest(".reference-login")) {
    show(login);
    activeScrollLock();
  }
  if (
    currentElement == login ||
    currentElement.closest(".close") ||
    currentElement.closest(".reference-register")
  ) {
    hide(login);
    removeScrollLock();
    event.preventDefault();
  }
  if (currentElement.closest(".reference-register")) {
    show(register);
    activeScrollLock();
  }
  if (
    currentElement == register ||
    currentElement.closest(".close") ||
    currentElement.closest(".reference-login")
  ) {
    hide(register);
    removeScrollLock();
    event.preventDefault();
  }
  if (
    currentElement.closest(".favorites__button") &&
    !currentElement.closest(".own")
  ) {
    show(login);
    activeScrollLock();
  }
  if (currentElement == buy || currentElement.closest(".close")) {
    hide(login);
    removeScrollLock();
  }
  if (currentElement.closest(".reference-profile")) {
    show(profile);
    activeScrollLock();
  }
  if (currentElement == profile || currentElement.closest(".close")) {
    hide(profile);
    removeScrollLock();
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
