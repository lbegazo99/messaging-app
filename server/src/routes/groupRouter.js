const {Router} = require("express");
const groupRouter = Router();

const {CreateGroup,deleteGroup,updateName} = require( '../controllers/groupController')

groupRouter.post("/create",CreateGroup);
groupRouter.delete("/delete",deleteGroup);
groupRouter.patch("/patch",updateName);

module.exports = groupRouter