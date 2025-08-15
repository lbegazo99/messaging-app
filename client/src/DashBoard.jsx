import "./DashBoard.css"
import Messages from "./Messages"
import Conversation from "./Conversation"
import Search from "./Search"
import {useState,useEffect} from 'react'
import { LuMessageSquare } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import Groups from "./Groups"
import Profile from "./Profile"


function DashBoard(){
  const  [state,setState] = useState("");
  const  [profile,setProfile] = useState("1")
  return(
      <div className="dashBoardContainer">
        <div className="functionContainer">
           <div onClick = {() => setState("messages")}className="icon"><LuMessageSquare size={30} color={"white"}/></div>
           <div onClick = {() => setState("profile")} className="icon"><IoPersonCircleOutline size={30} color={"white"}/></div>
           <div onClick = {() => setState("search")} className="icon"><FaSearch  size={30} color={"white"}/></div>
           <div onClick = {() => setState("Groups")} className = "icon"><MdGroups size={30} color={"white"}/></div>
           <div onClick = {() => setState("logout")}className="icon"><IoIosLogOut size={30} color={"white"}/></div>
       </div>
        {state === "messages" && (<><Messages setProfile={setProfile}/> <Conversation profile = {profile}/> </>)}
        {state === "search" && <Search/>}
        {state === "profile" && <Profile/>}
        {state === "Groups" && <Groups/>}
        {}
      </div>
  )
}

export default DashBoard