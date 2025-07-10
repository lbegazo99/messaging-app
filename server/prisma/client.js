const { PrismaClient } = require("../generated/prisma/client.js")

const databaseUrl = process.env.NODE_ENV === 'test'
? process.env.TEST_DATABASE_URL
: process.env.DATABASE_URL

const prisma = new PrismaClient({
    datasources:{
        db:{
            url:databaseUrl
        }
    }
})

module.exports = prisma