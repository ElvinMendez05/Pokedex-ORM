// import connection from "../utils/DbConnection.js";
// import PokemonesModel from "../model/pokemonesModel.js";
// import RegionesModel from "../model/regionesModel.js";
// import TiposModel from "../model/tiposModel.js";

// connection.authenticate()
//   .then(()=> {
//     console.log("Dtabase connection has been established successfully")
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database", error)
//   })

import connection from "../utils/DbConnection.js";
import PokemonesModel from "../model/pokemonesModel.js";
import RegionesModel from "../model/regionesModel.js";
import TiposModel from "../model/tiposModel.js";

connection.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
  });

// RegionesModel.hasMany(PokemonesModel, {
//   foreignKey: "regionesId",  // Una región tiene muchos pokemones
// });

// PokemonesModel.belongsTo(RegionesModel, {
//   foreignKey: "regionesId",  // Cada pokemon pertenece a una región
// });

// TiposModel.hasMany(PokemonesModel, {
//   foreignKey: "tiposId",     // Un tipo tiene muchos pokemones
// });

// PokemonesModel.belongsTo(TiposModel, {
//   foreignKey: "tiposId",     // Cada pokemon pertenece a un tipo
// });
// Exportamos todos los modelos y la conexión para usar en otras partes de la app
export default {
  sequelize: connection,
  RegionesModel,
  TiposModel,
  PokemonesModel,
};
