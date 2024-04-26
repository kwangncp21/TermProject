const workSpace = require("../models/workSpace");

exports.getWorkspaces = async (req, res, next) => {
    try {
        const workspaces = await workSpace.find(req.query);
        console.log(req.query);
        res.status(200).json({
            success: true,
            count: workspaces.length,
            data: workspaces
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getWorkspace = async (req, res, next) => {
    try {
        const workspace = await workSpace.findById(req.params.id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                msg: "Sorry, no available workspace!"
            });
        }
        res.status(200).json({
            success: true,
            data: workspace
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.createWorkspace = async (req, res, next) => {
    try {
        const workspace = await workSpace.create(req.body);
        console.log(req.body);
        res.status(201).json({
            success: true,
            data: workspace
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}; // Added missing brace here

exports.updateWorkspace = async (req, res, next) => {
    try {
        const workspace = await workSpace.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!workspace) {
            return res.status(404).json({ success: false });
        }
        res.status(200).json({
            success: true,
            data: workspace
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.deleteWorkspace = async (req, res, next) => {
    try {
        const workspace = await workSpace.findByIdAndDelete(req.params.id);
        if (!workspace) {
            return res.status(404).json({ success: false, error: "Workspace not found." });
        }
        // Changed status code to 200 to allow a response body.
        res.status(200).json({ success: true, message: "Workspace deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

