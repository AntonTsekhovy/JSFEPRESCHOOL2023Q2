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
  { "Вёрстка соответствует макету. Ширина экрана 768px ": 26 },
  "\n",
  {
    "Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется": 12,
  },
  "\n",
  { "На ширине экрана 768рх реализовано адаптивное меню": 12 },
  "\n"
);
