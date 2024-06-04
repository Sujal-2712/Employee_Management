const express = require("express");
const router = express.Router();

const {taskDashboard,handleAddTask,getAllEmployee,handleTasks,handleUpdate}=require('./../controller/taskcontroller');

router.get('/',taskDashboard);
router.get('/getAllEmployee',getAllEmployee);
router.post('/addtask',handleAddTask);
router.get('/getTasks',handleTasks);
router.patch('/updateTask/:id',handleUpdate);


router.get('/viewtask', (req, res) => {
    res.render('viewtask');
});

module.exports=router;