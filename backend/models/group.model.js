const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const People = require('./people.model');


const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    people: [ People.schema ],
});

GroupSchema.plugin(uniqueValidator, { message: 'Name already in use.' });

const Group = mongoose.model('group', GroupSchema);
module.exports = Group;