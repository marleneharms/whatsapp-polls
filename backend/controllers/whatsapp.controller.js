const whatsappServices = require('../services/whatsapp.services');

exports.sendPollToAll = (req, res, next) => {

    const { question, options, phoneNumbers } = req.body;

    if (question === undefined || options === undefined || phoneNumbers === undefined) {
        return next({
            message: 'Question, Options, and Phone are required'
        });
    }

    phoneNumbers.forEach((phone) => {
        whatsappServices.transmit(question, options, phone, (error, results) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json(results);
        });
    });
}