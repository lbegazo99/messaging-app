import "./NavBar.css"
import { LuMessageSquare } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function NavBar({state,setState}){

    return(
       <div className="functionContainer">
           <div onClick = {setState("messages")}className="icon"><LuMessageSquare size={30} color={"white"}/></div>
           <div onClick = {setState("profile")} className="icon"><IoPersonCircleOutline size={30} color={"white"}/></div>
           <div onClick = {setState("search")}className="icon"><FaSearch  size={30} color={"white"}/></div>
           <div onClick = {setState("logout")}className="icon"><IoIosLogOut size={30} color={"white"}/></div>
       </div>
    )
}

export default NavBar