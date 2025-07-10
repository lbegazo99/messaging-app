const { execSync } = require("child_process");
const seed = require('../prisma/seed');
const prisma = require("../prisma/client.js");

const signup = require("../src/routes/signUpRouter")
const request = require("supertest")
const express = require("express");
const logInRouter = require("../src/routes/logInRouter");
const messageRouter = require("../src/routes/messageRouter");
const{authenticateToken} = require("../src/middleware/authMiddleware");
const app = express();

app.use(express.json());
app.use("/signup", signup);
app.use("/login",logInRouter)
app.use("/messages",authenticateToken,messageRouter)

beforeAll(async () => {
  execSync(
    'npx prisma migrate reset --force --skip-seed --schema=./prisma/schema.prisma',
    { stdio: 'inherit' }
  );
  await seed();
});


afterAll(async () => {
  await prisma.$disconnect();
});

let token;

test("sign up route works", done => {
  request(app)
    .post("/signup")
    .send({
      user_name: "Lisa_SaxStar",
      password: "Smart123!Sax",
      email: "lisa.simpson@springfieldmail.com",
      first_name: "Lisa",
      last_name: "Simpson",
      profile_picture: "/images/profiles/lisa_simpson.png"
    })
    .expect("Content-Type", /json/)
    .expect(201, done);
});




test("checks to see if user can log in", done => {
    request(app)
      .post("/login")
      .send({
        user_name: "Lisa_SaxStar",
        password: "Smart123!Sax"
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
  
        token = res.body.access_token
        expect(token).toBeDefined();
  
        done(); 
      });
  });


test("checks to see if a user can send a message to another user",done => {
    request(app)
    .post("/messages/send/2")
    .set("Authorization", `Bearer ${token}`)
    .send({
        content:"Hi Homer!"
    })
    .expect("Content-Type", /json/)
    .expect(201, done);
})

test("can i get a users message with another user", done => {
    request(app)
    .get("/messages/getconvo/2")
    .set("Authorization",`Bearer ${token}`)
    .expect("Content-Type",/json/)
    .expect(200,done)
})