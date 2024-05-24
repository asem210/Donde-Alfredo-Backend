const { client } = require("../db/index");
const ServiceResponse = require("../entities/ServiceResponse");

const categoryService = {
  list: async () => {
    let serviceResponseList = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT * FROM "category"');
      serviceResponseList.setSucessResponse("Categorias encontradas", rows);
      console.log(rows);
    } catch (error) {
      serviceResponseList.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseList;
    }
  },

  count: async () => {
    let serviceResponseCount = new ServiceResponse();
    try {
      const { rows } = await client.query("SELECT count(id) FROM category");
      serviceResponseCount.setSucessResponse("Counted rows ", rows[0]);
    } catch (error) {
      serviceResponseCount.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseCount;
    }
  },

  create: async (name, description, url) => {
    let serviceResponseCreate = new ServiceResponse();
    try {
      const { rows } = await client.query(
        "INSERT INTO category (name,description,image_url) values ($1,$2,$3) RETURNING *",
        [name, description, url]
      );
      serviceResponseCreate.setSucessResponse(
        "Categoría creada exitosamente",
        rows[0]
      );
    } catch (error) {
      serviceResponseCreate.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseCreate;
    }
  },

  edit: async (name, description, url, id) => {
    let ServiceResponseEdit = new ServiceResponse();
    try {
      const { rows } = await client.query(
        "UPDATE category SET name=$1, description=$2, image_url=$3, id=$4 WHERE id =$4",
        [name, description, url, id]
      );
      ServiceResponseEdit.setSucessResponse(
        "Categoría editada con éxito",
        true
      );
    } catch (error) {
      ServiceResponseEdit.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseEdit;
    }
  },

  delete: async (id) => {
    let ServiceResponseDelete = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'DELETE FROM "category" WHERE id=$1 RETURNING *',
        [id]
      );
      ServiceResponseDelete.setSucessResponse(
        "Categoría eliminada con éxito",
        true
      );
    } catch (error) {
      ServiceResponseDelete.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseDelete;
    }
  },

  obtenerIdPorNombre: async (name) => {
    let serviceResponseUser = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'SELECT id FROM "category" WHERE name=$1',
        [name]
      );
      serviceResponseUser.setSucessResponse("Categoria encontrada", rows[0]);
    } catch (error) {
      serviceResponseUser.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseUser;
    }
  },

  obtenerNombrePorId: async (id) => {
    let ServiceResponseGetName = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'SELECT name FROM "category" WHERE id=$1 ',
        [id]
      );
      ServiceResponseGetName.setSucessResponse("Categoría encontrada", rows[0]);
    } catch (error) {
      ServiceResponseGetName.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseGetName;
    }
  },

  listPorCantidad: async (num) => {
    let ServiceResponseGetName = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'SELECT * FROM "category"  FETCH FIRST $1 ROWS ONLY',
        [num]
      );
      ServiceResponseGetName.setSucessResponse(
        "Categoría" + num + "encontrada",
        rows
      );
    } catch (error) {
      ServiceResponseGetName.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseGetName;
    }
  },
};

module.exports = categoryService;
