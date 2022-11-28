const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    people: [{ type: Schema.Types.ObjectId, ref: 'people' }],
});

GroupSchema.plugin(uniqueValidator, { message: 'Group name already in use.' });

const Group = mongoose.model('group', GroupSchema);
module.exports = Group;