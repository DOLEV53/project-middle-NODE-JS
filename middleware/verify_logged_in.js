const jwt = require("jsonwebtoken");
const config = require("../config/defult.json");

async function verify_logged_in(req, res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }

    if (!token) {
      return res.status(401).json({
        status: "Fail",
        message: "You are not logged in! Please log in for user details",
      });
    }

    //  Verifiy token
    const secretKey = config.jwtKey;
    const decoded = await jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }

  // B. If all is well, 'next()'
  next();
}

module.exports = verify_logged_in;
