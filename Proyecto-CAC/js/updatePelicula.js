document.addEventListener('DOMContentLoaded', async () => {
  // Obtengo el form
  const modificarPelicula = document.getElementById('modificarPelicula');

  modificarPelicula.addEventListener('submit', async (event) => {
    event.preventDefault(); //capturo evento

    // levanto los datos
    const formData = new FormData(modificarPelicula);
    const id = formData.get('id');
    const url_imagen = formData.get('url_imagen'); 
    const titulo = formData.get('titulo');
    const sinopsis = formData.get('sinopsis');
    const estreno = formData.get('estreno');
    const genero = formData.get('genero');
    const idioma = formData.get('idioma');
    const duracion = formData.get('duracion');
    const imagenInput = modificarPelicula.querySelector('input[type="file"]');

    if (!imagenInput.files.length) {
      var imagenBase64 = null;
    } else {
      const file = imagenInput.files[0];
      var imagenBase64 = await file2Base64(file);
    }

  //   Preparo los datos
  const data = {
      id,
      url_imagen,
      titulo,
      sinopsis,
      estreno,
      genero,
      idioma,
      duracion,
      imagenBase64
    };

    // Armo el fetch
    const options = {
      //method: 'PUT', no lo soparta el hosting
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://proyecto-movies-cac.000webhostapp.com/crud/updatePelicula.php"
        

        , options);
      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message);
        window.location.href = "../pages/administrador.html";
        
      } else {
        alert(responseData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la película');
    }
  });
});

// Funcion para pasar file a Base64
function file2Base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remuevo el prefijo
      const base64String = reader.result?.toString().split(',')[1];
      resolve(base64String || '');
    };
    reader.onerror = error => reject(error);
  });
}
