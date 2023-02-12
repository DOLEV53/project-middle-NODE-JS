const { User, validate } = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/defult.json");

// First Endpoint
const signup_post = async (req, res) => {
  try {
    //validation with joi
    const { error } = validate.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the use already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    // create,encrypt & save user in the DB
    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).json({
      id: `${user._id}`,
      name: `${user.name}`,
      email: `${user.email}`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Second Endpoint
const login_post = async (req, res) => {
  try {
    // validation with joi
    const { error } = validate.validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if email available in the DB
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    // Checking if the encrypting password available in the DB
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    // Create token
    const secretKey = config.jwtKey;
    const { _id, biz } = user;
    console.log(secretKey);
    const token = jwt.sign({ _id, biz }, secretKey, {
      expiresIn: "20m",
    });

    res.cookie("jwt", token, { httpOnly: true, expiresIn: "20m" });
    res.status(200).json({ token });
    console.log({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Third Endpoint
const verify_get = async (req, res) => {
  try {
    const decoded = req.user;
    const currentUser = await User.findById(decoded._id).select("-password");
    res.status(200).json({ status: "success", "user details": currentUser });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  signup_post,
  login_post,
  verify_get,
};
