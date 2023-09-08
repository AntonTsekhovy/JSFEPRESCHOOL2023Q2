const burger = document.querySelector(".header__burger");
const list = document.querySelector(".header__list");
const dropMenu = document.querySelector(".header__dropmenu");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const buy = document.querySelector(".buy");
const profile = document.querySelector(".profile");
const books = document.querySelectorAll(".favorites__item");

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
  /////////////////sortSeason////////////////
  if (currentElement.closest(".favorites__radio")) {
    let season = currentElement.getAttribute("value");

    switch (season) {
      case "winter":
        showSeason(season);
        break;
      case "spring":
        showSeason(season);
        break;
      case "summer":
        showSeason(season);
        break;
      case "autumn":
        showSeason(season);
        break;
    }
  }
  function showSeason(season) {
    books.forEach((book) => {
      if (book.classList.contains(season)) {
        book.style.display = "block";
      } else book.style.display = "none";
    });
  }
  /////////////////sortSeason////////////////
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
    arrowInactive();
  });
});
/////////////////slider////////////////
console.log(`
 - Карусель реагирует на нажатие кнопок (кнопки под каруселью и стрелочки слева и справа в мобильной версии) и происходит анимация перелистывания. +15 
 - На экране шириной 1440px проверяем, чтобы было доступно 2 других скрытых картинки. При каждом нажатии выезжает следующая, и так до границ справа и слева. +2 
 - Выделенная кнопка под каруселью (имеется ввиду кнопка соответствующая активному слайду и которая имеет коричневый цвет) - неактивная. +2 
 - Если анимация карусели не успела завершиться, при этом нажата была следующая кнопка, то картинка не должна зависнуть в промежуточном состоянии. +2 
 - На экране шириной 768px проверяем, чтобы было доступно 4 других скрытых картинки. Для этого меняем разрешение и перезагружаем страницу. Теперь доступных перемещений становится 5. +2 
 - Неактивными становятся не только выделенные кнопки, но и стрелочки на границах карусели. +2

 - "Слайдер" реагирует на нажатие кнопок панели навигации и происходит анимация затухания и проявления. +15
 - На любой ширине экрана все 4 карточки с книгами одновременно будут плавно затухать, а затем плавно проявляться следующие. +2
 - Анимация может быть прервана следующим нажатием на кнопку выбора поры года, но при этом анимация не должна застывать в промежуточном состоянии. Должна отрабатывать до конца. +2
 - Во время анимаций высота блока Favorites не должна меняться. +2

 - В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2

 - Нажатие на иконку пользователя в хедере открывает меню, которое должно оказаться под иконкой таким образом, что правый верхний угол меню находится в той же точке, что и нижний правый угол контейнера с иконкой в хедере. Меню под иконкой. +2
 - На разрешении 768px, при открытом бургер-меню, оно закрывается и открывается меню авторизации. +2
 - То же верно и в обратную сторону, кнопка бургер-меню должна быть доступна при открытом меню авторизации. +2
 - Нажатие на любую область или элемент вне меню приводят к закрытию меню авторизации. +2

 - Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности).
 - При нажатии на кнопку Register в открытом меню авторизации появляется модальное окно REGISTER, где есть поля First name, Last name, E-mail и Password. +2
 - При нажатии кнопки Sign Up в блоке Digital Library Cards также появляется модальное окно REGISTER. +2
 - Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2
 - При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2
 - В данном случае, ограничения по полям - все поля должны быть не пустыми. +2
 - В поле E-mail должна быть валидация типа email. +2

 - Дизайн модального окна соответствует макету. +15 (позже появятся пункты оценки по каждому элементу в отдельности).
 - При нажатии на кнопку Log In появляется модальное окно LOGIN, где есть поля E-mail or readers card и Password. +2
 - При нажатии кнопки Log In в блоке Digital Library - Cards также появляется модальное окно LOGIN. +2
 - Окно центрировано, а область вокруг затемнена (насколько затемнена - не имеет значения). +2
 - При нажатии на крестик в углу окна, или на затемненную область вне этого окна, оно закрывается. +2
 - Для авторизации все поля должны быть не пустыми. +2

 - Если пользователь еще не вошел в учетную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2

 общая 110 / 200 

`);
