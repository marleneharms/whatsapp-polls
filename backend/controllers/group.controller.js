const groupService = require('../services/group.services');

exports.getAllGroups = (req, res, next) => {
    groupService.index((error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Groups Found',
            data: results,
        });
    });
}

exports.createGroups = (req, res, next) => {
    groupService.create(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(201).send({
            message: 'Group Created',
            data: results,
        });
    });
}

exports.getGroupsById = (req, res, next) => {
    groupService.show(req.params.id, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Group Found',
            data: results,
        });
    });
}

exports.deleteGroups = (req, res, next) => {
    groupService.remove(req.params.id, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(202).send({
            message: 'Deleted Successfully',
            data: results,
        });
    });
}