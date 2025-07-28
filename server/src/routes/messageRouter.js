const {Router} = require("express")

const messageRouter = Router();

const {getAllUserMessages,sendUserMessages,displayMessages,getRecentMessages} = require( "../controllers/messageController")

messageRouter.get("/",getAllUserMessages);

messageRouter.post("/send/:receiver_id", sendUserMessages);

messageRouter.get("/getconvo/:other_user",displayMessages);

messageRouter.get("/recentMessages",getRecentMessages);

module.exports = messageRouter;

