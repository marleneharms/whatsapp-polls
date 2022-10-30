const pollsController = require("../controllers/poll.controller");

const express = require("express");
const router = express.Router();

router.get("/", pollsController.getAllPolls);

router.get("/testWhats", pollsController.testWhats);

module.exports = router;
