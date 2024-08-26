const Users = require("../models/users");

const verify = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(400).send(
        {
            message:"Invalid Id",
            error: true
        });
    }

    return res.status(200).json({
      message: "Valid Id",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = verify;