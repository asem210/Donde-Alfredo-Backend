const facturaService = require("../services/factura");
const ServiceResponse = require("../entities/ServiceResponse");

const e = require("express");
const { response } = require("express");

const facturaController = {
  create: async (total, fecha, id_usuario) => {
    const responseCreate = await facturaService.guardarFactura(
      total,
      fecha,
      id_usuario
    );

    return responseCreate;
  },
};

module.exports = facturaController;
