const express = require("express");
const { handleAdmin,handleLeave,handleUpdateLeave } = require("./../controller/admincontroller");
const adminTask=require('./taskrouter');
const {}=require('./../controller/taskcontroller');
const auth = require("./../middleware/auth");
const router = express.Router();

router.get("/", auth, handleAdmin);

router.get("/leave", auth,handleLeave);

router.get("/leave/update/:id",handleUpdateLeave);

router.use('/task',adminTask);

module.exports = router;
