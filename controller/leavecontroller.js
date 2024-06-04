const { queryDatabase } = require("../db/connection");
async function handleUserLeave(req, res) {
  if (req.user != null) {
    console.log(req.user);
    const { leave_description, start, end } = req.body;
    const userId = req.user;
    try {
      let sql =
        "insert into leave_master(leaveReason,leaveFrom,leaveTo,employee_id) value (?,?,?,?)";
      const result = await queryDatabase(sql, [
        leave_description,
        start,
        end,
        userId._id,
      ]);
      return res.redirect("/user/leave");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
}

async function handleAllLeaves(req, res) {
  if (req.user != null) {
    let userId = req.user;
    let status = req.query.status;
    try {
      let sql = `SELECT * FROM leave_master WHERE employee_id=${userId._id} AND isApproved='${status} '`;
      const result = await queryDatabase(sql);
      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
}

async function handleRemoveLeave(req, res) {
  if (req.user != null) {
    let id = req.params.id;
    try {
      let sql = `DELETE from leave_master where leaveId=${id}`;
      const result = await queryDatabase(sql);

      res.redirect("/user/leave");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
}
module.exports = { handleUserLeave, handleAllLeaves, handleRemoveLeave };
