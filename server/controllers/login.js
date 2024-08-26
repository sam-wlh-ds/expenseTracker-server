const Users = require("../models/users");
const jwt = require('jsonwebtoken');
const bc = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).send({message:"Invalid Username or Password"});
    }

    const isValid = await bc.compare(password, user.password);
    if (!isValid) {
      return res.status(400).send({message:"Invalid Username or Password"});
    }

    // json web token
    const token = jwt.sign({ _id: user._id}, process.env.JWTPRIVATEKEY);

    return res.status(200).json({
      message: "Login Successful",
      id: user._id,
      username: user.username,
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = login;
