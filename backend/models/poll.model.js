const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const PollSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    phoneNumbers: [
        {
            type: String,
            required: true,
        },
    ],
    date: {
        type: Date,
        default: Date.now(),
    },
});

PollSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.phoneNumbers;
    },
});

PollSchema.plugin(uniqueValidator, { message: 'Title already in use.' });

const Poll = mongoose.model('poll', PollSchema);
module.exports = Poll;
