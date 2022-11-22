const groupController = require('../controllers/group.controller');

const express = require('express');
const router = express.Router();

router.get("/all", groupController.getAllGroups);
router.get('/:id', groupController.getGroupsById);
router.post("/create", groupController.createGroups);
router.delete('/:id/delete', groupController.deleteGroups);

module.exports = router;