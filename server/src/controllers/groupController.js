const {PrismaClient} = require( '../../generated/prisma/index.js')
const prisma = new PrismaClient();

async function CreateGroup(req,res){
    const user_id = req.user.user_id

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

async function deleteGroup(req,res){
    const {group_id} = req.body

    try{
        await prisma.groupMember.deleteMany({
            where:{group_id:group_id}
        })
        await prisma.group.delete({
            where:{
                group_id:group_id
            }
        })

        res.status(200).json({message:"Groupd deleted successfully"})
    }catch(error){
        console.error("Error deleting group",error)
        res.status(500).json({error:"could not delete the group"})
    }
}

async function updateName(req,res){
    const {group_id,newName} = req.body

    try{
        await prisma.group.update({
            where:{group_id: group_id},
            data:{name:newName}
        })
    }catch(error){
        console.error("failed to update group name")
        res.status(500).json({error:"could not update group's name"})
    }
}

module.exports = {
    CreateGroup,
    deleteGroup,
    updateName
}