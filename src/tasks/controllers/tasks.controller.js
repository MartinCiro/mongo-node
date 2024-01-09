const tasksUtils = require("../utils/tasks.utils");

async function getAllTasks() {
  try {
    return await tasksUtils.getAllTask();
  } catch (error) {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  }
}

async function getTask(element) {
  tasksUtils.validar(element, "el id");
  try {
    return await tasksUtils.getTask(element);
  } catch (error) {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  }
}

const createTask = async (elements) => {
  const { user_id, age, status } = elements;
  
  tasksUtils.validar(user_id, "el nombre de usuario");
  tasksUtils.validar(age, "la edad");
  tasksUtils.validar(status, "el estado");

  return await tasksUtils.createTask(elements)
  .then((data) => {
    return data;
  })
  .catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  })
};

const deleteTask = async (id) => {
  return await tasksUtils.deleteTask(id)
  .then((data) => {
    return data;
  })
  .catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  })
};

const updateTask = async (params) => {
  const { id, user_id, age, status } = params;
  tasksUtils.validar(id, "el id");
  tasksUtils.validar(user_id, "el nombre de usuario");
  tasksUtils.validar(age, "la edad");
  tasksUtils.validar(status, "el estado");
  
  return await tasksUtils.updateTask(params)
  .then((data) => {
    return data;
  })
  .catch((error) => {
    if (error.status_cod) throw error;
    console.log(error);
    throw {
      ok: false,
      status_cod: 500,
      data: "Ha ocurrido un error consultando la información en base de datos",
    };
  })
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
