require('dotenv').config()
const express = require("express")
const app = express();

app.use(express.json())

const{authenticateToken} = require("./middleware/authMiddleware");
const messageRouter = require("./routes/messageRouter");
const signUpRouter = require("./routes/signUpRouter");
const groupRouter = require("./routes/groupRouter");
const contactRouter = require("./routes/contactRouter");
const loginRouter = require("./routes/logInRouter")


app.use("/messages",authenticateToken,messageRouter)
app.use("/signup",signUpRouter)
app.use("/group",authenticateToken,groupRouter)
app.use("/contact",authenticateToken,contactRouter)
app.use('/login',loginRouter)


app.listen(3000)