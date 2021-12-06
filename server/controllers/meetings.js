"use strict";

const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createMeeting = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { sport, players, address, date, notes, userId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db
      .collection("meetings")
      .insertOne({ sport, players, address, date, notes, userId });
    res.status(201).json({ status: 201, data: result });
  } catch (err) {
    res.status(500).json({ status: 500, data: "get users not ok" });
  } finally {
    client.close();
  }
};

const getMeetings = async (req, res) => {
  const { MONGO_URI } = process.env;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db.collection("meetings").find().toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(500).json({ status: 500, data: "get meetings not ok" });
  } finally {
    client.close();
  }
};

module.exports = { createMeeting, getMeetings };
