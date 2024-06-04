const express = require("express");
const {
  handleUserLeave,
  handleAllLeaves,
  handleRemoveLeave,
  handleUpdateLeave,
  handleRejectLeave
} = require("../controller/leavecontroller");
const auth = require("../middleware/auth");
const router = express.Router();



router.get("/", auth, (req, res) => {
  console.log("sj");
  if (req.user == null) {
    res.redirect("/");
  } else {
    res.render("leave",{first_name:req.user.first_name,last_name:req.user.last_name,IsAdmin:req.user.IsAdmin});
  }
});

router.post("/addleave", handleUserLeave);
router.get("/getLeaves", handleAllLeaves);
router.get("/deleteLeave/:id", handleRemoveLeave);

module.exports = router;
