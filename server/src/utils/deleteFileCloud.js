const cloudinary = require("cloudinary").v2
const deleteFile = (url) => {

    const imgSplit = url.split("/");
    const nameImg = imgSplit[imgSplit.length - 1].split(".");
    const folder = imgSplit[imgSplit.length - 2];
    const imgToDelete = `${folder}/${nameImg[0]}`
    cloudinary.uploader.destroy(imgToDelete, () => {
        console.log("imagen eliminada");

    })
}

module.exports = { deleteFile }