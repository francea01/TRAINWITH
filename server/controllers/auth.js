"use strict";

const { MongoClient } = require("mongodb");
const { isBodyValid } = require("../validators");
const jwt = require("jsonwebtoken");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signIn = async (req, res) => {
  const { MONGO_URI, JWT_KEY } = process.env;
  const { email, password } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const user = await db.collection("users").findOne({ email, password });

    if (user) {
      const token = jwt.sign(
        {
          userName: `${user.userName}`,
          firstName: `${user.firstName}`,
          lastName: `${user.lastName}`,
          userId: user._id,
        },
        JWT_KEY
      );
      res.status(200).json({ status: 200, token });
    } else {
      res.status(404).json({ status: 404, data: "not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: "sign in not ok" });
  } finally {
    client.close();
  }
};

const signUp = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { firstName, lastName, userName, email, password } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  const body = req.body;

  const errors = isBodyValid(body, [
    { name: "firstName" },
    { name: "lastName" },
    { name: "userName" },
    { name: "email", options: { pattern: "email" } },
    {
      name: "password",
      options: { maxLength: 15, minLength: 6 },
    },
  ]);

  if (errors.length > 0) {
    res.status(400).json({ status: 400, data: errors });
    return;
  }

  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db.collection("users").findOne({ email });
    if (result) {
      res.status(400).json({ status: 400, data: "user already exist" });
    } else {
      const newUser = await db
        .collection("users")
        .insertOne({ firstName, lastName, userName, email, password });

      res.status(200).json({ status: 200, data: newUser });
    }
  } catch (err) {
    res.status(500).json({ status: 500, data: "sign up not ok" });
  } finally {
    client.close();
  }
};

module.exports = {
  signIn,
  signUp,
};
