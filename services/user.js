const { client } = require("../db/index");

const ServiceResponse = require("../entities/ServiceResponse");
const userService = {
  count: async () => {
    let serviceResponseCount = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT count(id) FROM "user"');
      serviceResponseCount.setSucessResponse("Counted rows ", rows[0]);
    } catch (error) {
      serviceResponseCount.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseCount;
    }
  },

  list: async () => {
    let serviceResponseList = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT * FROM "user"');
      serviceResponseList.setSucessResponse("Uusuario encontradas", rows);
      console.log(rows);
    } catch (error) {
      serviceResponseList.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseList;
    }
  },

  obtenerUsuario: async (email) => {
    let serviceResponseVerify = new ServiceResponse();

    try {
      const { rows } = await client.query(
        'SELECT * FROM "user"  WHERE email=$1',
        [email]
      );

      serviceResponseVerify.setSucessResponse("Usuario encontrado", rows[0]);
    } catch (error) {
      serviceResponseVerify.setErrorResponse("Error en la conexión", 500);
    } finally {
      return serviceResponseVerify;
    }
  },

  registro: async (
    name,
    lastname,
    gender,
    email,
    dni,
    phone,
    password,
    id_Rol
  ) => {
    let serviceResponseRegister = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'INSERT INTO "user" (name,lastname,gender,email,dni,phone_number,password,id_profile) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ',
        [name, lastname, gender, email, dni, phone, password, id_Rol]
      );
      serviceResponseRegister.setSucessResponse(
        "Usuario registrado exitosamente",
        rows[0]
      );
    } catch (error) {
      serviceResponseRegister.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseRegister;
    }
  },

  obtenerRolPorEmail: async (email) => {
    let serviceResponseRole = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'select profile.code from profile inner join "user" on profile.id="user".id_profile where "user".email=$1',
        [email]
      );
      serviceResponseRole.setSucessResponse("Rol encontrado", rows[0]);
    } catch (error) {
      serviceResponseRole.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseRole;
    }
  },

  obtenerUsuarioPorId: async (idUser) => {
    let serviceResponseUser = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT * FROM "user" WHERE id=$1', [
        idUser,
      ]);
      serviceResponseUser.setSucessResponse("Usuario encontrado", rows[0]);
    } catch (error) {
      serviceResponseUser.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseUser;
    }
  },

  delete: async (id) => {
    let ServiceResponseDelete = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'DELETE FROM "user" WHERE id=$1 RETURNING *',
        [id]
      );
      ServiceResponseDelete.setSucessResponse(
        "usuario eliminado con éxito",
        true
      );
    } catch (error) {
      ServiceResponseDelete.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseDelete;
    }
  },
  obtenerUsuarioPorEmail: async (emailUser) => {
    let serviceResponseUser = new ServiceResponse();
    try {
      const { rows } = await client.query(
        `SELECT * FROM "user" WHERE email='` + emailUser + `'`
      );
      serviceResponseUser.setSucessResponse("Usuario encontrado", rows[0]);
    } catch (error) {
      serviceResponseUser.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseUser;
    }
  },

  edit: async (name, lastname, email, dni, phone, id) => {
    let ServiceResponseEdit = new ServiceResponse();
    try {
      const { rows } = await client.query(
        `UPDATE "user" SET name=$1, lastname=$2, email=$3, dni=$4, phone_number=$5 WHERE id =$6`,
        [name, lastname, email, dni, phone, id]
      );
      ServiceResponseEdit.setSucessResponse("Usuario editado con éxito", true);
    } catch (error) {
      ServiceResponseEdit.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseEdit;
    }
  },
};

module.exports = userService;
