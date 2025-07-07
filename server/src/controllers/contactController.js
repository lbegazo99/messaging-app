import PrismaClient from './generated/prisma'
const prisma = new PrismaClient();

async function addContact(req,res){
    const user_id = req.user.user_id
    const{contact_id} = req.body

    await prisma.contact.create({
        data:{
            user:{connect:{user_id:user_id}},
            contact:{connect:{user_id:contact_id}},
            blocked:false
        }
    })
}

async function removeContact(req,res){
    const user_id = req.user.user_id
    const{contact_id} = req.body

    await prisma.contact.delete({
        where:{
            user_id_contact_id:{
                user_id : user_id,
                contact_id: contact_id
            }
        }
    })
}


async function readContact(req,res){
    const user_id = req.user.user_id
    try{
        const contacts = await prisma.contact.findMany({
            where:{
                user_id:user_id
            },
            include:{
                contact:true
            }
        })

        res.json(contacts);
    }catch(err){
        console.error("Error reading contacts",err)
        res.status(500).json({error:"failed to fetch contacts"})
    }
}

module.exports = {addContact,removeContact,readContact}
