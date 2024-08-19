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
                //crear el token y retornarlo
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email }
                const token = generateToken(data)
                res.status(200).json({ message: token })
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

const getProfile = (req, res) => {
    return res.status(200).json({
        data: req.dataUser.name,
        role: req.dataUser.role
    })
}

const deleteUser = async (req, res) => {
    try {
        const tobeDeleted = req.query;
        const deleteUser = await User.findByIdAndDelete(tobeDeleted);
        //borrar la foto del cloudinary

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


module.exports = { addUser, login, getProfile, deleteUser }