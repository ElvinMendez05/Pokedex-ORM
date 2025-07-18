import context from "../context/appContext.js";

export function GetIndex(req, res, next) {
  context.RegionesModel.findAll()
    .then((result) => {
      const regiones = result.map((r) => r.dataValues);
      console.log("Regiones fetched successfully: ", regiones);

      res.render("regiones/index", {
        regionList: regiones,
        hasRegion: regiones.length > 0,
        "page-title": "Index Regiones list"
      });
    })
    .catch((err) => {
      console.error("Error fetching regiones", err);
    });
}

export function GetCreate(req, res, next) {
  res.render("regiones/save", {
    editMode: false,
    "page-title": "New Index Regiones list"
  });
}

export function PostCreate(req, res, next) {
  const nombre = req.body.nombre;

  context.RegionesModel.create({ nombre })
    .then(() => {
      res.redirect("/regiones/index");
    })
    .catch((err) => {
      console.error("Error creando región", err);
    });
}

export function GetEdit(req, res, next) {
  const id = req.params.regionesId;

  context.RegionesModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regiones/index");
      }

      const regionList = result.dataValues;

      res.render("regiones/save", {
        editMode: true,
        regionList: regionList,
        "page-title": `Edit Index Regiones ${regionList.nombre}`
      });
    })
    .catch((err) => {
      console.error("Error fetching región", err);
    });
}

export function PostEdit(req, res, next) {
  const nombre = req.body.nombre;
  const id = req.body.regionesId;

  context.RegionesModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regiones/index");
      }

      return context.RegionesModel.update(
        { nombre },
        { where: { id: id } }
      );
    })
    .then(() => {
      res.redirect("/regiones/index");
    })
    .catch((err) => {
      console.error("Error actualizando región", err);
    });
}

export function Delete(req, res, next) {
  const id = req.body.regionesId;

  context.RegionesModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regiones/index");
      }

      return context.RegionesModel.destroy({ where: { id: id } });
    })
    .then(() => {
      res.redirect("/regiones/index");
    })
    .catch((err) => {
      console.error("Error eliminando región", err);
    });
}
