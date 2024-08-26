const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  // npm package -> joi-password-complexity
  // use this check the complexity of password
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024, // because of hashing
  },
  finance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "finance",
  },
  transaction: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
  }],
});


const Users = mongoose.model("users", usersSchema);

module.exports = Users;
