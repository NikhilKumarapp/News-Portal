const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER ADMIN

exports.registerAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {

      return res.status(400).json({
        message: "Admin already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    res.status(201).json(admin);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN ADMIN

exports.loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {

      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(

      {
        id: admin._id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({

      token,

      admin: {
        email: admin.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};