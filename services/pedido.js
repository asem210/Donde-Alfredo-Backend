const { client } = require("../db/index");

const ServiceResponse = require("../entities/ServiceResponse");


const pedidoService = {
    
    guardarpedido: async (
        cantidad,
        subtotal,
        id_platillo,
        id_factura
      ) => {
        let serviceResponseRegister = new ServiceResponse();
        try {
          const { rows } = await client.query(
            'INSERT INTO "pedido" (cantidad,subtotal,id_platillo,id_factura) VALUES ($1,$2,$3,$4) RETURNING * ',
            [cantidad,subtotal,id_platillo,id_factura]
          );
          serviceResponseRegister.setSucessResponse(
            "Pedido registrado exitosamente",
            rows[0]
          );
        } catch (error) {
          serviceResponseRegister.setErrorResponse("Error en la conexión", 500);
        } finally {
          return serviceResponseRegister;
        }
      },


      listPorUsuario: async (id) => {
        let serviceResponseList = new ServiceResponse();
        try {
          const { rows } = await client.query("SELECT p2.nombre, p2.precio ,p.cantidad , p.subtotal ,f.fecha FROM pedido as p , platillo p2, factura f   WHERE id_factura  in (select id from factura where id_usuario ="+id+" ) and p.id_platillo =p2.id and p.id_factura =f.id ");
          serviceResponseList.setSucessResponse("Pedidos encontradas", rows);
          console.log(rows);
        } catch (error) {
          serviceResponseList.setErrorResponse(error.message, 500);
        } finally {
          return serviceResponseList;
        }
      },


    

}

module.exports = pedidoService;