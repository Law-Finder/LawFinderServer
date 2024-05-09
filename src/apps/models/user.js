const base = require('./base');
const mongoose = require('../../common/database')();

const UserSchema = new mongoose.Schema({
    ...base,
    account_id : {
        type: mongoose.Types.ObjectId,
        ref: "Accounts",
        required: true
    }
}, {timestamps: true});

const UserModel = mongoose.model('Users', UserSchema, 'users');

module.exports = UserModel;
