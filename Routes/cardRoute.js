const express = require("express");
const router = express.Router();
const cardController = require("../Controllers/cardController");
const verify_logged_in = require("../middleware/verify_logged_in");

// POST http://localhost:3000/api/cards
router.post("/", verify_logged_in, cardController.card_post);

// GET http://localhost:3000/api/cards/:id
router.get("/usercards", verify_logged_in, cardController.cards_array);

// GET http://localhost:3000/api/cards/:id
router.get("/:id", verify_logged_in, cardController.card_get);

// PUT http://localhost:3000/api/cards/:id
router.put("/:id", verify_logged_in, cardController.card_put);

// DELETE http://localhost:3000/api/cards/:id
router.delete("/:id", verify_logged_in, cardController.card_delete);

module.exports = router;
