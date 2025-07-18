import { DataTypes } from "sequelize";
import connection from "../utils/DbConnection.js";

const Tipos = connection.define("Tipo", {
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
  tableName: "tipos",
});

export default Tipos;