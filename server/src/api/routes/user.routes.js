const express = require("express");
const { addUser, login, getProfile, deleteUser } = require("../controlers/user.controllers");
const { isAuth, isAdmin } = require("../../middleware/auth")
const router = express.Router();
const upload = require("../../middleware/upload");

router.post("/add", upload.single("image"), addUser);
router.post("/login", login)
//modifical perfil de usuario
router.get("/profile", [isAuth], getProfile);
router.delete("/delete", [isAdmin], deleteUser);

module.exports = router;