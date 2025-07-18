import { DataTypes } from "sequelize";
import connection from "../utils/DbConnection.js";

const Regiones = connection.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
}, {
  tableName: "regiones",
});

export default Regiones;
