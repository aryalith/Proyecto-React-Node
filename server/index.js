const express = require("express");
const { connectDB } = require("./src/utils/db")
const routerUser = require("./src/api/routes/user.routes")
const routerGames = require("./src/api/routes/game.routes")
const env = require("dotenv")
const cors = require('cors');

env.config()

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

connectDB();
const server = express();
const PORT = process.env.PORT;

server.use(cors());

server.use(express.json());
server.use("/user", routerUser)
server.use("/games", routerGames)

server.listen(PORT, () => {
    console.log(`listen port http://localhost: ${PORT}`);
})
