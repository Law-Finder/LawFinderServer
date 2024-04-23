const mongoose = require('../../common/database')();

const UserRoleSchema = new mongoose.Schema({
    account_id : {
        type : mongoose.Types.ObjectId,
        ref : "Accounts",
        required : true
    },
    role_id : {
        type : mongoose.Types.ObjectId,
        ref : "Roles",
        required : true
    }
}, {timestamps : true});

const UserRoleModel = mongoose.model("UserRoles", UserRoleSchema, "user_roles");

module.exports = UserRoleModel;