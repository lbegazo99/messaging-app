import react from "react";
import {useState} from 'react'
import "./Messages.css"

function Messages(){
    const [messages,setMessages] = new useState([]);

    return(
        <div className="messagesContainer">
            <div className="messageDiv1">User Messages</div>
             {messages.map((message,index) =>
               <div className="divider" key={index}>
                   <div>Profile</div>
                   <div>message</div>
                </div>
             )}
        </div>
    )
}


export default Messages