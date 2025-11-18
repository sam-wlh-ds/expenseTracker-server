const express = require("express");
const auth = require("../middleware/auth");
const register = require("../controllers/register");
const login = require("../controllers/login");
const verify = require("../controllers/verify");
const finData = require("../controllers/finData");
const tranData = require("../controllers/tranData")
const addData = require("../controllers/addData")
const clearData = require("../controllers/clearData")
const deleteUser = require("../controllers/deleteUser")
const updateUsername = require("../controllers/updateData");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", auth, verify);
router.post("/finData", auth, finData);
router.post("/tranData", auth, tranData);
router.post("/addData", auth, addData);
router.post("/clearData", auth, clearData);
router.post("/deleteUser", auth, deleteUser);
router.post("/updateUsername", auth, updateUsername);

module.exports = router;
