const RoleModel = require('../models/role');
const response = require('../responses/response');
const logger = require('../../common/logger');

exports.index = async (req, res) => {
    const data = await RoleModel.find();
    res.status(200).json(response.dataResponse(data));
}

exports.create = async (req, res) => {
    try {
        const name = req.body.name.toLowerCase();
        const description = req.body.description;
        await new RoleModel({ name, description }).save();
        res.status(201).json(response.commandResponse(`Create role ${name} successfully`));
    } catch (err) {
        res.status(400).json(response.exceptionResponse(`Role name exsting`));
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name.toLowerCase();
        const description = req.body.description;
        await RoleModel.findByIdAndUpdate(id, newRole);
        res.status(200).json(response.commandResponse("Update role successfully"));
    } catch (err) {
        res.status(401).json(response.exceptionResponse(`Cant found role with id ${id} or role name existing`))
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await RoleModel.deleteOne({ _id: id });
        res.status(200).json(response.commandResponse(`Delete role ${id} successfully`));
    } catch (err) {
        res.status(401).json(response.exceptionResponse(`Cant found role with id ${id} or system has error`));
    }
}