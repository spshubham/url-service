"use strict";

var express = require("express");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
const cors = require("cors");
require("./utils/job")
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serverPort = 8181;

const dbConnection = require("./models/db");
const writer = require("./utils/writer");


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return writer.writeJson(res, { error: "Invalid JSON: Malformed request body" }, 400);
  }else{
    next();
  }
});

// mongodb connection init
dbConnection.dbConnect();

const userRouter = require("./router/v1/router");
app.use("/v1", userRouter);

app.use("*", function (req, res) {
  res.status(404).send({
    error: "Resource not found"
  });
});

http.createServer(app).listen(serverPort, function () {
  console.log("Express server listening on port " + serverPort);
});
