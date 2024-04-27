const User = require('../models/User');

exports.register= async (req,res,next)=>{
    try{
        const {name,telephone,email,password,role} = req.body;

        //create uder to the database
        const user = await User.create({
            name,
            telephone,
            email,
            password,
            role
        });
        sendTokenResponse(user,200,res);

    }catch(err){
        res.status(400).json({success:false,error:err.stack.split('\n')[0]});
        console.log(err.stack);
    }
}

const sendTokenResponse = (user,statusCode,res)=>{
    //create token
    const token = user.getSignedJwtToken();

    const options = {
        expire:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV==='production'){
        options.secure=true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token
        // data:{
        //add for frontend
        // _id:user.id,
        // name: user.name,
        // email: user.email,
        // role: user.role,
        //end for frontend
        // token
        // }
    })
}

exports.login = async(req,res,next)=>{
    const {email,password} = req.body;

    //Validate email & password
    if(!email || !password){
        return res.status(400).json({success:false,msg:'Please provide an email and password'});
    }
    //check for user
    const user=await User.findOne({email}).select('+password');
    
    if(!user){
        return res.status(400).json({success:false,msg:'Invalid credentials'});
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({success:false,msg:'Invalid credentials'});
    }
    // res.status(200).json({
    //     success:true,
    //     data:user,
    // });
    const sendTokenResponse = (user, statusCode, res) => {
        // Generate token (using JWT in this example)
        const token = user.getSignedJwtToken();  // This method should be defined in your User model
    
        res
            .status(statusCode)
            .cookie('token', token)
            .json({
                success: true,
                token,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
};
sendTokenResponse(user,200,res);
};

exports.getMe = async(req,res,next)=>{
    const user= await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        data:user
    });
};

exports.logout = async(req,res,next)=>{
    res.cookie('token','none',{
        expires: new Date(Date.now()+ 10*1000),
        httpOnly:true
    });
    try{
    res.status(200).json({
        success:true,
        msg:'logout successfully',
        data:{}
    });
}catch(err){
    res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Optionally, add additional authorization checks here to ensure the user has rights to delete the user

        // Delete the user
        await user.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'User successfully deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete the user'
        });
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});  // Retrieve all users from the database

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users'
        });
    }
};