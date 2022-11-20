const groupController = require('../controllers/group.controller');

const express = require('express');
const router = express.Router();

router.get('/:id', groupController.getGroupsById);
router.delete('/:id', groupController.deleteGroups);
router.get('/', groupController.getAllGroups);
router.post('/', groupController.createGroups);

module.exports = router;