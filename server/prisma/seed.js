const prisma = require('../prisma/client.js')

async function seed() {
  const users = [
    {
      user_name: "homer_simpson",
      password: "Doh123!",
      email: "homer@springfield.com",
      first_name: "Homer",
      last_name: "Simpson",
      profile_picture: "/images/profiles/homer.png",
    },
    {
      user_name: "marge_simpson",
      password: "BlueHair456!",
      email: "marge@springfield.com",
      first_name: "Marge",
      last_name: "Simpson",
      profile_picture: "/images/profiles/marge.png",
    },
    {
      user_name: "bart_simpson",
      password: "EatMyShorts!",
      email: "bart@springfield.com",
      first_name: "Bart",
      last_name: "Simpson",
      profile_picture: "/images/profiles/bart.png",
    },
    {
      user_name: "maggie_simpson",
      password: "Pacifier123!",
      email: "maggie@springfield.com",
      first_name: "Maggie",
      last_name: "Simpson",
      profile_picture: "/images/profiles/maggie.png",
    }
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        setting: {
          create: {
            lightMode: true,
            privacy: false,
          },
        },
      },
    });
  }

  console.log("✅ Seeded Simpsons users!");
}

module.exports = seed
