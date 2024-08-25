const express = require("express");
const { addGame, deleteGame, getAllGames, getGameById, updateGame } = require("../controlers/game.controller");
const { /* isAuth */ isAdmin } = require("../../middleware/auth")
const router = express.Router();
const uploadGame = require("../../middleware/uploadGame");

router.post("/add", [isAdmin], uploadGame.single("image"), addGame);
router.delete("/delete/:id", [isAdmin], deleteGame);
router.get("/all", getAllGames);
router.get("/detail/:id", getGameById);
router.put("/update", [isAdmin], updateGame)

module.exports = router;