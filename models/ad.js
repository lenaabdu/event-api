const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    title: String,
    Date: String,
    description: String,
    markdown: String,
})

module.exports.Ad = mongoose.model('Ad', adSchema)