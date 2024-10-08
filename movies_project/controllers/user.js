const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

exports.createUser = async (req, res) => {
    try {
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ success: true, msg: "User created successfully", data: user });
    } catch (error) {
        res.status(400).json({ success: false, msg: "User not created" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        let updateData = { ...req.body };

        // Hash the new password if it's being updated
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ success: false, msg: "No user found" });
        }
        res.status(200).json({ success: true, msg: 'User successfully updated', data: user });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).json({ success: true, msg: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Server error" });
    }
};
