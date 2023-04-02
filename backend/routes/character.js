const express = require("express");
const router = express.Router();

const CharacterController = require("../controllers/CharacterController");

/* ========== READ ALL ========== */
router.get("/", CharacterController.indexCharacter);

/* ========== READ ONE ========== */
router.post("/show/:characterID", CharacterController.showCharacter);

/* ========== CREATE ========== */
router.post("/add", CharacterController.addCharacter);

/* ========== UPDATE ========== */
router.put("/update/:characterID", CharacterController.updateCharacter);

/* ========== DELETE ========== */
router.delete("/delete/:characterID", CharacterController.deleteCharacter);

module.exports = router;