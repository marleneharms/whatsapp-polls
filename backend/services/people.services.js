const People = require('../models/people.model');

async function index(callback){
    const people = await People.find();
    if(people != null){
        return callback(null, people);
    } else {
        return callback({
            message: 'No people found'
        });
    }
}

async function create(params, callback){
    if(params.name === undefined || params.phone === undefined || params.email === undefined){
        return callback({
            message: 'Name, Phone, and Email are required'
        });
    }

    const person = new People(params);
    person
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function show(id, callback){
    console.log({id});
    const person = await People.findById(id);
    if(person != null){
        return callback(null, person);
    } else {
        return callback({
            message: 'No person found'
        });
    }
}

async function remove(id, callback){
    const person = await People.findOneAndDelete(id);
    if(person != null){
        return callback(null, person);
    } else {
        return callback({
            message: 'No person found'
        });
    }
}

module.exports = {
    index,
    create,
    show,
    remove
};
