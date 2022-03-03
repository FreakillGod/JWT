const jwt=require('jsonwebtoken');

const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware= async (req,res,next)=>{

    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('not valid token check token')
    }

    const token=authHeader.split(' ')[1]
    // console.log(token)
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const {id,username}=decoded;
        req.user={id,username};
        next()

        // console.log(decoded)

    } catch (error) {
        throw new UnauthenticatedError('not able to verify the token')
    }


}

module.exports=authenticationMiddleware;