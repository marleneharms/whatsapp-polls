const whatsappController = require('../controllers/whatsapp.controller');

const express = require('express');
const router = express.Router();

router.post('/send-poll-to-all', whatsappController.sendPollToAll);

module.exports = router;