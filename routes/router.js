const express = require("express");
const verifyToken = require("../controllers/auth/verifyToken.js");
const {
  createClaveDeInscripcion,
  getClavesDeInscripcion,
  getDetailClaveDeInscripcion,
  modifyClaveDeInscripcion,
  deleteClaveDeInscripcion,
} = require("../controllers/ClaveDeInscripcion.js");
const {
  createDestino,
  getDestinos,
  getDetailDestino,
  modifyDestino,
  deleteDestino,
} = require("../controllers/Destinos.js");
const {
  createDiaDelEjercicio,
  getDiasDelEjercicio,
  getDetailDiaDelEjercicio,
  modifyDiaDelEjercicio,
  deleteDiaDelEjercicio,
} = require("../controllers/DiaDelEjercicio.js");
const {
  createEntePublicoObligado,
  getEntePublicoObligado,
  getDetailEntePublicoObligado,
  modifyEntePublicoObligado,
  deleteEntePublicoObligado,
} = require("../controllers/EntesPublicosObligados.js");
const {
  createEstatus,
  getDetailEstatus,
  modifyEstatus,
  deleteEstatus,
  getEstatus,
} = require("../controllers/Estatus.js");
const {
  deleteFuenteAlternaDePago,
  createFuenteAlternaDePago,
  getFuenteAlternaDePago,
  getDetailFuenteAlternaDePago,
  modifyFuenteAlternaDePago,
} = require("../controllers/FuenteAlternaDePago.js");
const {
  createFuenteDePago,
  getFuenteDePago,
  getDetailFuenteDePago,
  modifyFuenteDePago,
  deleteFuenteDePago,
} = require("../controllers/FuenteDePago.js");
const router = express.Router();
const {
  createInstitucionFinanciera,
  modifyInstitucionFinanciera,
  deleteInstitucionFinanciera,
  getInstitucionesFinancieras,
  getDetailInstitucionFinanciera,
} = require("../controllers/InstitucionesFinancieras.js");
const {
  createObligadoSolidarioAval,
  getObligadoSolidarioAval,
  getDetailObligadoSolidarioAval,
  modifyObligadoSolidarioAval,
  deleteObligadoSolidarioAval,
} = require("../controllers/ObligadoSolidarioAval.js");
const {
  createPeriodicidadDePago,
  getPeriodicidadDePago,
  getDetailPeriodicidadDePago,
  modifyPeriodicidadDePago,
  deletePeriodicidadDePago,
} = require("../controllers/PeriodicidadDelPago.js");
const {
  createReglaDeFinanciamiento,
  getReglasDeFinanciamiento,
  getDetailReglaDeFinanciamiento,
  modifyReglaDeFinanciamiento,
  deleteReglaDeFinanciamiento,
} = require("../controllers/ReglaDeFinanciamiento.js");
const {
  createRol,
  getRoles,
  getDetailRol,
  modifyRol,
  deleteRol,
} = require("../controllers/Roles.js");
const {
  createTasaDeReferencia,
  getTasasDeReferencia,
  getDetailTasaDeReferencia,
  modifyTasaDeReferencia,
  deleteTasaDeReferencia,
} = require("../controllers/TasaDeReferencia.js");
const {
  createTipoDeComision,
  getTiposDeComision,
  getDetailTipoDeComision,
  modifyTipoDeComision,
  deleteTipoDeComision,
} = require("../controllers/TipoDeComision.js");
const {
  createTipoEntePublico,
  modifyTipoEntePublico,
  deleteTipoEntePublico,
  getTiposEntePublico,
  getDetailTipoEntePublico,
} = require("../controllers/TipoEntePublico.js");
const {
  createSolicitud,
  getSolicitudes,
  modifySolicitud,
  deleteSolicitud,
  createComentario,
  getComentarios,
} = require("../controllers/Solicitudes.js");
const {
  createTipoDeDocumento,
  getListadoTipoDeDocumentoCortoPlazo,
  getListadoTipoDeDocumentoLargoPlazo,
  getListadoTipoDeDocumento,
  deleteTipoDeDocumento,
  modifyTipoDocumento,
} = require("../controllers/TipoDeDocumentos.js");
const {
  getDetailUsuario,
  getUsuarios,
  createUsuario,
  getUsuariosAsignables,
} = require("../controllers/Usuarios.js");
const {
  createNotificacion,
  getNotificaciones,
  leerNotificacion,
  getInfoNotificacion,
  getNotificacionesCreadas,
} = require("../controllers/Notificaciones.js");
const {
  addPathDocSol,
  getDetailPathDocSol,
  addPathDocAut,
  getDetailPathDocAut,
} = require("../controllers/PathDocSol.js");
const {
  getAutorizaciones,
  getDetailAutorizacion,
  modifyAutorizacion,
  deleteAutorizacion,
  createAutorizacion,
} = require("../controllers/Autorizaciones.js");
const {
  deleteFideicomiso,
  modifyFideicomiso,
  getDetailFideicomiso,
  getFideicomisos,
  createFideicomiso,
} = require("../controllers/Fideicomisos.js");
const {
  createTipoDeFideicomiso,
  getTiposDeFideicomiso,
} = require("../controllers/TiposDeFideicomiso.js");
const {
  createFiudiciario,
  getFiudiciarios,
} = require("../controllers/Fiudiciarios.js");
const {
  createFideicomisario,
  getFideicomisarios,
} = require("../controllers/Fideicomisarios.js");
const {
  createOrdenFideicomisario,
  getOrdenesFideicomisario,
} = require("../controllers/OrdenesFideicomisario.js");
const {
  createTipoDeFideicomitente,
  getTiposDeFideicomitente,
} = require("../controllers/TiposDeFideicomitente.js");
const {
  createTipoDeFuente,
  getTiposDeFuente,
  deleteTipoDeFuente,
  modifyTipoDeFuente,
} = require("../controllers/TiposDeFuente.js");
const {
  createFondoOIngreso,
  getFondosOIngresos,
} = require("../controllers/FondosOIngresos.js");
const {
  createMedioDePublicacion,
  getMediosDePublicacion,
} = require("../controllers/MedioDePublicacion.js");
const {
  createDestinoAutorizado,
  getDestinosAutorizados,
} = require("../controllers/DestinosAutorizados.js");
const {
  getDetalleDestinosAutorizados,
  createDetalleDestinoAutorizado,
} = require("../controllers/DetalleDestinosAutorizados.js");
const {
  createDetalleInversion,
  getDetallesInversion,
  getDetailDetalleInversion,
  modifyDetalleInversion,
  deleteDetalleInversion,
} = require("../controllers/DetalleDeLaInversion.js");
const {
  createMandatario,
  getDetailMandatario,
  modifyMandatario,
  deleteMandatario,
  getMandatarios,
} = require("../controllers/Mandatarios.js");

