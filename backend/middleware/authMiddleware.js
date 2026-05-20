const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

  try {

    const token =
      req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        message: "No Token"
      });
    }

    const decoded = jwt.verify(
      token,
      "secretkey"
    );

    req.adminId = decoded.id;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Unauthorized"
    });
  }
};