const { set } = require('express/lib/application');
const {PrismaClient} = require( '../../generated/prisma/index.js')
const prisma = new PrismaClient();

async function CreateGroup(req,res){
    const members = req.body
   
    try{
        const created = await prisma.group.create({
            data:{
                group_name: "group_name",
                members:{
                    create: members.map(m => ({
                        user : {connect: {user_id:m.user}}
                    })),
                },
            },

            include: {members : {include : {user:true}}}

        })

        return res.status(201).json(created);
    }catch(error){
        console.error("could not create group")
    }
}

async function updateGroupMembers(req,res){
    const {user,group_id} = req.body
    console.log(user)
    try {
        await prisma.group.update({
           where:{group_id:group_id},
           data:{
               members:{
                   create: {user:{connect:{user_id:user}}}
               }
           }
        })

       return res.status(200).json("group updated")
    }catch(error){
        console.error("Error updating group members", error);
        return res.status(500).json({ error: "Internal server error" });
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

        res.status(200).json({message:"Group deleted successfully"})
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

async function getAllGroups(req,res){
     const user_id = Number(req.params.user_id)
    try {

        const memberships = await prisma.groupMember.findMany({
            where:{user_id:user_id},
            select:{group_id:true}
        })

       

        const groupIds = memberships.map(m => m.group_id);
        console.log(groupIds)
        const groups = await prisma.group.findMany({
            where:{group_id:{in:groupIds}},
        })



        res.status(200).json(groups)
    } catch (error) {
        console.error("request failed")
        res.status(500).json({error:"could not find any groups"})
    }
}

module.exports = {
    CreateGroup,
    deleteGroup,
    updateName,
    updateGroupMembers,
    getAllGroups
}