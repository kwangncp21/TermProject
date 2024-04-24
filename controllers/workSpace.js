const workSpace = require("../models/workspace");

exports.getWorkspaces=async(req,res,next)=>{
    try{
        const workspaces = await workSpace.find();
        res.status(200).json({
            success:true,
            count:workspaces.length,
            data:workspaces
        });
    }catch(err){
        res.status(400).json({
            success:false
        });
    }
   
};

exports.getWorkspace=(req,res,next)=>{
    res.status(200).json({
        success:true,
        msg:`Show workspace ${req.params.id}`
    });
};

exports.createWorkspace=async(req,res,next)=>{
    const workspace = await workSpace.create(req.body);
    console.log(req.body);
    res.status(200).json({
        success:true,
        msg:`Create new workspace`
    });
};

exports.updateWorkspace=(req,res,next)=>{
    res.status(200).json({
        success:true,
        msg:`Update workspace ${req.params.id}`
    });
};

exports.deleteWorkspace=(req,res,next)=>{
    res.status(200).json({
        success:true,
        msg:`Delete workspace ${req.params.id}`
    });
};