const Character = require("../models/Character");

/* ========== show list of characters ========== */
async function indexCharacter(req, res, next){
    try{
        const characters = await Character.find({});
        res.json({response: characters});
    }
    catch(err){
        res.json({message: "An error occurred"});
    }
}

/* ========== show single character ========== */
async function showCharacter(req, res, next){
    let characterID = req.body.characterID;
    try{
        const character = await Character.findById(characterID);
        res.json({response: character});
    }
    catch(err){
        res.json({message: "An error occurred"});
    }
}

async function addCharacter(req, res, next){
    let character = new Character({
        name: req.body.name,
        nickname: req.body.nickname,
        image: req.body.image,
        occupation: req.body.occupation,
        age: req.body.age,
        voicedBy: req.body.voicedBy,
        gender: req.body.gender,
        religion: req.body.religion,
        catchPhrase: req.body.catchPhrase,
        hairColor: req.body.hairColor,
        schoolGrade: req.body.schoolGrade,
        episodes: req.body.episodes,
        appearances: req.body.appearances,
        firstAppearance: req.body.firstAppearance
    });
    try{
        await character.save();
        res.json({message: "Character Added Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

async function updateCharacter(req, res, next){
    let characterID = req.body.characterID;

    let updatedData = {
        name: req.body.name,
        nickname: req.body.nickname,
        image: req.body.image,
        occupation: req.body.occupation,
        age: req.body.age,
        voicedBy: req.body.voicedBy,
        gender: req.body.gender,
        religion: req.body.religion,
        catchPhrase: req.body.catchPhrase,
        hairColor: req.body.hairColor,
        schoolGrade: req.body.schoolGrade,
        episodes: req.body.episodes,
        appearances: req.body.appearances,
        firstAppearance: req.body.firstAppearance
    }
    try{
        await Character.findByIdAndUpdate(characterID, {$set: updatedData});
        res.json({message: "Character updated Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

async function deleteCharacter(req, res, next){
    let characterID = req.body.characterID;
    
    try{
        await Character.findByIdAndDelete(characterID);
        res.json({message: "Character deleted Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

module.exports = {
    indexCharacter,showCharacter,addCharacter,updateCharacter,deleteCharacter
}