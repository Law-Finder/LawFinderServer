const mongoose = require('../../common/database')();

const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email address',
        },
      },
    password : {
        type: String,
        required: true
    },
    active : {
        type: Boolean,
        default: false
    },
    active_by_admin : {
        type: Boolean,
        default: false
    },
    public_key : {
        type: String,
    },
    status : {
        type: Boolean
    }
}, {timestamps : true});

const AccountModel = mongoose.model('Accounts', AccountSchema, "accounts");

module.exports = AccountModel;