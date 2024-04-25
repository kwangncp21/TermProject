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

exports.getWorkspace=async(req,res,next)=>{
    try{
        const workspace = await workSpace.findById(req.params.id);
        if(!workspace){
            return res.status(400).json({
                success:false,
                msg:"Sorry,no available workspace!"
            });
        }
        res.status(200).json({
            success:true,
            data:workspace
        });
    }catch(err){
        res.status(400).json({success:false});
    }
    
};

exports.createWorkspace=async(req,res,next)=>{
    const workspace = await workSpace.create(req.body);
    console.log(req.body);
    res.status(200).json({
        success:true,
        data:workspace
    });
};

exports.updateWorkspace=async(req,res,next)=>{
    try{
        const workspace = await workSpace.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators:true
        });
        if(!workspace){
            return res.status(400).json({success:false});
    }
    res.status(200).json({
        success:true,
        data:workspace
    });
    }catch(err){
        res.status(400).json({success:false});
    }
};

exports.deleteWorkspace=async(req,res,next)=>{
    try{
        const workspace = await workSpace.findByIdAndDelete(req.params.id);
        if(!workspace){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:{}});
    }catch(err){
        res.status(400).json({success:false});
    }
};