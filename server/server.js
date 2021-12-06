const path = require("path");
const express = require("express");
require("dotenv").config();
const { signIn, signUp } = require("./controllers/auth");
const { createMeeting, getMeetings } = require("./controllers/meetings");
const { auth } = require("./middlewares/auth.middleware");

const PORT = 8000;

express()
  .use(express.json())
  .use(auth)

  .post("/public/sign-in", signIn)
  .post("/public/sign-up", signUp)

  .post("/private/meeting", createMeeting)
  .get("/private/meetings", getMeetings)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    console.log("NOT FOUND");
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });

// in progress
