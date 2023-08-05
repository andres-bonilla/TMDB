const express = require("express"),
  movie = require("./movie"),
  person = require("./person"),
  search = require("./search"),
  data = require("./data"),
  tv = require("./tv"),
  user = require("./user");

const router = express.Router();

router.use("/movie", movie);
router.use("/person", person);
router.use("/search", search);
router.use("/data", data);
router.use("/tv", tv);
router.use("/user", user);

module.exports = router;
