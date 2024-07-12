document.addEventListener("DOMContentLoaded", () => {
  const formPelicula = document.getElementById("form-pelicula");
  const mensaje = document.getElementById("mensaje");

  formPelicula.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formPelicula);

    try {
      const response = await fetch(
        //api local
        "https://proyecto-movies-cac.000webhostapp.com/crud/insertPelicula.php",
        
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar la película.");
      }

      const data = await response.text();
      mensaje.textContent = data; // Muestra mensaje provisorio de creacion

      // Limpia el formulario después de una inserción exitosa
      formPelicula.reset();
    } catch (error) {
      console.error("Error:", error);
      mensaje.textContent =
        "Error al agregar la película. Por favor, intenta nuevamente.";
    }
  });
});
