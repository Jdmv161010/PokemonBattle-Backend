const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/api/battle", require("./routes/battle"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo puerto 3001");
});
