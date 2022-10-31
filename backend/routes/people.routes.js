const peopleController = require('../controllers/people.controller');

const express = require('express');
const router = express.Router();

router.get('/:id', peopleController.getPeopleById);
router.delete('/:id', peopleController.deletePeople);
router.get('/', peopleController.getAllPeople);
router.post('/', peopleController.createPeople);

module.exports = router;