//#region Instituciones Financieras
router.post(
  "/create-institucionesFinancieras",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createInstitucionFinanciera(req, res);
  }
);

router.get(
  "/get-institucionesFinancieras",
  verifyToken.verifyJWT,
  (req, res) => {
    getInstitucionesFinancieras(req, res);
  }
);

router.get(
  "/detail-institucionesFinancieras",
  verifyToken.verifyJWT,
  (req, res) => {
    getDetailInstitucionFinanciera(req, res);
  }
);

router.put(
  "/modify-institucionesFinancieras",
  verifyToken.verifyJWT,
  (req, res) => {
    modifyInstitucionFinanciera(req, res);
  }
);

router.delete(
  "/delete-institucionesFinancieras",
  verifyToken.verifyJWT,
  (req, res) => {
    deleteInstitucionFinanciera(req, res);
  }
);
//#endregion

//#region Estatus
router.post("/create-estatus", verifyToken.verifyJWT, (req, res, express) => {
  createEstatus(req, res);
});

router.get("/get-estatus", verifyToken.verifyJWT, (req, res) => {
  getEstatus(req, res);
});

router.get("/detail-estatus", verifyToken.verifyJWT, (req, res) => {
  getDetailEstatus(req, res);
});

router.put("/modify-estatus", verifyToken.verifyJWT, (req, res) => {
  modifyEstatus(req, res);
});

router.delete("/delete-estatus", verifyToken.verifyJWT, (req, res) => {
  deleteEstatus(req, res);
});
//#endregion

