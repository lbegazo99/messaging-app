import "./Search.css"
import {useState,useEffect} from "react"
import {FaSearch} from "react-icons/fa"
import { Link } from "react-router-dom";

function Search(){
   const[users,setUsers] = useState([]);
   const [user,setUser] = useState("")
   const [group,setGroup] = useState([])
   const [group_id,setGroupId] = useState("")
   const token = localStorage.getItem("token");
 
    
   useEffect(() => {
       if(user.trim() === ""){
           setUsers([])
           return;
       }

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

   const createInitialGroup = async ()  => { 
    try {
      const response = await fetch("http://localhost:3000/group/create",{
              method:"POST",
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':`Bearer ${token}`
              },
              body:JSON.stringify(group)
          })

          const result = await response.json()
          console.log(result);
          setGroupId(result.group_id)
      } catch (error) {
          console.error("Error creating a group")
      }
}

const updateGroup = async (user) => {
    try{
        const response = await fetch("http://localhost:3000/group/update",{
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({user,group_id})
        })

        const result = await response.json()
        console.log(result)
    }catch(error){
        console.error("Could not update group")
    }
}

   const addToGroup = (user) => {
     setGroup(prev => {
         const updatedGroup = [...prev,{user}]
         console.log(updatedGroup)
         return updatedGroup
     })

     if(group.length <= 1){
        createInitialGroup()
     }else{
         updateGroup(user)
     }
     
   }

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
                    <div key={user.user_id} className="card">
                    <div className="header">{user.user_name}</div>
                    <div className="body">{user.email}</div>
                    <Link to = {group.length === 0 ? `/conversation/${user.user_id}/${user.user_name}`
                     : `/conversation/${group_id}`}>
                    <button>Start Connecting</button>
                    </Link>
                    <button onClick={() => addToGroup(user.user_id)}>Add To Group</button>
                    </div>
                ))}     
                 </div>
            )}

           
            
        </div>
       
    </div>
    )


}

export default Search