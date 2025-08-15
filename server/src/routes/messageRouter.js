const {Router} = require("express")

const messageRouter = Router();

const {getAllUserMessages,sendUserMessages,displayMessages,getRecentMessages,getGroupMessages,sendGroupMessage} = require( "../controllers/messageController")

messageRouter.get("/",getAllUserMessages);

messageRouter.post("/send/:receiver_id", sendUserMessages);

messageRouter.get("/getconvo/:other_user",displayMessages);

messageRouter.get("/recentMessages",getRecentMessages);

messageRouter.get("/:group_id",getGroupMessages);

messageRouter.post("/:group_id",sendGroupMessage);

module.exports = messageRouter;

