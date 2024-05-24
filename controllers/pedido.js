const ServiceResponse = require("../entities/ServiceResponse");
const pedidoService = require("../services/pedido");

const e = require("express");
const { response } = require("express");


const pedidoController = {

    create: async (cantidad,subtotal,id_platillo,id_factura) => {
        const responseCreate = await pedidoService.guardarpedido(
            cantidad,
            subtotal,
            id_platillo,
            id_factura
        );

        return responseCreate;
},

    listPorUsuario: async (id) => {
    const responseData = await pedidoService.listPorUsuario(id);
    if (!responseData.data) {
      responseData.setErrorResponse("No hay registros de pedidos", 400);
      return responseData;
    }

    return responseData;
  },

  


}


module.exports = pedidoController;