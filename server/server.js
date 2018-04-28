const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const recentCities = [{ name: "Logan" }];

app.get("/api/recentCities", (req, res) => {
  res.status(201).send(recentCities);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
