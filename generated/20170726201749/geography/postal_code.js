var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true },
    country_id : { type: String, lowercase: true, ref: 'Country', required: true, trim: true },
    state_id : { type: String, lowercase: true, ref: 'State', required: true, trim: true },
    city_id : { type: String, lowercase: true, ref: 'City', required: true, trim: true },
    name : { type: String, required: true }
};

schema.index({
    country_id,
    state_id,
    city_id,
    name,
}, { unique: true });
schema.index({
    country_id,
}, { unique: false });
schema.index({
    state_id,
}, { unique: false });
schema.index({
    city_id,
}, { unique: false });

var model = mongoose.model('PostalCode', schema)

module.exports = model;