const express = require("express")
const app = express();

const{authenticateToken} = require("./middleware/authMiddleware");
const messageRouter = require("./routes/messageRouter");
const signUpRouter = require("./routes/signUpRouter");
const groupRouter = require("./routes/groupRouter");


app.use("/messages",authenticateToken,messageRouter)
app.use("/signUp",signUpRouter)
app.use("/group",groupRouter)
app.use("/",indexRouter)

