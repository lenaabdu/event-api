const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
 name: String,
    price: Number,
    location: String,
    date: String
})

module.exports.Ad = mongoose.model('Ad', adSchema)
