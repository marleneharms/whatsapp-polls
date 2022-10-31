const Poll = require('../models/poll.model');

async function index(callback){
    const polls = await Poll.find();
    if(polls != null){
        return callback(null, polls);
    } else {
        return callback({
            message: 'No polls found'
        });
    }
}

async function create(params, callback){
    const {title, question, options, phoneNumbers} = params;
    if(title === undefined || question === undefined || options === undefined || phoneNumbers === undefined){
        return callback({
            message: 'Title, Question, Options, and Phone Numbers are required'
        });
    }

    const poll = new Poll(params);
    poll
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function show(id, callback){
    const poll = await Poll.findById(id);
    if(poll != null){
        return callback(null, poll);
    } else {
        return callback({
            message: 'No poll found'
        });
    }
}

async function remove(id, callback){
    const poll = await Poll.findOneAndDelete(id);
    if(poll != null){
        return callback(null, poll);
    } else {
        return callback({
            message: 'No poll found'
        });
    }
}

module.exports = {
    index,
    create,
    show,
    remove
};
