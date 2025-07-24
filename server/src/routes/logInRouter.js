require('dotenv').config()
const {Router} = require("express");
const jwt = require("jsonwebtoken")
const logInRouter = Router();
const prisma = require('../../prisma/client.js')
const bcrypt = require('bcrypt');

logInRouter.post('/', async (req,res) => {
    const {user_name,password} = req.body;
   try{
       const user = await prisma.user.findUnique({
           where:{user_name} 
       });
       if(!user){
           return res.status(400).send('Cannot find user')
       }

       const validPassword = await bcrypt.compare(password,user.password)

       if(!validPassword){
           return res.status(403).send('Not Allowed')
       }

    const access_token = generateAccessToken(user);
    res.status(201).json({access_token})

   }catch(err){
    console.error('Login error:', err);
    res.status(500).send('Internal server error');
   }
})


function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
}

module.exports = logInRouter