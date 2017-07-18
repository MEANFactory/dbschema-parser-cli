var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true, key: 'id', name: 'ID', maxLength: 3 },
    country_id : { type: String, lowercase: true, ref: 'Country', required: true, trim: true, name: 'Country ID', maxLength: 3 },
    name : { type: String, required: true, maxLength: 50 }
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