const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../utils/jwt")
const { deleteFile } = require("../../utils/deleteFileCloud")

const addUser = async (req, res) => {

    try {
        const newUser = new User(req.body);
        const findUser = await User.find({ email: req.body.email });

        if (findUser.length === 0) {
            if (req.file.path) {
                newUser.image = req.file.path;
            }

            newUser.password = bcrypt.hashSync(newUser.password, 10)

            const createdUser = await newUser.save();
            return res.status(200).json({ message: "Usuario creado", data: createdUser })

        }
        else {
            return res.status(200).json({ message: "El email ya existe" })
        }


    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const user = req.body;
        const userByEmail = await User.find({ email: user.email });
        if (userByEmail.length != 0) {
            if (bcrypt.compareSync(user.password, userByEmail[0].password)) {
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email }
                const token = generateToken(data);
                res.status(200).json({ data: userByEmail, message: token })
            }
            else {
                res.status(200).json({ message: "La contraseña es incorrecta" })
            }
        }
        else {
            return res.status(200).json({ message: "El email no existe" })
        }

    } catch (error) {
        console.log(error);
    }

}

const getLibrary = async (req, res) => {
    const user = await User.findById(req.dataUser._id).populate("games_completed").populate("games_playing").populate("games_pending")
    return res.status(200).json({
        user: user.username,
        data: {
            games_completed: user.games_completed,
            games_playing: user.games_playing,
            games_pending: user.games_pending
        }
    })
}

const getProfile = (req, res) => {
    return res.status(200).json({
        data: req.dataUser.username,
        role: req.dataUser.role
    })
}

const deleteUser = async (req, res) => {
    try {
        const tobeDeleted = req.query;
        const deleteUser = await User.findByIdAndDelete(tobeDeleted);

        if (deleteUser) {
            deleteFile(deleteUser.image)
            return res.status(200).json({ message: "Usuario eliminado con éxito" })
        }
        else {
            return res.status(200).json({ message: "El usuario no existe" })
        }
    } catch (error) {
        console.log(error);

    }
}
const addGameCompleted = async (req, res) => {
    try {
        const { idG } = req.params;

        if (req.dataUser.games_completed.includes(idG)) {
            return res.json({ message: "Game already added" })
        }

        if (req.dataUser.games_playing.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_playing: idG } },
                { new: false }
            )
        }

        if (req.dataUser.games_pending.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_pending: idG } },
                { new: false }
            )
        }

        const modifyUser = await User.findByIdAndUpdate(
            req.dataUser._id,
            { $push: { games_completed: idG } },
            { new: true }
        )

        if (!modifyUser) {
            return res.json({ message: "User not found" })
        } else {
            return res.json({ message: "Game added to completed", data: modifyUser })
        }

    } catch (error) {
        console.log(error);
    }
}

const addGamePlaying = async (req, res) => {
    try {
        const { idG } = req.params;

        if (req.dataUser.games_playing.includes(idG)) {
            return res.json({ message: "Game already added" })
        }

        if (req.dataUser.games_completed.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_completed: idG } },
                { new: false }
            )
        }

        if (req.dataUser.games_pending.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_pending: idG } },
                { new: false }
            )
        }

        const modifyUser = await User.findByIdAndUpdate(
            req.dataUser._id,
            { $push: { games_playing: idG } },
            { new: true }
        )

        if (!modifyUser) {
            return res.json({ message: "User not found" })
        } else {
            return res.json({ message: "Game added to playing", data: modifyUser })
        }
    } catch (error) {
        console.log(error);
    }
}

const addGamePending = async (req, res) => {
    try {
        const { idG } = req.params;

        if (req.dataUser.games_pending.includes(idG)) {
            return res.json({ message: "Game already added" })
        }

        if (req.dataUser.games_completed.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_completed: idG } },
                { new: false }
            )
        }

        if (req.dataUser.games_playing.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_playing: idG } },
                { new: false }
            )
        }

        const modifyUser = await User.findByIdAndUpdate(
            req.dataUser._id,
            { $push: { games_pending: idG } },
            { new: true }
        )
        console.log(modifyUser);

        if (!modifyUser) {
            return res.json({ message: "User not found" })
        } else {
            return res.json({ message: "Game added to pending", data: modifyUser })
        }

    } catch (error) {
        console.log(error);

    }

}

const deleteGameatAny = async (req, res) => {
    try {
        const { idG } = req.params;

        if (req.dataUser.games_completed.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_completed: idG } },
                { new: true }
            )
            if (!modifyUser) {
                return res.json({ message: "Incorrect data" })
            } else {
                return res.json({ message: "Game removed", data: modifyUser })
            }
        }

        if (req.dataUser.games_playing.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_playing: idG } },
                { new: true }
            )
            if (!modifyUser) {
                return res.json({ message: "Incorrect data" })
            } else {
                return res.json({ message: "Game removed", data: modifyUser })
            }
        }

        if (req.dataUser.games_pending.includes(idG)) {
            const modifyUser = await User.findByIdAndUpdate(
                req.dataUser._id,
                { $pull: { games_pending: idG } },
                { new: true }
            )
            if (!modifyUser) {
                return res.json({ message: "Incorrect data" })
            } else {
                return res.json({ message: "Game removed", data: modifyUser })
            }
        }


    } catch (error) {

    }
}


module.exports = { addUser, login, getLibrary, getProfile, deleteUser, addGameCompleted, addGamePlaying, addGamePending, deleteGameatAny }