var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true },
    state_id : { type: String, lowercase: true, ref: 'State', required: true, trim: true },
    name : { type: String, required: true }
};

schema.index({
    state_id,
    name,
}, { unique: true });
schema.index({
    state_id,
}, { unique: false });

var model = mongoose.model('City', schema)

module.exports = model;