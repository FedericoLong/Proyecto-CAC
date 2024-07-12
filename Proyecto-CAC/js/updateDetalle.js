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
 
  document.getElementById('id').value =`${movie.id}`;
  document.getElementById('url_imagen').value =`${movie.img}`;
  document.getElementById('titulo').value =`${movie.titulo}`;
  document.getElementById('sinopsis').value =`${movie.sinopsis}`;
  document.getElementById('estreno').value =`${movie.estreno}`;
  document.getElementById('genero').value =`${movie.genero}`;
  document.getElementById('idioma').value =`${movie.idioma}`;
  document.getElementById('duracion').value =`${movie.duracion}`;
  document.getElementById('thumbnail').src =`${movie.img}`;
  document.getElementById('nombre').innerText =`${movie.titulo}`;
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
