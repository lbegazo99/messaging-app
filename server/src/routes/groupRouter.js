const {Router} = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");

const groupRouter = Router();

groupRouter.post("/create",authenticateToken,CreateGroup);

module.exports = groupRouter