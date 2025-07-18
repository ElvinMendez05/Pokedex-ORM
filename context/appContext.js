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
 
export default {
  sequelize: connection,
  RegionesModel,
  TiposModel,
  PokemonesModel,
};
