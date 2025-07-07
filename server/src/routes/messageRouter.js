const {Router} = require("express")

const messageRouter = Router();

messageRouter.get("/",getAllUserMessages);

messageRouter.post("/send/:recieverid",sendMessage);

messageRouter.get("/:senderid",displayMessages);

module.exports = messageRouter;

