const Group = require('../models/group.model');

async function index(callback){
    const groups = await Group.find().populate('people')
    if(groups != null){
        return callback(null, groups);
    } else {
        return callback({
            message: 'No groups found'
        });
    }
}

async function create(params, callback){
    if(params.name === undefined){
        return callback({
            message: 'Name is required'
        });
    }

    const group = new Group(params);
    group
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function show(id, callback){
    const group = await Group.findById(id);
    if(group != null){
        return callback(null, group);
    } else {
        return callback({
            message: 'No group found'
        });
    }
}

async function remove(id, callback){
    const group = await Group.findOneAndDelete(id);
    if(group != null){
        return callback(null, group);
    } else {
        return callback({
            message: 'No group found'
        });
    }
}

module.exports = {
    index,
    create,
    show,
    remove
};