"use strict";

const { MongoClient } = require("mongodb");
const { areStringValuesValid } = require("../validators");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this data. Changes will persist until the server (backend) restarts.

const signIn = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { email, password } = req.body;
  console.log(MONGO_URI);
  console.log({ email, password });
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db.collection("users").findOne({ email, password });
    console.log(result);

    result
      ? res.status(200).json({ status: 200, data: "ok" })
      : res.status(404).json({ status: 404, data: "not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: "not ok" });
  } finally {
    client.close();
  }
};

const signUp = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { firstName, lastName, userName, email, password } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  const body = req.body;

  const errors = areStringValuesValid([
    { propertyName: "firstName", body },
    { propertyName: "lastName", body },
    { propertyName: "userName", body },
    { propertyName: "email", body, options: { pattern: "email" } },
    {
      propertyName: "password",
      body,
      options: { maxLength: 10, minLength: 8 },
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
    res.status(500).json({ status: 500, data: "not ok" });
  } finally {
    client.close();
  }
};

module.exports = {
  signIn,
  signUp,
};
