const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    voicedBy: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    religion: {
        type: String,
        required: false
    },
    catchPhrase: {
        type: String,
        required: false
    },
    hairColor: {
        type: String
    },
    schoolGrade: {
        type: Number,
        required: false
    },
    episodes: {
        type: String,
        required: true
    },
    appearances: {
        type: Number,
        required: true
    },
    firstAppearance: {
        type: String,
        required: true
    }
});

const Character = mongoose.model("Character", characterSchema);
module.exports = Character;