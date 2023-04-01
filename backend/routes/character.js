const express = require("express");
const router = express.Router();

const CharacterController = require("../controllers/CharacterController");

router.get("/", CharacterController.indexCharacter);
router.post("/show", CharacterController.showCharacter);
router.post("/add", CharacterController.addCharacter);
router.post("/update", CharacterController.updateCharacter);
router.post("/delete", CharacterController.deleteCharacter);

module.exports = router;