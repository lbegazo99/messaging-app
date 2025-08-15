import "./Groups.css"
import {useState,useEffect} from "react"
import {jwtDecode} from "jwt-decode"
const token = localStorage.getItem("token")
let decoded = "";
if(token){
    decoded = jwtDecode(token);
}
function Groups(){
    const[groups,setGroups] = useState([]);
    
     useEffect(() => {
         const getAllGroups = async () => {
             try {
                const fetchgroups = await fetch(`http://localhost:3000/group/all/${decoded.user_id}`,{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                })

                let data = await fetchgroups.json()
                setGroups(data)

             } catch (error) {
                 console.error("error fetching groups")
             }
             
         }

         getAllGroups()
     },[])


    return(
        <>
         {groups.map((groups,index) => (
             <div key = {index}>
                 {groups.group_name}
             </div>
         ))}
        </>
    )
}

export default Groups