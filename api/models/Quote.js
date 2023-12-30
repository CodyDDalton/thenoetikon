const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    author: {
        type: String,
        required: false,
    },
    speaker: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    gen_src: {
        type: String,
        required: true,
    },
    exact_src: {
        type: String,
        required: false,
    },
    era: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Quote', quoteSchema);