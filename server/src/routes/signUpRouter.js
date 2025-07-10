const { Router } = require("express")
const bcrypt = require('bcrypt')
const prisma = require('../../prisma/client.js')
const signUpRouter = Router();

signUpRouter.post('/', async (req, res) => {
 
  const {
    user_name,
    password,
    email,
    first_name,
    last_name,
    profile_picture
  } = req.body;

  try {
    const salt =  await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = await prisma.user.create({
      data: {
        user_name,
        password:hashedPassword,
        email,
        first_name,
        last_name,
        profile_picture,
        setting: {
          create: {
            lightMode: true,
            privacy: true
          }
        }
      }
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});

module.exports = signUpRouter