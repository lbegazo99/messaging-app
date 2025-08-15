const prisma = require('../../prisma/client.js')

async function getAllUserMessages(req,res) {
    const user_id = req.user.user_id;

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
}

async function getRecentMessages(req,res){
    const user_id = req.user.user_id;
    try{
        const recentMessages = await prisma.$queryRaw
        `
        SELECT DISTINCT ON (
            LEAST(m."sender_id", m."receiver_id"),
            GREATEST(m."sender_id", m."receiver_id")
          ) 
            m.*,
            sender."user_name" AS sender_name,
            receiver."user_name" AS receiver_name
          FROM "Message" m
          JOIN "User" sender ON sender."user_id" = m."sender_id"
          JOIN "User" receiver ON receiver."user_id" = m."receiver_id"
          WHERE m."sender_id" = ${user_id} OR m."receiver_id" = ${user_id}
          ORDER BY
            LEAST(m."sender_id", m."receiver_id"),
            GREATEST(m."sender_id", m."receiver_id"),
            m."sentAt" DESC;
      `;

      res.status(200).json(recentMessages)
    }catch(error){
        console.error("error finding messages",error);
        res.status(500).json({error:"failed to find messages"})
    }
}

async function getGroupMessages(req,res){
    const group_id = req.params.group_id;

    try {
        const group_messages = await prisma.groupMessages.findMany({
            where:{
                group_id:group_id
            },
            include:{
                user_id,
                content
            }
        })

        res.status(200).json(group_messages)
    } catch (error) {
        console.error("error finding messages",error);
        res.status(500).json({error:"failed to find messages"})
    }
    
}

async function sendGroupMessage(req,res){
    const {group_id,user_id,content} = req.body

    try{
        await prisma.groupMessages.create({
            data:{
                group_id:group_id,
                user_id:user_id,
                content:content
            }
        })

        res.status(200).json("message sent")
    }catch(error){
        console.error("error")
    }
}
module.exports = {
    getAllUserMessages,
    sendUserMessages,
    displayMessages,
    getRecentMessages,
    getGroupMessages,
    sendGroupMessage
}