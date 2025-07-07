import {PrismaClient} from './generated/prisma'
const prisma = new PrismaClient();

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

async function sendUserMessages(req,res){
    const {user_id} = req.user.user_id;
    const {receiver_id} = parseInt(req.params.receiver_id)
    const{content} = req.body;

    try {
        const message = await prisma.message.create({
            data:{
                user_id,
                receiver_id,
                content
            }
        })

        res.status(201).json(message);
    } catch (err) {
        console.error("error sending message",err);
        res.status(500).json({error:"failed to send message"});
    }
}

async function displayMessages(req,res){
    const {user_id} = req.user.user_id;
    const {sender_id} = parseInt(req.params.sender_id)

    try {
        const messages = await prisma.message.findMany({
            where:{
                sender_id:sender_id,
                receiver_id:user_id
            }
        })


    } catch (error) {
        console.error("error finding messages",err);
        res.status(500).json({error:"failed to find messages"})
    }

    res.json(messages)
}
module.exports = {
    getAllUserMessages,
    sendUserMessages,
    displayMessages
}