//#region EntePublicoObligado
router.post(
  "/create-entePublicoObligado",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createEntePublicoObligado(req, res);
  }
);

router.get("/get-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  getEntePublicoObligado(req, res);
});

router.get("/detail-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  getDetailEntePublicoObligado(req, res);
});

router.put("/modify-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  modifyEntePublicoObligado(req, res);
});

router.delete(
  "/delete-entePublicoObligado",
  verifyToken.verifyJWT,
  (req, res) => {
    deleteEntePublicoObligado(req, res);
  }
);
//#endregion

//#region TipoEntePublico
router.post("/create-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  createTipoEntePublico(req, res);
});

router.get("/get-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  getTiposEntePublico(req, res);
});

router.get("/detail-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  getDetailTipoEntePublico(req, res);
});

router.put("/modify-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  modifyTipoEntePublico(req, res);
});

router.delete("/delete-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  deleteTipoEntePublico(req, res);
});
//#endregion

//#region ObligadoSolidarioAval
router.post(
  "/create-obligadoSolidarioAval",
  verifyToken.verifyJWT,
  (req, res) => {
    createObligadoSolidarioAval(req, res);
  }
);

router.get("/get-obligadoSolidarioAval", verifyToken.verifyJWT, (req, res) => {
  getObligadoSolidarioAval(req, res);
});

router.get(
  "/detail-obligadoSolidarioAval",
  verifyToken.verifyJWT,
  (req, res) => {
    getDetailObligadoSolidarioAval(req, res);
  }
);

router.put(
  "/modify-obligadoSolidarioAval",
  verifyToken.verifyJWT,
  (req, res) => {
    modifyObligadoSolidarioAval(req, res);
  }
);

router.delete(
  "/delete-obligadoSolidarioAval",
  verifyToken.verifyJWT,
  (req, res) => {
    deleteObligadoSolidarioAval(req, res);
  }
);
//#endregion

//#region FuenteDePago
router.post(
  "/create-fuenteDePago",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createFuenteDePago(req, res);
  }
);

router.get("/get-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  getFuenteDePago(req, res);
});

router.get("/detail-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  getDetailFuenteDePago(req, res);
});

router.put("/modify-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  modifyFuenteDePago(req, res);
});

router.delete("/delete-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  deleteFuenteDePago(req, res);
});
//#endregion

//#region FuenteAlternaDePago
router.post(
  "/create-fuenteAlternaDePago",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createFuenteAlternaDePago(req, res);
  }
);

router.get("/get-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  getFuenteAlternaDePago(req, res);
});

router.get("/detail-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  getDetailFuenteAlternaDePago(req, res);
});

router.put("/modify-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  modifyFuenteAlternaDePago(req, res);
});

router.delete(
  "/delete-fuenteAlternaDePago",
  verifyToken.verifyJWT,
  (req, res) => {
    deleteFuenteAlternaDePago(req, res);
  }
);

//Clave de Inscripcion
router.post(
  "/create-claveDeInscripcion",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createClaveDeInscripcion(req, res);
  }
);

router.get("/get-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  getClavesDeInscripcion(req, res);
});

router.get("/detail-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  getDetailClaveDeInscripcion(req, res);
});

router.put("/modify-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  modifyClaveDeInscripcion(req, res);
});

router.delete(
  "/delete-claveDeInscripcion",
  verifyToken.verifyJWT,
  (req, res) => {
    deleteClaveDeInscripcion(req, res);
  }
);

//#endregion

//#region Destinos
router.post("/create-destinos", verifyToken.verifyJWT, (req, res, express) => {
  createDestino(req, res);
});

router.get("/get-destinos", verifyToken.verifyJWT, (req, res) => {
  getDestinos(req, res);
});

router.get("/detail-destinos", verifyToken.verifyJWT, (req, res) => {
  getDetailDestino(req, res);
});

router.put("/modify-destinos", verifyToken.verifyJWT, (req, res) => {
  modifyDestino(req, res);
});

router.delete("/delete-destinos", verifyToken.verifyJWT, (req, res) => {
  deleteDestino(req, res);
});
//#endregion

//#region Roles
router.post("/create-roles", verifyToken.verifyJWT, (req, res, express) => {
  createRol(req, res);
});

