const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const app = express();

const logInRouter = require("./routes/logInRouter");
app.use(express.json())


app.post('/token',(req,res) =>{
    
})

app.delete('/logout',(req,res) => {
   
})
app.use("/logIn",logInRouter)

