require('dotenv').config()
const {Router} = require("express");
const jwt = require("jsonwebtoken")
const logInRouter = Router();
const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

logInRouter.post('/login', async (req,res) => {
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
    const refreshToken = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name },
      process.env.REFRESH_TOKEN_SECRET
    );

    res.json({ access_token, refreshToken });

   }catch(error){
    console.error('Login error:', error);
    res.status(500).send('Internal server error');
   }
})

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '10m'})
}

module.exports = logInRouter