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
        // const token = user.getSignedJwtToken();
        // res.status(200).json({success:true});
        sendTokenResponse(user,200,res);

    }catch(err){
        res.status(400).json({success:false});
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


    // return res.status(401).json({success:false,msg:'Cannot convert email or password to string'});

    //Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success:true,token});
    // console.log(res.getHeaders());
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