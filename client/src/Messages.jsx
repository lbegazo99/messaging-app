import react from "react";
import {useState,useEffect} from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import {jwtDecode} from "jwt-decode"

import "./Messages.css"

const Messages = ({setProfile}) => {
    const [messages,setMessages] =  useState([]);
    const[error,setError] = useState(null)
    const token = localStorage.getItem("token");
    let decoded = "";
    let other_person_id = ""
    if(token){
        decoded = jwtDecode(token);
    }
    useEffect(() => {
        const getAllMessages = async () => {
            try{
                console.log("getAllMessages called");
                 const response = await fetch("http://localhost:3000/messages/recentMessages",{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                })

                if(!response.ok){
                    throw new Error(`Http error:Status ${response.status}`)
                }

                let data = await response.json()
                console.log(data)
                setMessages(data)
                setError(null)
            }catch(err){
                console.error("Error fetching messages:", err);
                setError(err.message)
            }
        }

        getAllMessages()
    },[])
    
    return(
       
        <div className="messagesContainer">
            <div className="messageDiv1">User Messages</div>
             {messages.map((message,index) =>(
               <div onClick={() => setProfile(other_person_id  = message.sender_id === decoded.user_id ? (message.receiver_id) : message.sender_id)} className="divider" key={index}>
                   <IoPersonCircleOutline size={50}/>
                   <div className="messageContentBox">
                       <p>{message.sender_id === decoded.user_id ? (message.receiver_name) : message.sender_name}</p>
                       <p>{message.content}</p>
                   </div>

                </div>
             )
             )}
        </div>
        
    )
}


export default Messages