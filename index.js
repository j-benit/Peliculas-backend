const express = require("express");
const{getConnection} = require("./db/db-conecction-mongo.js");
const cors = require("cors");

const app = express();
 const port = 4000;

 app.use(cors());

 getConnection();

 // Parseo JSON
 app.use(express.json());
 

 app.use("/genero", require("./routes/genero"));
 app.use("/director",require("./routes/director"));
 app.use("/productora",require("./routes/productora"));
 app.use("/media", require("./routes/media"));
 app.use("/tipo", require("./routes/tipo"));


 app.listen(port, () => {
    console.log(`la app esta disposible en el puerto ${port}`);

 });