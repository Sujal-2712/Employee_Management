const { queryDatabase } = require("./../db/connection");

async function handleAdmin(req, res) {
  if (req.user != null) {
    let sql = `select * from employees where employee_id=${req.user._id}  and IsAdmin=1`;
    try {
      const result = await queryDatabase(sql);
      res.render("index", { data: result[0], IsAdmin: true });
    } catch (error) {
      console.log("error in admin panel");
    }
  } else {
    return res.redirect("/");
  }
}

async function handleLeave(req, res) {
  console.log("sujal");
  if (req.user != null) {
    let sql =
      "select lm.* ,e.first_name, e.last_name,e.phone_number from leave_master as lm inner join employees as e on lm.employee_id=e.employee_id where lm.isApproved=0 and lm.isProcessed=0;";
    try {
      const result = await queryDatabase(sql);
      res.render("adminleave", {
        data: result,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        IsAdmin: req.user.IsAdmin,
      });
    } catch (error) {
      console.log("error in all leaves");
    }
  } else {
    return res.redirect("/");
  }
}

async function handleUpdateLeave(req, res) {
  if (req.user != null) {
    let id = req.params.id;
    let status = req.query.status;
    let sql = "";
    if (status == "approve") {
      sql = `update leave_master set isApproved=1,isProcessed=1 where leaveId=${id}`;
    } else {
      sql = `update leave_master set isApproved=0 ,isProcessed=1 where leaveId=${id}`;
    }

    try {
      const result = await queryDatabase(sql);
      return res.json({ message: "leave is approved!!" });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/");
  }
}

module.exports = { handleAdmin, handleLeave, handleUpdateLeave };
