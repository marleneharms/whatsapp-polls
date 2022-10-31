const bcrypt = require('bcryptjs');
const peopleServices = require('../services/people.services');

exports.getAllPeople = (req, res, next) => {
    peopleServices.index((error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'People Found',
            data: results,
        });
    });
};

exports.createPeople = (req, res, next) => {
    peopleServices.create(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(201).send({
            message: 'People Created',
            data: results,
        });
    });
};

exports.getPeopleById = (req, res, next) => {
    peopleServices.show(req.params.id, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'People Found',
            data: results,
        });
    });
};

exports.deletePeople = (req, res, next) => {
    peopleServices.remove(req.params.id, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(202).send({
            message: 'Deleted Successfully',
            data: results,
        });
    });
};
