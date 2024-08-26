const Users = require("../models/users");
const Finance = require("../models/finance");
const Transaction = require("../models/transaction")
const bc = require("bcrypt");
const Joi = require("joi")

const register = async (req, res) => {
    // validating user input
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        // user sent password
        password: Joi.string().min(8).max(255).required(),
    });
    const validation = schema.validate(req.body);
    const { error } = validation;
    if (error)
        return res.status(400).send({message: error.details[0].message});

  try {
    // validating from database
    const { username, email, password } = req.body;

    const checkEmail = await Users.findOne({ email });


    if (checkEmail) {
      return res.status(400).json({
        message: "User already exists!",
        error: true,
      });
    }

    // New user creation
    const salt = await bc.genSalt(10);
    const hashedPass = await bc.hash(password, salt);

    const payload = {
      username,
      email,
      password: hashedPass,
    };

    const user = new Users(payload);
    const finance = new Finance({
      currentBalance:0,
      totalIncome: 0,
      totalExpense: 0
    });
    const defaultTransaction = new Transaction();
    const transaction = [defaultTransaction];

    await finance.save();
    await defaultTransaction.save(); 

    user.finance = finance._id;
    user.transaction = transaction;

    const userSave = await user.save();

    return res.status(200).json({
      message: "User created successfully!",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = register;