document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const response = await fetch(
        "https://proyecto-movies-cac.000webhostapp.com/login.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Guardar datos del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data));

        alert("Login exitoso");

        // Redirigir o mostrar contenido según el rol
        if (data.rol === "admin") {
          window.location.href = "../index.html"; // Redirigir a la página de administración
        } else {
          window.location.href = "../index.html"; // Redirigir a la página de usuario
        }
      } else {
        const errorData = await response.json();
        console.error("Error en la solicitud:", errorData.mensaje);
        alert(`Error: ${errorData.mensaje}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al iniciar sesión. Inténtalo nuevamente.");
    }

    form.reset();
  });
});
