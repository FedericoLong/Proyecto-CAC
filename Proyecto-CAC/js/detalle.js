const API_URL =
  "https://proyecto-movies-cac.000webhostapp.com/crud/getPelicula.php";

//tomo la url del id de pelicula
const getMovieIdFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};
//pido esa pelicula especifica
const getMovieById = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}?id=${movieId}`);
    const movieData = await response.json();
    console.log(movieData, "MOVIE DATA");
    return movieData;
  } catch (error) {
    console.error("Error al obtener los detalles de la película:", error);
  }
};

//creo la funcion que va a renderizar la info en el DOM
const renderMovieDetails = (movie) => {
  const movieDetails = document.getElementById("detalle-pelicula");

  // creo el article de toda la card
  const article = document.createElement("article");
  article.classList.add("card-detail");

  // creo contenedor de imagen
  const figure = document.createElement("figure");
  const imgMovie = document.createElement("img");
  imgMovie.src = `${movie.img}`;
  imgMovie.alt = `${movie.titulo} poster`;
  figure.appendChild(imgMovie);

  //agrego figure a article
  article.appendChild(figure);

  //creo contenedor de detalles
  const bodyCard = document.createElement("div");
  bodyCard.classList.add("text-detail");
  const title = document.createElement("h1");
  title.classList.add("mb-4");
  title.textContent = `${movie.titulo}`;
  bodyCard.appendChild(title);

  // Overview con su p de descripcion
  const overview = document.createElement("h2");
  overview.textContent = "Overview";
  bodyCard.appendChild(overview);

  const description = document.createElement("p");
  description.classList.add("mb-4");
  description.textContent = `${movie.sinopsis}`;
  bodyCard.appendChild(description);

  // Div necesario para organizar con flex los 4 detalles
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("d-flex", "gap-5");

  //div1 de Estreno y genero
  const details1 = document.createElement("div");
  details1.classList.add("d-flex", "flex-column", "justify-content-around");

  const h3Release = document.createElement("h3");
  h3Release.textContent = `Estreno`;
  details1.appendChild(h3Release);

  const release = document.createElement("p");

  //La api me da fecha numerica en formato ingles, asi que la adapto
  const format = movie.estreno.split("-");
  const month = new Date("2024", parseInt(format[1]) - 1, 1).toLocaleString(
    "es",
    { month: "long" }
  );

  release.textContent = `${format[2]} de ${month} del ${format[0]}`;
  details1.appendChild(release);

  const h3Genres = document.createElement("h3");
  h3Genres.textContent = "Genero";
  details1.appendChild(h3Genres);

  const genres = document.createElement("p");
  genres.textContent = movie.genero;
  details1.appendChild(genres);

  //Agrego el detalle 1 al contenedor de detalles
  detailsContainer.appendChild(details1);

  // div2 de Duracion e Idiomas
  const details2 = document.createElement("div");
  details2.classList.add("d-flex", "flex-column", "justify-content-around");
  const h3Duration = document.createElement("h3");
  h3Duration.textContent = "Duración";
  details2.append(h3Duration);

  const duration = document.createElement("p");
  duration.textContent = `${movie.duracion} minutos`;
  details2.appendChild(duration);

  const h3Languages = document.createElement("h3");
  h3Languages.textContent = "Idiomas";
  details2.appendChild(h3Languages);

  const lang = document.createElement("p");
  lang.textContent = movie.idioma;
  details2.appendChild(lang);

  //Agrego el detalle 2 al contenedor de detalles
  detailsContainer.appendChild(details2);

  //Agrego el contenedor de detalles al body de la card
  bodyCard.appendChild(detailsContainer);

  //Agrego al article el body de la card
  article.appendChild(bodyCard);

  //Agrego el article al contenedor html seleccionado
  movieDetails.appendChild(article);
};

//Agrego el evento que va a ejecutar las funciones
document.addEventListener("DOMContentLoaded", async () => {
  const movieId = getMovieIdFromURL();
  if (movieId) {
    const movieData = await getMovieById(movieId);
    if (movieData) {
      renderMovieDetails(movieData);
    }
  } else {
    console.error("No se encontro la pelicula");
  }
});
