const express = require("express");
const { addUser, login, getProfile, deleteUser, addGameCompleted, addGamePlaying, addGamePending, deleteGameatAny } = require("../controlers/user.controllers");
const { isAuth, isAdmin } = require("../../middleware/auth")
const router = express.Router();
const uploadUser = require("../../middleware/uploadUser");

router.post("/add", uploadUser.single("image"), addUser);
router.post("/login", login)
//modifical perfil de usuario
router.get("/profile", [isAuth], getProfile);
router.delete("/delete", [isAdmin], deleteUser);
//añadir y sacar juegos
router.put("/addGameCompleted/:idG", [isAuth], addGameCompleted);
router.put("/addGamePlaying/:idG", [isAuth], addGamePlaying);
router.put("/addGamePending/:idG", [isAuth], addGamePending);
router.delete("/deleteGame/:idG", [isAuth], deleteGameatAny);

module.exports = router;