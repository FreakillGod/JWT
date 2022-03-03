require('dotenv')
const jwt=require('jsonwebtoken');
const { BadRequest } = require('../errors');


const login = async(req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        throw new BadRequest('username and passwords undefined');
        // res.send('false route')
    }

    const id=new Date().getDay();

    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    
    res.status(200).json({msg:'user created',token})
}


const dashboard= async (req,res)=>{
    console.log(req.user)
    
    const luckyNumber=Math.floor(Math.random()*100);

    res.status(200).json({msg:`hello ${req.user.username}`,secret:`here is yo ur no ${luckyNumber}`})
    
}


module.exports={login,dashboard}