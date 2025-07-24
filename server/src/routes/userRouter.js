const {Router} = require("express")
const userRouter = Router();
const prisma = require('../../prisma/client.js')
userRouter.get("/:user_name", async (req,res) => {
    const user_name = req.params.user_name

    try {
        const users = await prisma.user.findMany({
            where:{
                user_name:{
                    contains: user_name,
                    mode:"insensitive"
                }
            }
        })
        res.status(200).json(users)
    } catch (error) {
        console.error("Error searching user",error);
        res.status(500).json({error:"Failed to search user"});
    }
})

module.exports = userRouter