router.get("/get-roles", verifyToken.verifyJWT, (req, res) => {
  getRoles(req, res);
});

router.get("/detail-roles", verifyToken.verifyJWT, (req, res) => {
  getDetailRol(req, res);
});

router.put("/modify-roles", verifyToken.verifyJWT, (req, res) => {
  modifyRol(req, res);
});

router.delete("/delete-roles", verifyToken.verifyJWT, (req, res) => {
  deleteRol(req, res);
});
//#endregion

//#region TipoDocumento
router.post("/create-tiposDocumento", verifyToken.verifyJWT, (req, res) => {
  createTipoDeDocumento(req, res);
});

router.get("/get-tiposDocumento", verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumento(req, res);
});

router.get(
  "/get-tiposDocumentosLargoPlazo",
  verifyToken.verifyJWT,
  (req, res) => {
    getListadoTipoDeDocumentoLargoPlazo(req, res);
  }
);

router.get(
  "/get-tiposDocumentosCortoPlazo",
  verifyToken.verifyJWT,
  (req, res) => {
    getListadoTipoDeDocumentoCortoPlazo(req, res);
  }
);

router.put("/modify-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
  modifyTipoDocumento(req, res);
});

router.delete("/delete-tiposDocumento", verifyToken.verifyJWT, (req, res) => {
  deleteTipoDeDocumento(req, res);
});

// //TipoDocumento
// router.post("/create-TiposDocumento",  verifyToken.verifyJWT, (req, res, express) => {
//   createTipoDocumento(req, res);
// });

// router.get("/get-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   getTiposDocumento(req, res);
// });

// router.get("/detail-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   getDetailTipoDocumento(req, res);
// });

// router.put("/modify-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   modifyTipoDocumento(req, res);
// });

// router.delete("/delete-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   deleteTipoDocumento(req, res);
// });
//#endregion

//#region TipoPeriodicidadDePago
router.post(
  "/create-periodicidadDePago",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createPeriodicidadDePago(req, res);
  }
);

router.get("/get-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  getPeriodicidadDePago(req, res);
});

router.get("/detail-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  getDetailPeriodicidadDePago(req, res);
});

router.put("/modify-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  modifyPeriodicidadDePago(req, res);
});

router.delete(
  "/delete-periodicidadDePago",
  verifyToken.verifyJWT,
  (req, res) => {
    deletePeriodicidadDePago(req, res);
  }
);
//#endregion

//#region TasaDeReferencia
router.post(
  "/create-tasaDeReferencia",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createTasaDeReferencia(req, res);
  }
);

router.get("/get-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  getTasasDeReferencia(req, res);
});

router.get("/detail-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  getDetailTasaDeReferencia(req, res);
});

router.put("/modify-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  modifyTasaDeReferencia(req, res);
});

router.delete("/delete-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  deleteTasaDeReferencia(req, res);
});
//#endregion

//#region DiaDelEjercicio
router.post(
  "/create-diasDelEjercicio",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createDiaDelEjercicio(req, res);
  }
);

router.get("/get-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  getDiasDelEjercicio(req, res);
});

router.get("/detail-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  getDetailDiaDelEjercicio(req, res);
});

router.put("/modify-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  modifyDiaDelEjercicio(req, res);
});

router.delete("/delete-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  deleteDiaDelEjercicio(req, res);
});
//#endregion

//#region TipoDeComision
router.post(
  "/create-tipoDeComision",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createTipoDeComision(req, res);
  }
);

router.get("/get-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  getTiposDeComision(req, res);
});

router.get("/detail-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  getDetailTipoDeComision(req, res);
});

router.put("/modify-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  modifyTipoDeComision(req, res);
});

router.delete("/delete-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  deleteTipoDeComision(req, res);
});
//#endregion

//#region ReglaDeFinanciamiento
router.post(
  "/create-reglaDeFinanciamiento",
  verifyToken.verifyJWT,
  (req, res, express) => {
    createReglaDeFinanciamiento(req, res);
  }
);

router.get("/get-reglaDeFinanciamiento", verifyToken.verifyJWT, (req, res) => {
  getReglasDeFinanciamiento(req, res);
});

