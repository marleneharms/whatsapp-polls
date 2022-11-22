const whatsappController = require('../controllers/whatsapp.controller');

const express = require('express');
const router = express.Router();

router.post('/send-poll-to-all', whatsappController.sendPollToAll);
router.post('/webhook', whatsappController.webhook);

module.exports = router;