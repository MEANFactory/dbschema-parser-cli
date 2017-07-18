var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true, key: 'id', name: 'ID', maxLength: 3 },
    name : { type: String, required: true, maxLength: 50 }
};

schema.index({
    name,
}, { unique: true });

var model = mongoose.model('Country', schema)

module.exports = model;