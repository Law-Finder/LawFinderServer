const base = require('./base');
const mongoose = require('../../common/database')();

const LawerSchema = new mongoose.Schema({
    ...base,
    certificate : {
        type: String,
        required: true,
    },
    profile : {
        type: String,
        required: true,
    },
    account_id : {
        type: mongoose.Types.ObjectId,
        ref: "Accounts",
        required: true
    }
},{timestamps : true});

const LawerModel = mongoose.model('Lawers', LawerSchema, 'lawers');

module.exports = LawerModel;