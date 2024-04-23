const jwt = require('jsonwebtoken');
const User = require('../models/User');

//protect route
exports.protect = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    //Make sure token exists
    if(!token || token=='null'){
        return res.status(401).json(
            {
                success: false, 
                message: 'Not authorized to access this route1'
            }
        );
    }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

        req.user = await User.findById(decoded.id);
        console.log(req.user)
        next();

    }catch(err){
        console.log(err.stack);
        return res.status(401).json(
            {
                success: false, 
                message: 'Not authorized to access this route2'
            }
        );
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