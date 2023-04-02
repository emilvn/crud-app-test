const express = require("express");
const router = express.Router();

const CharacterController = require("../controllers/CharacterController");

/* ========== READ ALL ========== */
router.get("/", CharacterController.indexCharacter);

/* ========== READ ONE ========== */
router.post("/show", CharacterController.showCharacter);

/* ========== CREATE ========== */
router.post("/add", CharacterController.addCharacter);

/* ========== UPDATE ========== */
router.put("/update", CharacterController.updateCharacter);

/* ========== DELETE ========== */
router.delete("/delete", CharacterController.deleteCharacter);

module.exports = router;