const { MongoClient, ObjectId } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsersInfo = async (req, res) => {
  const { MONGO_URI } = process.env;
  let { userIds } = req.query;
  userIds = userIds.split(",").map((userId) => ObjectId(userId));

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("TrainWith");
    let users = await db
      .collection("users")
      .find({ _id: { $in: userIds } })
      .toArray();

    users = users.map((user) => {
      return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
      };
    });

    if (users) {
      res.status(200).json({ status: 200, users });
    } else {
      res.status(404).json({ status: 404, data: "not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, err });
  } finally {
    client.close();
  }
};

module.exports = {
  getUsersInfo,
};
