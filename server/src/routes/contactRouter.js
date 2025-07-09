const {Router} = require("express");

const {addContact,removeContact,readContact,updateContact} = require( "../controllers/contactController")
const contactRouter = Router();

contactRouter.post("/create",addContact)
contactRouter.delete("/delete",removeContact)
contactRouter.get("/get",readContact)
contactRouter.patch("/patch",updateContact)

module.exports =  contactRouter
