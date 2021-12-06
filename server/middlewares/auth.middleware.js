const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

const auth = (req, res, next) => {
  const tokenComponents = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : [];
  const path = req.path;

  if (path.includes("/private/")) {
    // JWT check
    if (tokenComponents.length !== 2) {
      res.status(401).json({ error: "Invalid Authorization token" });
      return;
    }

    const jwtToken = tokenComponents[1];

    try {
      req.body.userId = jwt.verify(jwtToken, JWT_KEY).userId;
      next();
    } catch (error) {
      console.log(`Invalid Authorization token: ${error}`);
      res.status(401).json({ error: "Invalid Authorization token" });
      return;
    }
  } else {
    next();
  }
};

module.exports = {
  auth,
};
