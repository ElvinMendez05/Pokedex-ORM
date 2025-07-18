import { Sequelize } from "sequelize";
import {projectRoot} from "../utils/paths.js";
import path from "path";

const connection =  new Sequelize("sqlite:db.sqlite", {
    dialect: "sqlite",
    storage: path.join(projectRoot, "database", "pokedex.sqlite"),
});

export default connection