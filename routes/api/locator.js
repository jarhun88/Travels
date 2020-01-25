const express = require("express");
const router = express.Router();
const config = require("config");
const request = require("request");
var bodyParser = require("body-parser");

// @route  GET api/locator
// @desc   Test route
// @access Public
router.get("/", async (req, res) => {
  try {
    const options = {
      uri: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=toyko+point+of+interest&language=en&key=${config.get(
        "googleKey"
      )}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        response.status(404).json({ msg: "No city found" });
      }

      res.json(body);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
