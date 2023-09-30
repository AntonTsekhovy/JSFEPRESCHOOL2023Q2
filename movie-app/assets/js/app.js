const urltop =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const urlsearch =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const key = "f9a4307b-439c-49a9-b2e2-b3a69733c67b";

const main = document.querySelector(".main");
const form = document.querySelector(".header__form");
const search = document.querySelector(".header__search");
const movies = document.querySelector(".movies");
const clean = document.querySelector(".header__clean");

async function getData(url) {
  const res = await fetch(url, {
    headers: {
      method: "GET",
      "Content-Type": "aplication/json",
      "x-api-key": key,
    },
  });
  const data = await res.json();
  showData(data);
}
getData(urltop);

function showData(data) {
  movies.innerHTML = "";
  data.films.forEach((movie) => {
    const item = document.createElement("div");
    item.classList.add("movies__item");
    item.innerHTML = `
           <div class="movies__cover">
            <img
             src="${movie.posterUrlPreview}" 
             alt="${movie.nameRu}"
             class="movies__img" />
          </div>
          <div class="movies__info">
            <div class="movies__title">${movie.nameRu}</div>
            <div class="movies__year">${movie.year}</div>
            <div class="movies__genres">${movie.genres.map(
              (e) => ` ${e.genre}`
            )} </div>
              <div class="movies__countries">${movie.countries.map(
                (e) => ` ${e.country}`
              )}</div>
          </div>
        `;
    movies.appendChild(item);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let apiUrl = `${urlsearch}${search.value}&page=1`;
  if (search.value) {
    getData(apiUrl);
  }
});

clean.addEventListener("click", () => {
  search.value = "";
});
