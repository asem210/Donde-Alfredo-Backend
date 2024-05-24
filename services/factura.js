const { client } = require("../db/index");

const ServiceResponse = require("../entities/ServiceResponse");

const facturaService = {
  guardarFactura: async (total, fecha, id_usuario) => {
    let serviceResponseRegister = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'INSERT INTO "factura" (total,fecha,id_usuario) VALUES ($1,$2,$3) RETURNING * ',
        [total, fecha, id_usuario]
      );
      serviceResponseRegister.setSucessResponse(
        "Factura registrado exitosamente",
        rows[0]
      );
    } catch (error) {
      serviceResponseRegister.setErrorResponse("Error en la conexión", 500);
    } finally {
      return serviceResponseRegister;
    }
  },
};

module.exports = facturaService;
