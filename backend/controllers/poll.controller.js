const pollServices = require('../services/poll.services');

const dummyPhones = ['523333549944', '523333864523', '523317072870', '523315997504']

exports.getAllPolls = (req, res, next) => {
    pollServices.index((err, polls) => {
        if (err){
            return next(err);
        }
        return res.status(200).send({
            message: 'Polls Found',
            data: polls,
        });
    });
};

exports.getPollById = (req, res, next) => {
    pollServices.show(req.params.id, (err, results) => {
        if (err){
            return next(err);
        }
        return res.status(200).send({
            message: 'Poll Found',
            data: results,
        });
    });
};

exports.createPoll = (req, res, next) => {
    pollServices.create(req.body, (err, results) => {
        if (err){
            return next(err);
        }
        return res.status(201).send({
            message: 'Poll Created',
            data: results,
        });
    });
};

exports.deletePoll = (req, res, next) => {
    pollServices.remove(req.params.id, (err, results) => {
        if (err){
            return next(err);
        }
        return res.status(202).send({
            message: 'Deleted Successfully',
            data: results,
        });
    });
};

exports.testWhats = (req, res, next) => {
    for (let index = 0; index < dummyPhones.length; index++) {

    }
    res.status(200).json("Messages Sent");
};
