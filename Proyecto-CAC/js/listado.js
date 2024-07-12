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
  console.log(movies); 

  const container = document.getElementById("listado_container");



  const rowEncabezado = document.createElement('div');
  rowEncabezado.classList.add('row', 'd-flex', 'align-items-center');
  rowEncabezado.innerHTML = '<div class="col-4">Películas</div><div class="col-2">Género</div><div class="col-2">Idioma</div><div class="col-2">Duración</div><div class="col-1">Modificar</div><div class="col-1">Eliminar</div>';

  container.appendChild(rowEncabezado);


  movies.forEach((movie) => {
    const row = document.createElement('div');
    row.classList.add('row', 'd-flex', 'align-items-center');
  
    const col1 = document.createElement('div');
    col1.classList.add('col-4'); 
  
    const titulo = document.createElement('strong');
    titulo.innerText = `${movie.titulo}`; 
    col1.appendChild(titulo);
  
    const col2 = document.createElement('div');
    col2.classList.add('col-2'); 
  
    const genero = document.createElement('span');
    genero.innerText = `${movie.genero}`; 
    col2.appendChild(genero);

    const col3 = document.createElement('div');
    col3.classList.add('col-2'); 
  
    const idioma = document.createElement('span');
    idioma.innerText = `${movie.idioma}`; 
    col3.appendChild(idioma);

    const col4 = document.createElement('div');
    col4.classList.add('col-2'); 
  
    const duracion = document.createElement('span');
    duracion.innerText = `${movie.duracion}`; 
    col4.appendChild(duracion);


    const col5 = document.createElement('div');
    col5.classList.add('col-1');
  
    const botonM = document.createElement('button');
    botonM.type = 'button';
    botonM.classList.add('btn', 'btn-primary', 'my-2');
    botonM.textContent = 'M';
    botonM.onclick = () => irAlDetalle(movie.id);
    col5.appendChild(botonM);
    
    const col6 = document.createElement('div');
    col6.classList.add('col-1');

    const botonE = document.createElement('button');
    botonE.type = 'button';
    botonE.classList.add('btn', 'btn-primary', 'my-2');
    botonE.textContent = 'E';
    botonE.onclick = () => eliminarPelicula(movie.id);
    col6.appendChild(botonE);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    container.appendChild(row);
  });
}

function irAlDetalle(id) {
  window.location.href = `../pages/update-pelicula.html?id=${id}`;
}

function agregarPelicula() {
  window.location.href = `../pages/form-pelicula.html`;
}

//Invocola función para obtener y mostrar las películas
getPeliculas();
