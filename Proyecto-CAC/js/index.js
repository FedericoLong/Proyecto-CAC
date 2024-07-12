//nuestra api local - fijense de alojarlo igual en htdocs -
const API_URL =
  "https://proyecto-movies-cac.000webhostapp.com/crud/getPeliculas.php";

// Pedimos películas desde API PHP
async function getPeliculas() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayMovies(data); // Llama a la función para mostrar las películas en el DOM
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  }
}

// Funcion para mostrar las card de pelis
function displayMovies(movies) {
  const moviesContainer = document.getElementById("peliculas-container");
  console.log(movies);

  movies.forEach((movie) => {
    const movieItem = document.createElement("article");
    movieItem.classList.add("card");

    // const title = document.createElement("h2");
    // title.innerText = movie.titulo;
    // movieItem.appendChild(title);

    const movieDetailLink = document.createElement("a");
    movieDetailLink.classList.add("text-decoration-none", "text-dark");
    movieDetailLink.href = `pages/detalle.html?id=${movie.id}`;

    const movieImg = document.createElement("img");
    movieImg.src = movie.img;
    movieImg.alt = movie.titulo;
    movieImg.classList.add("card-img-top");

    movieDetailLink.appendChild(movieImg);
    movieItem.appendChild(movieDetailLink);

    moviesContainer.appendChild(movieItem);
  });

  let datosLocales = localStorage.getItem("user");
}
//Invocola función para obtener y mostrar las películas
getPeliculas();
