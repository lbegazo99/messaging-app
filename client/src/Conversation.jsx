import react from "react";
import "./Conversation.css"
import {useState,useEffect} from 'react'



function Conversation({profile}){
    const[convo,setConvo] =  useState([])
    const[message,setMessage] =  useState("")
    const[error,setError] =  useState(null)
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchMessages = async () => {
           try {
               const response = await fetch(`http://localhost:3000/messages/getconvo/${profile}`,{
               headers:{
                   "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
               }
               })
               
               if(!response.ok){
                   throw new Error(`Http error:Status ${response.status}`);
               }
               let data = await response.json()
               setConvo(data)
               setError(null)
           } catch (err) {
               setError(err.message);
               setConvo(null)
           }
        }
           
           fetchMessages()

       
   },[profile])

   const sendMessage = () =>{
    fetch(`http://localhost:3000/messages/send/${user_id}`,{
        method:"Post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({
            content:message
        })
    })
}

    return(
        <div className="convoDiv">
            <div className="profile"></div>
            <div className="convo"> 
            {convo === null ? (
                <p>No messages yet</p>
            ) : (
                convo.map((message) => (
                    <div key = {message.message_id}>
                        {message.content}
                    </div>
                ))
            )}
                <form>
                    <p>
                        <input type="textfield"  name="conversation" id="conversation" onChange={(e) => setMessage(e.target.value)} />
                    </p>
                </form>
                <button onClick={sendMessage}>send</button>
        </div>
            </div>
    )
}


export default Conversation