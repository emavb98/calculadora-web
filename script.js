const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("button");

let operacion = "";

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "C") {
      operacion = "";
      pantalla.value = "";
    } else if (valor === "=") {
      if (!operacion) return;

      
      fetch("http://localhost:3000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operacion })
      })
      .then(res => res.json())
      .then(data => pantalla.value = data.result || data.error)
      .catch(err => pantalla.value = "Error servidor");

      operacion = ""; 
    } else {
      operacion += valor;
      pantalla.value = operacion;
    }
  });
});
