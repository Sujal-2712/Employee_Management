const { queryDatabase } = require("../db/connection");

const handleUserTask = async (req, res) => {
  if (req.user != null) {
    let id = req.user;
    try {
      let sql = `select * from employees where employee_id=${id._id}`;
      const result = await queryDatabase(sql);
      if (result[0] == undefined) throw new Error("Employee not found");
      return res.render("task");
    } catch (error) {
      return res.json({ message: "Not accessible!!" });
    }
  } else {
    return res.redirect("/");
  }
};

const getAllEmployee = async (req, res) => {
  if (req.user == null) {
    res.redirect("/");
  }
  try {
    const id=req.user._id;
    var sql = `select * from employees where isAdmin = 0 and employee_id != ${id}`;
    const result = await queryDatabase(sql);
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const handleAddTask = async (req, res) => {
  if (req.user != null) {
    try {
      const { task_title, task_priority, employee_name, task_description } =
        req.body;
      const assigned_by = req.user._id;
      let sql =
        "INSERT INTO task_master (taskTitle, taskDescription, taskPriority, taskCurrentStatus, taskAssignedBy, taskAssignedTo) VALUES (?, ?, ?, 'pending',?, ?)";

      const result = await queryDatabase(sql, [
        task_title,
        task_description,
        task_priority,
        assigned_by,
        employee_name,
      ]);
      console.log("Task Added");
      return res.redirect("/user/task");
    } catch (error) {
      console.log("Error:", error);
    }
  } else {
    return res.redirect("/");
  }
};

const taskDashboard = (req, res) => {
  if (req.user != null) {
    if (req.user.IsAdmin) res.render("adminTask",{first_name:req.user.first_name,last_name:req.user.last_name,IsAdmin:req.user.IsAdmin});
    else res.render("task",{first_name:req.user.first_name,last_name:req.user.last_name,IsAdmin:req.user.IsAdmin});
  } else {
    res.redirect("/");
  }
};

const handleTasks = async (req, res) => {
  if (req.user != null) {
    const taskStatus = req.query.taskStatus;
    const assigned_by = req.user._id;

    let sql = ``;
    if (taskStatus === "review") {
      sql = `SELECT task_master.taskId, task_master.taskTitle, task_master.taskPriority, task_master.taskDescription, task_master.taskCurrentStatus, employees.first_name
           FROM task_master
           JOIN employees ON task_master.taskAssignedBy = employees.employee_id
           WHERE task_master.taskCurrentStatus = "${taskStatus}" AND task_master.taskAssignedBy = ${assigned_by}`;
    } else {
      sql = `SELECT task_master.taskId, task_master.taskTitle, task_master.taskPriority, task_master.taskDescription, task_master.taskCurrentStatus, employees.first_name
           FROM task_master
           JOIN employees ON task_master.taskAssignedBy = employees.employee_id
           WHERE task_master.taskCurrentStatus = "${taskStatus}" AND task_master.taskAssignedTo = ${assigned_by}`;
    }

    try {
      const result = await queryDatabase(sql);
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.redirect("/");
  }
};

const handleUpdate = async (req, res) => {
  if (req.user != null) {
    const id = req.params.id;
    const newStatus = req.query.newtaskStatus;
    sql = `update task_master set taskCurrentStatus="${newStatus}" where taskId=${id}`;
    try {
      const data = await queryDatabase(sql);
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
};

module.exports = {
  handleUserTask,
  getAllEmployee,
  handleAddTask,
  handleTasks,
  handleUpdate,
  taskDashboard,
};
