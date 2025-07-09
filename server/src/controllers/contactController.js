const {PrismaClient} = require( '../../generated/prisma/index.js')
const prisma = new PrismaClient();

async function addContact(req,res){
    const user_id = req.user.user_id
    const {contact_id} = req.body

    try {
        await prisma.contact.create({
            data:{
                user:{connect:{user_id:user_id}},
                contact:{connect:{user_id:contact_id}},
                blocked:false
            }
        })

        res.json("contact added successfully")
    } catch (error){
        console.error("Error adding a contact",error)
        res.status(500).json({error:"failed to add a contact"})
    }
   
}

async function removeContact(req,res){
    const user_id = req.user.user_id
    const{contact_id} = req.body

    try {
        await prisma.contact.delete({
            where:{
                user_id_contact_id:{
                    user_id : user_id,
                    contact_id: contact_id
                }
            }
        })  
    } catch (error) {
        console.error("Error removing a contact",err)
        res.status(500).json({error:"failed to remove a contact"})
    }

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

async function updateContact(req,res){
    const user_id = req.user.user_id
    const {contact_id,blockedStatus} = req.body
    try{
       await prisma.contact.update({
           where:{
               user_id_contact_id:{
                   user_id:user_id,
                   contact_id:contact_id
               }
           },
           data:{
               blocked:!blockedStatus
           }
       })
    }catch(err){
        console.error("Error blocking contact",err)
        res.status(500).json({error:"failed to block contact"})
    }    
}

module.exports = {addContact,removeContact,readContact,updateContact}
