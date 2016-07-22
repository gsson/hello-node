const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

const static_path = require('hello-node-client').root

app.use(express.static(static_path));

app.listen(port, function () {
  console.log("serving stuff!");
});
