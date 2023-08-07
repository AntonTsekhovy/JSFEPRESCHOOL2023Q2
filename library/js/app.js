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
console.log(
  { "Вёрстка валидная": 10 },
  "\n",
  { " Вёрстка семантическая": 16 },
  "\n",
  { " Вёрстка соответствует макету": 54 },
  "\n",
  { " Общие требования к верстке ": 20 },
  "\n"
);
