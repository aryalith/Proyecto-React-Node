const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: { type: String, require: true },
    developer: { type: Strin, require: true },
    release_date: { type: Date, require: true },
    image: { type: String, require: true },
    genre: { type: String, require: true },
    platform: { type: String, require: true },
    users_completed: { type: Schema.Types.ObjectId, ref: "user" },
    users_playing: { type: Schema.Types.ObjectId, ref: "user" },
    users_pending: { type: Schema.Types.ObjectId, ref: "user" }
}, {
    collection: "games"
}
)

const Game = mongoose.model("games", gameSchema)
module.exports = Game