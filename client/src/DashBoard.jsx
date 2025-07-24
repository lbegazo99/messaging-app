import "./DashBoard.css"
import Messages from "./Messages"
import Conversation from "./Conversation"
import Search from "./Search"
import {useState} from 'react'
import { LuMessageSquare } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";


function DashBoard(){
  const  [state,setState] = useState("");
  const  [profile,setProfile] = useState([])
  return(
      <div className="dashBoardContainer">
        <div className="functionContainer">
           <div onClick = {() => setState("messages")}className="icon"><LuMessageSquare size={30} color={"white"}/></div>
           <div onClick = {() => setState("profile")} className="icon"><IoPersonCircleOutline size={30} color={"white"}/></div>
           <div onClick = {() => setState("search")}className="icon"><FaSearch  size={30} color={"white"}/></div>
           <div onClick = {() => setState("logout")}className="icon"><IoIosLogOut size={30} color={"white"}/></div>
       </div>
        {console.log(state)}
        {state === "messages" && (<><Messages/><Conversation profile = {profile}/></>)}
        {state === "search" && <Search/>}
      </div>
  )
}

export default DashBoard