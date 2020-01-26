const express = require("express");
const router = express.Router();
const config = require("config");
const request = require("request");
var bodyParser = require("body-parser");

// @route  POST api/locator
// @desc   Searching google places api with search param
// @access Public
router.post("/", async (req, res) => {
  try {
    const search = req.body.searching;
    const options = {
      uri: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}+point+of+interest&language=en&key=${config.get(
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

      const options2 = {
        uri: `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=${config.get(
          "googleKey"
        )}`,
        method: "GET",
        headers: { "user-agent": "node.js" }
      };

      request(options2, (error, response, body) => {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
          response.status(404).json({ msg: "No city found" });
        }
        console.log(body);
      });

      res.json(body);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
