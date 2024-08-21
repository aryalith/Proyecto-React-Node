const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true, enum: ["admin", "client"], default: "client" },
    image: { type: String },
    games_completed: [{ type: Schema.Types.ObjectId, ref: "games" }],
    games_playing: [{ type: Schema.Types.ObjectId, ref: "games" }],
    games_pending: [{ type: Schema.Types.ObjectId, ref: "games" }],
},
    {
        collection: "user",
        timestamps: true //createdAt -->
    }
)

const User = mongoose.model("user", userSchema)
module.exports = User;