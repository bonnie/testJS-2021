const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// CORS for react app, assuming port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// use middleware to serve static images
app.use(express.static("public"));

// read data from options file
const todaysFlavorsRaw = fs.readFileSync("./todays-flavors.json", "utf-8");
const todaysFlavors = JSON.parse(todaysFlavorsRaw);

app.get("/flavors", (req, res) => {
  // return data from file
  res.json(todaysFlavors);
});

if (require.main === module) {
  app.listen(3030, () =>
    console.log("Ice cream server listening on port 3030!")
  );
}

module.exports = app;
