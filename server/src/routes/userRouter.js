const {Router} = require("express");
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

userRouter.post("/profile/:user_id",async(req,res) => {
    try{
        const user_id = parseInt(req.params.user_id);
        const {profession,location,employer,skills} = req.body;

        const info = await prisma.userInfo.update({
            where:{user_id},
            data:{
              Profession:profession,
              Location:location,
              Employer:employer,
              Skills:skills
            }
          })

        res.status(200).json(info)
    }catch(err){
        console.error("error sending message", err);
        res.status(500).json({ error: "failed post info" });
    }
})

userRouter.post("/profile/aboutMe/:user_id",async(req,res) => {
    try{
        const user_id = parseInt(req.params.user_id);
        const {aboutMe} = req.body;

        const info = await prisma.userInfo.update({
          where:{user_id},
          data:{
            AboutMe:aboutMe
          }
        })

        res.status(200).json(info)
    }catch(err){
        console.error("error sending message", err);
        res.status(500).json({ error: "failed post info" });
    }
})

userRouter.post("/profile/employer/:user_id",async(req,res) => {
    try{
        const user_id = parseInt(req.params.user_id);
        const {employer} = req.body;

        const info = await prisma.userInfo.update({
          where:{user_id},
          data:{
            Employer:employer
          }
        })

        res.status(200).json(info)
    }catch(err){
        console.error("error sending message", err);
        res.status(500).json({ error: "failed post info" });
    }
})

  userRouter.get("/profile/:user_id",async(req,res) => {
      try{
        const user_id = parseInt(req.params.user_id);
        const info = await prisma.userInfo.findUnique({
            where:{
                user_id:user_id
            }
        })
        res.status(200).json(info)
      }catch(error){
        console.error("Error searching user info",error);
        res.status(500).json({error:"Failed to search for user info"});
      }
  })

  userRouter.get("/name/:user_id",async(req,res) => {
      try{
          const user_id = parseInt(req.params.user_id);
          const name = await prisma.user.findUnique({
              where:{
                  user_id:user_id
              },
              select:{
                  first_name:true,
                  last_name:true
              }
          })

          res.status(200).json(name);
      }catch(error){
        console.error("Error searching for name",error);
        res.status(500).json({error:"Failed to search for user info"});
      }
  })

module.exports = userRouter