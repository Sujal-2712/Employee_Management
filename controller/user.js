const { queryDatabase } = require("../db/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginTime = 20 * 60 * 1000;

const handelUserSignIn = async (req, res) => {
  const { email, password, role } = req.body;
  let sql = `SELECT first_name, last_name, password, employee_id, IsAdmin FROM employees WHERE email = "${email}"`;

  try {
    const result = await queryDatabase(sql);
    let user = result;
    console.log(user);
    if (user[0] == undefined) {
      return res.status(404).json({ message: "User not found!!", error: 1 });
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      try {
        if (role === "admin" && !user[0].IsAdmin) {
          return res
            .status(403)
            .json({ message: "You are unauthorized", error: 1 });
        }
        if (role === "employee" && user[0].IsAdmin == 1) {
          return res
            .status(403)
            .json({ message: "You are unauthorized to access", errro: 1 });
        }
        let redirectUrl = "/user";
        if (user[0].IsAdmin && role === "admin") {
          redirectUrl = "/admin";
        }
        const token = jwt.sign(
          {
            _id: user[0].employee_id.toString(),
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            IsAdmin: user[0].IsAdmin,
          },
          process.env.SECRET_KEY
        );
        console.log("Generated Token : ", token);
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + loginTime),
        });
        res
          .status(200)
          .json({
            message: "Login successful",
            IsAdmin: user[0].IsAdmin,
            redirectUrl: redirectUrl,
          });
      } catch (error) {
        res.status(500).json({ message: "Error in generating token!!" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Password is incorrect!!!", error: 1 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handelUserSignUp = async (req, res) => {
  const { fname, lname, email, phone, password, cpassword } = req.body;
  try {
    if (cpassword == password) {
      const hashedpassword = await bcrypt.hash(password, 10);

      let sql =
        "INSERT INTO employees(first_name,last_name,email,phone_number,password,isAdmin) VALUES (?,?,?,?,?,'0')";

      const result = await queryDatabase(sql, [
        fname,
        lname,
        email,
        phone,
        hashedpassword,
      ]);

      console.log("sujal");

      res.redirect("/login");
    } else {
      res.json({ message: "Password are not matched!!" });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { handelUserSignIn, handelUserSignUp };
