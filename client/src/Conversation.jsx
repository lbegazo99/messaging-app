import react from "react";
import "./Conversation.css"
import {useState} from 'react'



function Conversation({profile}){
    const[convo,setConvo] = new useState([])
    return(
        <div className="convoDiv">
            <div className="profile">profile</div>

            <div className="convo"> 
            {convo.map((message,index) => {
                <div>
                    <div>
                        message
                    </div>
                </div>
            })}
                <form>
                    <p>
                        <input type="textfield"  name="conversation" id="conversation" />
                    </p>
                </form>
        </div>
            </div>
    )
}


export default Conversation