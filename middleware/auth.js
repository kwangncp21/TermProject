const jwt = require('jsonwebtoken');
const User = require('../models/User');

//protect route
exports.protect = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    //Make sure token exists
    if(!token){
        return res.status(401).json(
            {
                success: false, 
                message: 'Token is not exist,Not authorized to access this route'
            }
        );
    }
    try{
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        // Attach user to the request object
        req.user = await User.findById(decoded.id);
        if(!req.user){
            return res.status(401).json({ success: false, message: "No user found with this token" });
        }

        next();
    }catch (error) {
        return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
};

//Grant access to specific roles
exports.authorize = (...roles) => {
    // console.log("start authorize")
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json(
                {
                    success: false,
                    message: `User role ${req.user.role} is not authorized to access this route`
                }
            );
        }
        next();
    }
};