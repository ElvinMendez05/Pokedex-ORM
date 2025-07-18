

// import PokemonModel from '../model/pokemonesModel.js';
// import RegionModel from '../model/regionesModel.js';

// export function GetHome(req, res, next) {
//   const nombreFiltro = req.query.nombre?.toLowerCase() || "";
//   const regionesSeleccionadas = req.query.regiones || []; // puede ser string o array

//   // Aseguramos que regionesSeleccionadas siempre sea array
//   const regionesFiltro = Array.isArray(regionesSeleccionadas)
//     ? regionesSeleccionadas
//     : [regionesSeleccionadas];

//   PokemonModel.GetAll((pokemones) => {
//     RegionModel.GetAll((regiones) => {
//       let pokemonesFiltrados = pokemones;

//       // Filtro por nombre
//       if (nombreFiltro) {
//         pokemonesFiltrados = pokemonesFiltrados.filter(p =>
//           p.nombre.toLowerCase().includes(nombreFiltro)
//         );
//       }

//       // Filtro por regiones seleccionadas
//       if (regionesFiltro.length > 0 && regionesFiltro[0] !== "") {
//         pokemonesFiltrados = pokemonesFiltrados.filter(p =>
//           regionesFiltro.includes(p.region)
//         );
//       }

//       res.render("home/home", {
//         "page-title": "Inicio Pokémon",
//         pokemonList: pokemonesFiltrados,
//         hasPokemon: pokemonesFiltrados.length > 0,
//         regiones: regiones,
//         regionesSeleccionadas: regionesFiltro,
//         nombreBuscado: req.query.nombre || ""
//       });
//     });
//   });
// }

import PokemonModel from '../model/pokemonesModel.js';
import RegionModel from '../model/regionesModel.js';
import TipoModel from '../model/tiposModel.js';

export async function GetHome(req, res, next) {
  const nombreFiltro = req.query.nombre?.toLowerCase() || "";
  const regionesSeleccionadas = req.query.regiones || [];

  // Asegura que sea siempre un array
  const regionesFiltro = Array.isArray(regionesSeleccionadas)
    ? regionesSeleccionadas
    : [regionesSeleccionadas];

  try {
    const pokemonesResult = await PokemonModel.findAll();
    const regionesResult = await RegionModel.findAll();

    // Mapear para extraer dataValues
    const pokemones = pokemonesResult.map(p => p.dataValues);
    const regiones = regionesResult.map(r => r.dataValues);

    console.log("Pokemones fetched successfully:", pokemones);
    console.log("Regiones fetched successfully:", regiones);

    // Filtro por nombre
    let pokemonesFiltrados = pokemones.filter(p =>
      p.nombre.toLowerCase().includes(nombreFiltro)
    );

    // Filtro por regiones
    if (regionesFiltro.length > 0 && regionesFiltro[0] !== "") {
      pokemonesFiltrados = pokemonesFiltrados.filter(p =>
        regionesFiltro.includes(p.region)
      );
    }

    res.render("home/home", {
      "page-title": "Inicio Pokémon",
      pokemonList: pokemonesFiltrados,
      hasPokemon: pokemonesFiltrados.length > 0,
      regiones,
      regionesSeleccionadas: regionesFiltro,
      nombreFiltro
    });

  } catch (err) {
    console.error("Error en GetHome:", err);
    res.status(500).send("Error interno del servidor");
  }
}
