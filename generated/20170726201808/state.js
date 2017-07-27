var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true },
    country_id : { type: String, lowercase: true, ref: 'Country', required: true, trim: true },
    name : { type: String, required: true }
};

schema.index({
    country_id,
    name,
}, { unique: true });
schema.index({
    country_id,
}, { unique: false });

var model = mongoose.model('State', schema)

module.exports = model;