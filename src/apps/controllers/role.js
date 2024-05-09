const UoW = require('../models/UoW');
const response = require('../responses/response');

exports.index = async (req, res) => {
    const data = await UoW.RoleModel.find();
    res.status(200).json(response.dataResponse(data));
}

exports.create = async (req, res) => {
    try {
        const name = req.body.name.toLowerCase();
        const description = req.body.description;
        await new UoW.RoleModel({ name, description }).save();
        res.status(201).json(response.commandResponse(`Create role ${name} successfully`));
    } catch (err) {
        res.status(400).json(response.exceptionResponse(`Role name exsting`));
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const name = req.body.name.toLowerCase();
        const description = req.body.description;
        const newRole = {name, description};
        await UoW.RoleModel.findByIdAndUpdate(id, newRole);
        res.status(200).json(response.commandResponse("Update role successfully"));
    } catch (err) {
        res.status(401).json(response.exceptionResponse(`Cant found role with id ${id} or role name existing`))
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await UoW.RoleModel.deleteOne({ _id: id });
        res.status(200).json(response.commandResponse(`Delete role ${id} successfully`));
    } catch (err) {
        res.status(401).json(response.exceptionResponse(`Cant found role with id ${id} or system has error`));
    }
}