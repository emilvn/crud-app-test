const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema= new Schema({
    name:{
        type: String
    },
    nickname: {
        type: String
    },
    occupation: {
        type: String
    },
    image: {
        type: String
    },
    age: {
        type: Number
    }
}, {timestamps: true})

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;