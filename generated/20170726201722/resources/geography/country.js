var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true },
    name : { type: String, required: true }
};

schema.index({
    name,
}, { unique: true });

var model = mongoose.model('Country', schema)

module.exports = model;