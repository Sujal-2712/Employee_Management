const express = require("express");
const auth = require("./../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { handelUserSignIn, handelUserSignUp } = require("../controller/user");

router.get("/register", (req, res) => {
  res.render("registration");
});

router.get("/user", auth, async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  try {
    res.render("index", {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      IsAdmin: req.user.IsAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: 1 });
  }
});

router.get("/admin", auth, async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  try {
    res.render("index", {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      IsAdmin: req.user.IsAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: 1 });
  }
});


router.post("/register", handelUserSignUp);
router.post("/login", handelUserSignIn);

module.exports = router;
