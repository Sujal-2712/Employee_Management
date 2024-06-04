require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");
const userRoute = require("./router/user");
const taskRoute = require("./router/taskrouter");
const leaveRoute = require("./router/leaverouter");
const adminRoute = require("./router/adminrouter");
const auth = require("./middleware/auth");
const { queryDatabase } = require("./db/connection");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());

app.get("/", (req, res) => {
  res.render("login");
});

app.use("/", userRoute);
app.use("/user/task", auth, taskRoute);
app.use("/user/leave", auth, leaveRoute);
app.use("/admin", auth, adminRoute);

app.get("/api/tasks", async (req, res) => {
  let sql = `SELECT 
  task_master.*,
  assignor.first_name AS assigned_by_first_name,
  assignee.first_name AS assigned_to_first_name
FROM 
  task_master
JOIN
  employees AS assignor ON task_master.taskAssignedBy = assignor.employee_id
JOIN
  employees AS assignee ON task_master.taskAssignedTo = assignee.employee_id
WHERE
  task_master.taskCurrentStatus != 'done';
`;
  try {
    const result = await queryDatabase(sql);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
