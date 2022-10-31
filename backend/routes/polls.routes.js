const pollsController = require("../controllers/poll.controller");

const express = require("express");
const router = express.Router();

router.get("/all", pollsController.getAllPolls);
router.get("/:id", pollsController.getPollById);
router.post("/create", pollsController.createPoll);
router.delete("/:id/delete", pollsController.deletePoll);

router.get("/testWhats", pollsController.testWhats);

module.exports = router;
