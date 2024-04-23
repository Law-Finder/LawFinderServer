const mongoose = require('../../common/database')();

const RoleShema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }
},{timestamps : true});

const RoleModel = mongoose.model("Roles", RoleShema, "roles");

module.exports = RoleModel;