const { getConnection } = require("../../db");
const { ObjectId } = require("mongodb");

const existe = (error, datos) => {
  const errorMessages = {
    duplicateEntry: (field) => `El ${field} ya existe`,
  };

  if (error.code === "23505") {
    const field = datos;
    throw {
      ok: false,
      status_cod: 400,
      data: errorMessages.duplicateEntry(field),
    };
  }
};

const validar = (valor, nombre) => {
  if (!valor)
    throw {
      ok: false,
      status_cod: 400,
      data: `No se ha proporcionado ${nombre}`,
    };
};

/* async function getAllTask() {
  const pool = await getConnection();
  const collection = pool.collection('people');
  const tasks = await collection.find().toArray();
  console.log(tasks);

  return Promise.resolve(tasks)
    .then((data) => {
      return (data.length > 0 ? data : "No se encontró información");
    })
    .catch((error) => {
      console.log(error)
      if (error.status_cod) throw error;
      error.status_cod ? error : null;
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en base de datos",
      };
    })
    .finally(() => pool.client.close());
} */


async function getAllTask() {
  const pool = await getConnection();

  return pool.collection('people').find().toArray()
    .then((data) => {
      return (data.length > 0 ? data : "No se encontró información");
    })
    .catch((error) => {
      console.log(error)
      if (error.status_cod) throw error;
      error.status_cod ? error : null;
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en base de datos",
      };
    })
    .finally(() => pool.client.close());
}

async function getTask(id) {
  const pool = await getConnection();
  
  return pool.collection('people').findOne({ _id: new ObjectId(id)})
    .then((data) => {
      return (data!=null ? data : "No se encontró información");
    })
    .catch((error) => {
      console.log(error)
      if (error.status_cod) throw error;
      error.status_cod ? error : null;
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en base de datos",
      };
    })
    .finally(() => pool.client.close());
}

async function createTask(elements) {
  const pool = await getConnection();
  
  const params = [elements.user_id, elements.age, elements.status];
  return pool.collection('people')
    .insertOne({ 
      user_id: params[0], age: params[1], status: params[2]
    })
    .then((data) => {
      return (data!=null ? `Se creó el registro, id: ${data.insertedId}` : "No se encontró información");
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      error.status_cod ? error : null;
      existe(error, "title");
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en base de datos",
      };
    })
    .finally(() => pool.client.close());
}

async function deleteTask(id) {
  const pool = await getConnection();
  return pool.collection('people')
    .deleteOne({ _id: new ObjectId(id)})
    .then((data) => {
      return data.deletedCount != 0 ? "Tarea eliminada con exito" : "No se pudo eliminar, intente nuevamente";
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      error.status_cod ? error : null;
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en base de datos",
      };
    })
    .finally(() => pool.client.close());
}

async function updateTask(elements) {
  const params = [elements.id, elements.user_id, elements.age, elements.status];
  
  const pool = await getConnection();
  return pool.collection('people')
    .updateOne({ _id: new ObjectId(params[0])}, { $set: { user_id: params[1], age: params[2], status: params[3] } })
    .then((data) => {
      return data.modifiedCount > 0 && data.matchedCount > 0 ? "Tarea actualizada con exito" : data.matchedCount===0 ? "No se encontró la tarea" : "No se pudo actualizar, intente nuevamente";
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      console.log(error);
      error.status_cod ? error : null;
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error consultando la información en base de datos",
      };
    })
    .finally(() => pool.client.close());
}

module.exports = {
  existe,
  validar,
  getAllTask,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
