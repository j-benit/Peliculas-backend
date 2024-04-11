const mongoose = require("mongoose");

const getConnection = async () => {
    try {
        const url = "mongodb://user_db:VvPy7FVmCuoQG7lA@ac-sr4shhh-shard-00-00.ifleoda.mongodb.net:27017,ac-sr4shhh-shard-00-01.ifleoda.mongodb.net:27017,ac-sr4shhh-shard-00-02.ifleoda.mongodb.net:27017/peliculas-app?ssl=true&replicaSet=atlas-cf4ixd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster";
        await mongoose.connect(url);
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.log("Error al conectar a la base de datos:", error.message);
    }
}

module.exports = {
    getConnection,
}
//  VvPy7FVmCuoQG7lA  / user_db