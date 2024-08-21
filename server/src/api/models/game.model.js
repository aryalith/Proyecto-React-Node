const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: { type: String, require: true },
    developer: { type: String, require: true },
    release_date: { type: Date, require: true },
    image: { type: String, require: true },
    genre: { type: String, require: true },
    platform: { type: String, require: true }
}, {
    collection: "games",
    timestamps: true
}
)

const Game = mongoose.model("games", gameSchema)
module.exports = Game