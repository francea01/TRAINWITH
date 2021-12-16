"use strict";

const { MongoClient, ObjectId } = require("mongodb");
const { isBodyValid } = require("../validators");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createMeeting = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { sport, players, address, author, date, time, notes, userId } =
    req.body;
  const errors = isBodyValid(req.body, [
    { name: "sport" },
    { name: "players" },
    { name: "address" },
    { name: "date" },
  ]);
  if (errors.length > 0) {
    res.status(400).json({ status: 400, errors });
    return;
  }

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db.collection("meetings").insertOne({
      createdAt: new Date().toLocaleString(),
      author,
      sport: sport.toLowerCase(),
      maxPlayers: Number(players),
      address,
      date,
      time,
      notes,
      userId,
      signers: [],
      comments: [],
    });

    const newMeeting = await db
      .collection("meetings")
      .findOne({ _id: result.insertedId });
    res.status(201).json({ status: 201, data: newMeeting });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "An error as occured during meeting creation",
    });
  } finally {
    client.close();
  }
};

const patchMeetingSigners = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { userId, meetingId } = req.body;

  const errors = isBodyValid(req.body, [{ name: "meetingId" }]);
  if (errors.length > 0) {
    res.status(400).json({ status: 400, errors });
    return;
  }

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const meeting = await db
      .collection("meetings")
      .findOne({ _id: ObjectId(meetingId) });

    let signers = [...meeting.signers];

    if (meeting.signers.includes(userId)) {
      signers = signers.filter((signer) => signer !== userId);

      await db
        .collection("meetings")
        .updateOne({ _id: ObjectId(meetingId) }, { $set: { signers } });
      res.status(201).json({ status: 201, added: "participation removed" });
    } else if (meeting.signers.length < meeting.maxPlayers) {
      signers.push(userId);

      await db
        .collection("meetings")
        .updateOne({ _id: ObjectId(meetingId) }, { $set: { signers } });
      res.status(201).json({ status: 201, data: "participation added" });
    } else {
      res.status(403).json({
        status: 403,
        error: "The capacity of players is already full",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "An error as occured during the signers update",
    });
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
    const result = await db
      .collection("meetings")
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(500).json({ status: 500, data: "get meetings not ok" });
  } finally {
    client.close();
  }
};

const getProfileMeetings = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { userId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db
      .collection("meetings")
      .find({
        $or: [
          { userId },
          {
            signers: {
              $in: [userId],
            },
          },
        ],
      })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: "get profile meetings not ok" });
  } finally {
    client.close();
  }
};

const getMeetingsByCategory = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { sport } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("TrainWith");
    const result = await db
      .collection("meetings")
      .find({ sport: sport.toLowerCase() })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, data: "get meetings by category not ok" });
  } finally {
    client.close();
  }
};

const addComment = async (req, res) => {
  const { MONGO_URI } = process.env;
  const { meetingId, comment, author } = req.body;

  const errors = isBodyValid(req.body, [
    { name: "meetingId" },
    { name: "comment" },
    { name: "author" },
  ]);
  if (errors.length > 0) {
    res.status(400).json({ status: 400, data: errors });
    return;
  }

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    const meeting = await db
      .collection("meetings")
      .findOne({ _id: ObjectId(meetingId) });
    const comments = [...meeting.comments];
    const newComment = {
      createdAt: new Date().toLocaleString(),
      comment,
      author,
    };

    comments.push(newComment);

    await db
      .collection("meetings")
      .updateOne({ _id: ObjectId(meetingId) }, { $set: { comments } });
    res.status(201).json({ status: 201, data: newComment });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: "An error as occured during adding comments",
    });
  } finally {
    client.close();
  }
};

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingsByCategory,
  patchMeetingSigners,
  addComment,
  getProfileMeetings,
};
