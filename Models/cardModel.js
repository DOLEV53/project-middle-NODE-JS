const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
  },
  cardDescription: {
    type: String,
  },
  cardAddress: {
    type: String,
  },
  cardPhone: {
    type: String,
  },
  cardImage: {
    type: String,
  },
  businessCardNumber: {
    type: String,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    cardName: Joi.string().min(2).max(250).required(),
    cardDescription: Joi.string().min(2).max(1000).required(),
    cardAddress: Joi.string().min(2).max(250).required(),
    cardPhone: Joi.string().min(9).max(10).required(),
    cardImage: Joi.string().min(11).max(1024),
  });

  return schema.validate(card);
}

// this function will give as random number evry card we will make
async function generatebusinessCardNumber(Card) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({ businessCardNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.generatebusinessCardNumber = generatebusinessCardNumber;
