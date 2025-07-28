import "./FullScreenConversation.css"
import {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"



function FullScreenConversation(){
    const[convo,setConvo] = new useState([])
    const[message,setMessage] = new useState("")
    const[error,setError] = new useState(null)
    const {user_id,user_name} = useParams();
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        
         const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:3000/messages/getconvo/${user_id}`,{
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

        
    },[user_id,token])
    

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
        <>
        <div className="userBar">
            <img src="" alt="" />
            <div>
                {user_name}
            </div>
        </div>

        <div className="fullScreenConvoDiv">
            <div className="fullScreenconvo"> 
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
                        <input type="textfield"  name="conversation" id="conversation" onChange={(e) => setMessage(e.target.value)}/>
                    </p>
                </form>
                <button onClick={sendMessage}>send</button>
        </div>
            </div>
        </>
    )
}


export default FullScreenConversation