router.get(
  "/detail-reglaDeFinanciamiento",
  verifyToken.verifyJWT,
  (req, res) => {
    getDetailReglaDeFinanciamiento(req, res);
  }
);

router.put(
  "/modify-reglaDeFinanciamiento",
  verifyToken.verifyJWT,
  (req, res) => {
    modifyReglaDeFinanciamiento(req, res);
  }
);

router.delete(
  "/delete-reglaDeFinanciamiento",
  verifyToken.verifyJWT,
  (req, res) => {
    deleteReglaDeFinanciamiento(req, res);
  }
);
//#endregion

//#region Usuario
router.get("/usuario", verifyToken.verifyJWT, (req, res) => {
  getDetailUsuario(req, res);
});

router.get("/lista-usuarios", verifyToken.verifyJWT, (req, res) => {
  getUsuarios(req, res);
});

router.get("/detail-usuario", verifyToken.verifyJWT, (req, res) => {
  getDetailUsuario(req, res);
});
//#endregion

//#region Solicitudes
router.post("/create-solicitud", verifyToken.verifyJWT, (req, res) => {
  createSolicitud(req, res);
});

router.get("/get-solicitudes", verifyToken.verifyJWT, (req, res) => {
  getSolicitudes(req, res);
});

router.put("/modify-solicitud", verifyToken.verifyJWT, (req, res) => {
  modifySolicitud(req, res);
});
router.delete("/delete-solicitud", verifyToken.verifyJWT, (req, res) => {
  deleteSolicitud(req, res);
});
//#endregion

//#region Comentarios
router.post("/create-comentario", verifyToken.verifyJWT, (req, res) => {
  createComentario(req, res);
});

router.get("/get-comentarios", verifyToken.verifyJWT, (req, res) => {
  getComentarios(req, res);
});

//#endregion

//#region  Usuarios
router.post("/create-usuario", verifyToken.verifyJWT, (req, res) => {
  createUsuario(req, res);
});

router.post("/create-notificacion", verifyToken.verifyJWT, (req, res) => {
  createNotificacion(req, res);
});

router.post("/leer-notificacion", (req, res) => {
  leerNotificacion(req, res);
});

router.get("/get-notificaciones", verifyToken.verifyJWT, (req, res) => {
  getNotificaciones(req, res);
});

router.get("/get-notificaciones-creadas", verifyToken.verifyJWT, (req, res) => {
  getNotificacionesCreadas(req, res);
});

router.get("/get-info-notificacion", verifyToken.verifyJWT, (req, res) => {
  getInfoNotificacion(req, res);
});

router.get("/get-usuarios-asignables", (req, res) => {
  getUsuariosAsignables(req, res);
});
//#endregion

//#region PathDoc
router.post("/create-addPathDocSol", (req, res) => {
  addPathDocSol(req, res);
});

router.get("/get-DetailPathDocSol", (req, res) => {
  getDetailPathDocSol(req, res);
});

router.post("/create-addPathDocAut", (req, res) => {
  addPathDocAut(req, res);
});

router.get("/get-DetailPathDocAut", (req, res) => {
  getDetailPathDocAut(req, res);
});

//#endregion

//#region Autorizacion
router.post("/create-autorizacion", (req, res, express) => {
  createAutorizacion(req, res);
});

router.get("/get-autorizaciones", (req, res) => {
  getAutorizaciones(req, res);
});

router.get("/detail-autorizacion", (req, res) => {
  getDetailAutorizacion(req, res);
});

router.put("/modify-autorizacion", (req, res) => {
  modifyAutorizacion(req, res);
});

router.delete("/delete-autorizacion", (req, res) => {
  deleteAutorizacion(req, res);
});
//#endregion

//#region Fideicomiso
router.post("/create-fideicomiso", (req, res, express) => {
  createFideicomiso(req, res);
});

router.get("/get-fideicomiso", (req, res) => {
  getFideicomisos(req, res);
});

router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
  getDetailFideicomiso(req, res);
});

router.put("/modify-fideicomiso", (req, res) => {
  modifyFideicomiso(req, res);
});

router.delete("/delete-fideicomiso", (req, res) => {
  deleteFideicomiso(req, res);
});
//#endregion

