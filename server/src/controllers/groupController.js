import{PrismaClient} from './generated/prisma'
const prisma = new PrismaClient();

async function CreateGroup(req,res){
    const {user_id} = req.user.user_id

    const {group_name} = req.body

    try {
        prisma.group.create({
            data:{
                group_name:group_name,
                members:{
                    create:{
                        connect:{user_id:user_id}
                    }
                }
            }
        })

    } catch (error) {
        console.error("Error creating group",error)
        res.status(500).json({error:"something went wrong"})
    }
}


module.exports = {
    CreateGroup
}