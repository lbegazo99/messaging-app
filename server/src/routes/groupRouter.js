const {Router} = require("express");
const groupRouter = Router();

const {CreateGroup,deleteGroup,updateName,updateGroupMembers,getAllGroups} = require( '../controllers/groupController')

groupRouter.post("/create",CreateGroup);
groupRouter.delete("/delete",deleteGroup);
groupRouter.patch("/patch",updateName);
groupRouter.patch("/update",updateGroupMembers)
groupRouter.get("/all/:user_id",getAllGroups)
module.exports = groupRouter