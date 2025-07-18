import context from "../context/appContext.js"

export function GetIndex (req, res, next) {
    context.PokemonesModel.findAll()
      .then((result) => {
        const pokemones = result.map((result) => result.dataValues);
        console.log("Pokemones fetched successfully: ", result);

        res.render("pokemones/index", {
             pokemonList: pokemones,
             hasPokemon: pokemones.length > 0,
             "page-title": "Index Pokemones list"});
      })
      .catch((err) => {
        console.log("Error fetching pokemones", err);
      })
};

export function GetCreate (req, res, next) {
    res.render("pokemones/save", {editMode: false ,"page-title": "New Index Pokemones list"});
};

export function PostCreate (req, res, next) {
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const region = req.body.region;
    const tipoPrimario = req.body.tipoPrimario;

    context.PokemonesModel.create({
        nombre: nombre,
        imagen: imagen,
        region: region,
        tipoPrimario: tipoPrimario,
   })
    .then(() => {
         res.redirect("/pokemones/index");
      })
      .catch((err) => {
        console.log("Error fetching pokemones", err);
      })
   
};

export function GetEdit (req, res, next) {
    const id = req.params.pokemonesId;

    context.PokemonesModel.findOne({where: {id: id}})
    .then((result) => {
        if (!result) {
            return res.redirect("pokemones/index");
        }

        const pokemonList = result.dataValues;

         res.render("pokemones/save", {
            editMode: true,
            pokemonList: pokemonList,
            "page-title": `Edit Index Series ${pokemonList.name}`});
    })
    .catch((err) => {
        console.log("Error fetching pokemones", err);
    })
   
};

export function PostEdit (req, res, next) {
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const region = req.body.region;
    const tipoPrimario = req.body.tipoPrimario;
    const id = req.body.pokemonesId;
    
    context.PokemonesModel.findOne({where: {id: id}})
    .then((result) => {
        if (!result) {
            return res.redirect("pokemones/index");
        }

        context.PokemonesModel.update(
            {nombre: nombre, imagen, region, tipoPrimario},
            {where: {id: id}}
        ) 
         .then(()=> {
            return res.redirect("/pokemones/index")
         })
         .catch((err) => {
            console.log("Error actualizando los pokemones:", err);
         })
    })
    .catch((err) => {
        console.log("Error fetching pokemones", err);
    })
};

export function Delete (req, res, next) {
    const id = req.body.pokemonesId;
    
    context.PokemonesModel.findOne({where: {id: id}})
    .then((result) => {
        if (!result) {
            return res.redirect("pokemones/index");
        }
        
        context.PokemonesModel.destroy(
            {where: {id: id}}
        ) 
         .then(()=> {
            return res.redirect("/pokemones/index")
         })
         .catch((err) => {
            console.log("Error eliminando los pokemones:", err);
         })
    })
    .catch((err) => {
        console.log("Error fetching pokemones", err);
    })
};

