const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // I start from index 1 becuse I will send (Bearer) with the request in header
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
