import "./Search.css"
import {useState,useEffect} from "react"
import {FaSearch} from "react-icons/fa"
import Conversation from "./Conversation";
import { Link } from "react-router-dom";

function Search(){
   const[users,setUsers] = useState([]);
   const [user,setUser] = useState("")
    
   useEffect(() => {
       if(user.trim() === ""){
           setUsers([])
           return;
       }

       const token = localStorage.getItem("token");

        fetch(`http://localhost:3000/user/${user}`,{
            headers:{
                "Content-Type":"application/json",
                 "Authorization": `Bearer ${token}`
            }
        })

        .then((res) => res.json())
        .then((data) => {
            setUsers(data)
        })
        .catch((err) => console.error("Error Searching for users:",err))
   },[user])


    return(
    <div className="searchNavigator">
        <div className="logo"></div>
        <div className="SearchBar">
            <div className="searchWrapper">
            <label for = "search">Search Friends</label>
            <div>
            <FaSearch/>
            <input placeholder="Type to Search" type="search" id="search" value={user} onChange={(e) => setUser(e.target.value)} />
            </div>
            </div>

            {user !== "" && users.length > 0 && (
                 <div className = "userCards"> 
                 {users.map((user) => (
                     <Link to = {`/conversation/${user.user_id}/${user.user_name}`}>
                    <div key={user.user_id} className="card">
                    <div className="header">{user.user_name}</div>
                    <div className="body">{user.email}</div>
                    </div>
                    </Link>
                ))}     
                 </div>
            )}
            
        </div>
       
    </div>
    )


}

export default Search