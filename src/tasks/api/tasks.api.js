const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasks.controller");
const ResponseBody = require("../../model/ResponseBody.model");

const getAllTasksAPI = async (req, res) => {
  const { id } = req.query;
  let message;
  try {
    if (id) {
      const resultado = await getTask(id);
      message = new ResponseBody(true, 200, resultado);
    } else {
      const resultado = await getAllTasks();
      message = new ResponseBody(true, 200, resultado);
    }
  } catch (error) {
    if (error.status_cod) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor inténtelo nuevamente más tarde",
      });
    }
  }
  return res.json(message);
};

const getTaskAPI = async (req, res) => {
  let message;
  const { id } = req.query;
  try {
    const resultado = await getTask(id);
    message = new ResponseBody(true, 200, resultado);
  } catch (error) {
    if (error.status_cod) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor inténtelo nuevamente más tarde",
      });
    }
  }
  return res.json(message);
};

const createTaskAPI = async (req, res) => {
  const { user_id, age, status } = req.body;
  try {
    const getAllTask = await createTask({ user_id, age, status });
    message = new ResponseBody(true, 200, getAllTask);
  } catch (error) {
    if (error.data) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor inténtelo nuevamente más tarde",
      });
    }
  }
  return res.json(message);
};

const deleteTaskAPI = async (req, res) => {
  let message;
  const { id } = req.query;
  try {
    const deleteTas = await deleteTask(id);
    message = new ResponseBody(true, 200, deleteTas);
  } catch (error) {
    if (error.data) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor reintente nuevamente",
      });
    }
  }
  return res.json(message);
};

const updateTaskAPI = async (req, res) => {
  let message;
  const { id } = req.query;
  const { user_id, age, status } = req.body;
  try {
    const deleteTas = await updateTask({ id, user_id, age, status });
    message = new ResponseBody(true, 200, deleteTas);
  } catch (error) {
    if (error.data) {
      message = new ResponseBody(error.ok, error.status_cod, error.data);
    } else {
      message = new ResponseBody(false, 500, {
        message:
          "Ha ocurrido un error inesperado. Por favor reintente nuevamente",
      });
    }
  }
  return res.json(message);
};

module.exports = {
  getAllTasksAPI,
  getTaskAPI,
  createTaskAPI,
  deleteTaskAPI,
  updateTaskAPI,
};
