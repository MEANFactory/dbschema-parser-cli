var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id : { type: String, lowercase: true, required: true, trim: true, key: 'id', name: 'ID', maxLength: 7 },
    country_id : { type: String, lowercase: true, ref: 'Country', required: true, trim: true, name: 'Country ID', maxLength: 3 },
    state_id : { type: String, lowercase: true, ref: 'State', required: true, trim: true, name: 'State ID', maxLength: 3 },
    city_id : { type: String, lowercase: true, ref: 'City', required: true, trim: true, name: 'City ID', maxLength: 3 },
    name : { type: String, required: true, maxLength: 50 }
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