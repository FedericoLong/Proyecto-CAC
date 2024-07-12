document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://proyecto-movies-cac.000webhostapp.com/registro.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        alert("Usuario registrado");
        window.location.href = "../index.html";
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    form.reset();
  });
});
