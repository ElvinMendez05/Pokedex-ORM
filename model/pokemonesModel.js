import connection from "../utils/DbConnection.js";
import { DataTypes } from "sequelize";


const Pokemones = connection.define(
    "Pokemones",
    { 
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }, 
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
        imagen: {
         type: DataTypes.STRING,
         allowNull: false
    },
        region: {
        type: DataTypes.STRING,
        allowNull: false
    },
        tipoPrimario: {
        type: DataTypes.STRING,
        allowNull: false
    },
     
    }, 
    {
        tableName: "pokemones", 
});

export default  Pokemones;