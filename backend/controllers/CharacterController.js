import Character from "../models/Character";

// Show the list of Characters
async function indexCharacter(req, res, next){
    try{
        const characters = await Character.find();
        res.json({response: characters});
    }
    catch(err){
        res.json({message: "An error occurred"});
    }
}

//show single character
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

// add character
async function addCharacter(req, res, next){
    let character = new Character({
        name: req.body.name,
        nickname: req.body.nickname,
        occupation: req.body.occupation,
        image: req.body.image,
        age: req.body.age
    });
    try{
        character.save();
        res.json({message: "Character Added Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

//update character by id
async function updateCharacter(req, res, next){
    let characterID = req.body.characterID;

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    try{
        await Character.findByIdAndUpdate(characterID, {$set: updatedData});
        res.json({message: "Character updated Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

//delete an character
async function deleteCharacter(req, res, next){
    let characterID = req.body.characterID;
    
    try{
        await Character.findOneAndRemove(characterID);
        res.json({message: "Character deleted Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

module.exports = {
    indexCharacter,showCharacter,addCharacter,updateCharacter,deleteCharacter
}