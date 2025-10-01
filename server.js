const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "/")));


app.post("/calculate", (req, res) => {
  const { operacion } = req.body;

  try {
    let result;

    
    if (operacion.includes("√")) {
      const num = parseFloat(operacion.replace("√", ""));
      if (num < 0) throw new Error("Raíz inválida");
      result = Math.sqrt(num);
    } else if (operacion.includes("//")) {
      const [a, b] = operacion.split("//").map(Number);
      if (b === 0) throw new Error("División por cero");
      result = Math.floor(a / b);
    } else {
      
      result = eval(operacion);
    }

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
