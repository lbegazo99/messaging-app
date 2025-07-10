const prisma = require('../../prisma/client.js')

async function getAllUserMessages(req,res) {
    const {user_id} = req.user.user_id;

    const messages = await prisma.messages.findMany({
        where:{
            receiverId: user_id,
        },
        include:{
            sender:{
                select:{
                user_id: true,
                user_name: true,
                first_name: true,
                last_name: true,
                profile_picture: true,
                }
            }
        }
    })

    res.json(messages)
}

async function sendUserMessages(req, res) {
    try {
        const sender_id = req.user.user_id;
        const receiver_id = parseInt(req.params.receiver_id);
        const { content } = req.body;

      const message = await prisma.message.create({
        data: {
          sender_id: sender_id,
          receiver_id: receiver_id,
          content: content
        }
      });
  
      res.status(201).json(message);
    } catch (err) {
      console.error("error sending message", err);
      res.status(500).json({ error: "failed to send message" });
    }
  }

async function displayMessages(req,res){
    const user_id = req.user.user_id;
    const sender_id = parseInt(req.params.other_user)
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        sender_id: user_id,
                        receiver_id: sender_id
                        
                    },
                    {
                        sender_id: sender_id,
                        receiver_id: user_id
                    }
                ]
            },
        })

        res.status(200).json(messages)
    } catch (error) {
        console.error("error finding messages",error);
        res.status(500).json({error:"failed to find messages"})
    }

    res.json(messages)
}
module.exports = {
    getAllUserMessages,
    sendUserMessages,
    displayMessages
}