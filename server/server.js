const path = require("path");
const express = require("express");
require("dotenv").config();
const { signIn, signUp } = require("./controllers/auth");

const PORT = 8000;

express()
  .use(express.json())

  .post("/sign-in", signIn)
  .post("/sign-up", signUp)

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
