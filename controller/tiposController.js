import context from "../context/appContext.js";

export function GetIndex(req, res, next) {
  context.TiposModel.findAll()
    .then((result) => {
      const tiposList = result.map((tipo) => tipo.dataValues);
      console.log("Tipos fetched successfully: ", tiposList);

      res.render("tipos/index", {
        tiposList: tiposList,
        hasTipos: tiposList.length > 0,
        "page-title": "Index Tipos list"
      });
    })
    .catch((err) => {
      console.log("Error fetching tipos", err);
    });
}

export function GetCreate(req, res, next) {
  res.render("tipos/save", {
    editMode: false,
    "page-title": "New Index Tipos list"
  });
}

export function PostCreate(req, res, next) {
  const nombre = req.body.nombre;

  context.TiposModel.create({ nombre })
    .then(() => {
      res.redirect("/tipos/index");
    })
    .catch((err) => {
      console.log("Error creando tipo", err);
    });
}

export function GetEdit(req, res, next) {
  const id = req.params.tiposId;

  context.TiposModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/tipos/index");
      }

      const tipo = result.dataValues;

      res.render("tipos/save", {
        editMode: true,
        tiposList: tipo,
        "page-title": `Edit Index Tipos ${tipo.nombre}`
      });
    })
    .catch((err) => {
      console.log("Error buscando tipo", err);
    });
}

export function PostEdit(req, res, next) {
  const id = req.body.tiposId;
  const nombre = req.body.nombre;

  context.TiposModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/tipos/index");
      }

      return context.TiposModel.update({ nombre }, { where: { id: id } });
    })
    .then(() => {
      res.redirect("/tipos/index");
    })
    .catch((err) => {
      console.log("Error actualizando tipo", err);
    });
}

export function Delete(req, res, next) {
  const id = req.body.tiposId;

  context.TiposModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/tipos/index");
      }

      return context.TiposModel.destroy({ where: { id: id } });
    })
    .then(() => {
      res.redirect("/tipos/index");
    })
    .catch((err) => {
      console.log("Error eliminando tipo", err);
    });
}

// import context from "../context/appContext.js";

// export function GetIndex(req, res, next) {
//   context.TiposModel.findAll()
//     .then((result) => {
//       const tiposList = result.map((tipo) => tipo.dataValues);

//       res.render("tipos/index", {
//         tiposList: tiposList,
//         hasTipos: tiposList.length > 0,
//         "page-title": "Index Tipos list"
//       });
//     })
//     .catch((err) => {
//       console.log("Error fetching tipos", err);
//     });
// }

// export function GetCreate(req, res, next) {
//   res.render("tipos/save", {
//     editMode: false,
//     "page-title": "New Index Tipos list"
//   });
// }

// export function PostCreate(req, res, next) {
//   const nombre = req.body.nombre;

//   context.TiposModel.create({ nombre: nombre })
//     .then(() => {
//       res.redirect("/tipos/index");
//     })
//     .catch((err) => {
//       console.log("Error creando tipo", err);
//     });
// }

// export function GetEdit(req, res, next) {
//   const id = req.params.tiposId;

//   context.TiposModel.findOne({ where: { id: id } })
//     .then((result) => {
//       if (!result) {
//         return res.redirect("/tipos/index");
//       }

//       const tiposList = result.dataValues;

//       res.render("tipos/save", {
//         editMode: true,
//         tiposList: tiposList,
//         "page-title": `Edit Index Tipos ${tiposList.nombre}`
//       });
//     })
//     .catch((err) => {
//       console.log("Error buscando tipo", err);
//     });
// }

// export function PostEdit(req, res, next) {
//   const id = req.body.tiposId;
//   const nombre = req.body.nombre;

//   context.TiposModel.findOne({ where: { id: id } })
//     .then((result) => {
//       if (!result) {
//         return res.redirect("/tipos/index");
//       }

//       return context.TiposModel.update({ nombre }, { where: { id: id } });
//     })
//     .then(() => {
//       res.redirect("/tipos/index");
//     })
//     .catch((err) => {
//       console.log("Error actualizando tipo", err);
//     });
// }

// export function Delete(req, res, next) {
//   const id = req.body.tiposId;

//   context.TiposModel.findOne({ where: { id: id } })
//     .then((result) => {
//       if (!result) {
//         return res.redirect("/tipos/index");
//       }

//       return context.TiposModel.destroy({ where: { id: id } });
//     })
//     .then(() => {
//       res.redirect("/tipos/index");
//     })
//     .catch((err) => {
//       console.log("Error eliminando tipo", err);
//     });
// }