//#region TiposDeFideicomiso
router.post("/create-tipoDeFideicomiso", (req, res, express) => {
  createTipoDeFideicomiso(req, res);
});

router.get("/get-tiposDeFideicomiso", (req, res) => {
  getTiposDeFideicomiso(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Fiudiciarios
router.post("/create-fiudiciario", (req, res, express) => {
  createFiudiciario(req, res);
});

router.get("/get-fiudiciarios", (req, res) => {
  getFiudiciarios(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Fideicomisario
router.post("/create-fideicomisario", (req, res, express) => {
  createFideicomisario(req, res);
});

router.get("/get-fideicomisarios", (req, res) => {
  getFideicomisarios(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Ordenes Fideicomisario
router.post("/create-ordenFideicomisario", (req, res, express) => {
  createOrdenFideicomisario(req, res);
});

router.get("/get-ordenesFideicomisario", (req, res) => {
  getOrdenesFideicomisario(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Tipos De Fideicomitente
router.post("/create-tipoDeFideicomitente", (req, res, express) => {
  createTipoDeFideicomitente(req, res);
});

router.get("/get-tiposDeFideicomitente", (req, res) => {
  getTiposDeFideicomitente(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Tipos De Fuente
router.post("/create-tipoDeFuente", (req, res, express) => {
  createTipoDeFuente(req, res);
});

router.get("/get-tiposDeFuente", (req, res) => {
  getTiposDeFuente(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

router.put("/modify-tipoDeFuente", (req, res) => {
  modifyTipoDeFuente(req, res);
});

router.delete("/delete-tipoDeFuente", (req, res) => {
  deleteTipoDeFuente(req, res);
});
//#endregion

//#region Fondos O Ingresos
router.post("/create-fondoOIngreso", (req, res, express) => {
  createFondoOIngreso(req, res);
});

router.get("/get-fondosOIngresos", (req, res) => {
  getFondosOIngresos(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Medios de Publicacion
router.post("/create-medioDePublicacion", (req, res, express) => {
  createMedioDePublicacion(req, res);
});

router.get("/get-mediosDePublicacion", (req, res) => {
  getMediosDePublicacion(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Destinos Autorizados
router.post("/create-destinoAutorizado", (req, res, express) => {
  createDestinoAutorizado(req, res);
});

router.get("/get-destinosAutorizados", (req, res) => {
  getDestinosAutorizados(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Detalle Destinos Autorizados
router.post("/create-detalleDestinoAutorizado", (req, res, express) => {
  createDetalleDestinoAutorizado(req, res);
});

router.get("/get-detalleDestinosAutorizados", (req, res) => {
  getDetalleDestinosAutorizados(req, res);
});

// router.get("/detail-fideicomiso", verifyToken.verifyJWT, (req, res) => {
//   getDetailFideicomiso(req, res);
// });

// router.put("/modify-fideicomiso", (req, res) => {
//   modifyFideicomiso(req, res);
// });

// router.delete("/delete-fideicomiso", (req, res) => {
//   deleteFideicomiso(req, res);
// });
//#endregion

//#region Detalle Inversion
router.post("/create-detalleInversion", (req, res, express) => {
  createDetalleInversion(req, res);
});

router.get("/get-detalleInversion", (req, res) => {
  getDetallesInversion(req, res);
});

router.get("/detail-detalleInversion", verifyToken.verifyJWT, (req, res) => {
  getDetailDetalleInversion(req, res);
});

router.put("/modify-detalleInversion", (req, res) => {
  modifyDetalleInversion(req, res);
});

router.delete("/delete-detalleInversion", (req, res) => {
  deleteDetalleInversion(req, res);
});
//#endregion

//#region Mandatarios
router.post("/create-mandatario", (req, res, express) => {
  createMandatario(req, res);
});

router.get("/get-mandatario", (req, res) => {
  getMandatarios(req, res);
});

router.get("/detail-mandatario", verifyToken.verifyJWT, (req, res) => {
  getDetailMandatario(req, res);
});

router.put("/modify-mandatario", (req, res) => {
  modifyMandatario(req, res);
});

router.delete("/delete-mandatario", (req, res) => {
  deleteMandatario(req, res);
});
//#endregion

module.exports = router;
