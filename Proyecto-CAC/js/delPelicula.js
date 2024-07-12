function eliminarPelicula(idPelicula) {

  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la película`);

  console.log(idPelicula);
  if (confirmacion) {
    fetch('https://proyecto-movies-cac.000webhostapp.com/crud/delPelicula.php', {
      //method: 'DELETE', No lo soparta el hosting
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idPelicula
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert(data.message || data.error);
        window.location.reload();
      })
      
      .catch(error => console.error(error));
  } else {
    alert('La película no se eliminó.');
  }


}



