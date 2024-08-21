const Game = require("../models/game.model")
const { deleteFile } = require("../../utils/deleteFileCloud")

const addGame = async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const findGame = await Game.find({ title: req.body.title });

        if (findGame.length === 0) {
            if (req.file.path) {
                newGame.image = req.file.path;
            }

            const createdGame = await newGame.save();
            return res.status(200).json({ message: "Game uploaded", data: createdGame })

        }
        else {
            return res.status(200).json({ message: "Game already exists" })
        }


    } catch (error) {
        console.log(error);
    }
}

const getAllGames = async (req, res) => {
    try {
        //http://localhost:3000/characters/all?pag=5&limit=10
        let pag = parseInt(req.query.pag)
        let limit = parseInt(req.query.limit)

        pag = !isNaN(pag) ? pag : 1;
        limit = !isNaN(limit) ? limit : 10;
        limit = limit > 10 ? 10 : limit < 1 ? 5 : limit;

        const numGames = await Game.countDocuments()

        let numPage = Math.ceil(numGames / limit)

        if (pag > numPage) {
            pag = numPage;
        }

        if (pag < 1) {
            pag = 1;
        }

        const allGames = await Game.find().skip((pag - 1) * limit).limit(limit)
        res.json({
            previewPage: pag === 1 ? null : pag - 1,
            nextPage: numPage >= pag + 1 ? pag + 1 : null,
            data: allGames
        })

        console.log(numPage);
    } catch (error) {
        console.log(error);

    }
}
//ta mal
const getGameById = async (req, res) => {
    const { id } = req.query;
    const games = await Game.findById(id).populate("user");
    if (!games) {
        return res.json({ message: "Game not found" })
    }
    return res.json({ data: games })
}

const deleteGame = async (req, res) => {
    try {
        const tobeDeleted = req.query;
        const deleteUser = await Game.findByIdAndDelete(tobeDeleted);
        //borrar la foto del cloudinary
        if (deleteUser) {
            deleteFile(deleteUser.image)
            return res.status(200).json({ message: "Game deleted" })
        }
        else {
            return res.status(200).json({ message: "Game not found" })
        }
    } catch (error) {
        console.log(error);

    }
}

//esto updatea por el body, no por el form
const updateGame = async (req, res) => {
    try {
        const { id } = req.query;
        const game = req.body;
        const updateGame = await Game.findByIdAndUpdate(id, game, { new: true })
        if (!updateGame) {
            res.json({ success: false, message: "Game not found" })
        }
        else {
            console.log(game);

            res.json(updateGame)
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = { addGame, getAllGames, getGameById, deleteGame, updateGame }