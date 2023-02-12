const { Card, validateCard, generatebusinessCardNumber } = require("../Models/cardModel");
const _ = require("lodash");

// Four endpiont
const card_post = async (req, res) => {
  try {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let { cardName, cardDescription, cardAddress, cardPhone, cardImage } = req.body;
    let card = new Card({
      cardName: cardName,
      cardDescription: cardDescription,
      cardAddress: cardAddress,
      cardPhone: cardPhone,
      cardImage: cardImage
        ? cardImage
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      businessCardNumber: await generatebusinessCardNumber(Card),
      user_id: req.user._id,
    });

    let post = await card.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Five endpoint // Read one card - CRUD
const card_get = async (req, res) => {
  try {
    const findCard = await Card.findOne({ _id: req.params.id });
    if (!findCard) return res.status(404).send("Card not found.");
    res.send(findCard);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Six endpoint // Update one card - CRUD
const card_put = async (req, res) => {
  try {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let updateCard = await Card.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!updateCard) return res.status(404).send("Card not found.");

    // after i do the changes i want to see them
    updateCard = await Card.findOne({ _id: req.params.id });
    res.send(updateCard);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Seven endpoint // Delete one card - CRUD
const card_delete = async (req, res) => {
  try {
    const deleteCard = await Card.findOneAndDelete({ _id: req.params.id });
    if (!deleteCard) return res.status(404).send("Card not found.");
    res.send(deleteCard);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// EIGHT endpoint //  show user cards
const cards_array = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    console.log(req.user);
    const allUserCards = await Card.find({ user_id: currentUserId });
    res.status(200).json({
      status: "succes",
      results: allUserCards.length,
      data: allUserCards,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  card_post,
  card_get,
  card_put,
  card_delete,
  cards_array,
};
