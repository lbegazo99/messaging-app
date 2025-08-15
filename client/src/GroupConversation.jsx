import "./GroupConversation.css"
import{useState,useEffect} from 'react'
import{useParams} from "react-router-dom"
import {jwtDecode} from "jwt-decode"


function GroupConversation(){
     const{group_id} = useParams();
     const[messages,setMessages] = useState([]);
     const[message,setMessage] = useState("");
     const token = localStorage.getItem("token")
     let decoded = "";

     if(token){
          decoded = jwtDecode(token);
      }
     useEffect(() => {
          const getGroupMessages = async () =>{
               try {
                    const response = await fetch(`http://localhost:3000/${group_id}`,{
                         headers:{
                              "Content-Type":"application/json",
                              "Authorization":`Bearer ${token}`
                          }
                    })

                    let data = await response.json();
                    setMessages(data)
               } catch (error) {
                    console.error("Error fetching messages:", err);
                    setError(err.message)
               }
          }

          getGroupMessages()
          
     },[])


     const sendMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${group_id}`,{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({
                     group_id,
                     user_id:decoded.user_id,
                     content
                })
             })
             
             let res = await response.json();
             console.log(res)

        } catch (error) {
          console.error("Error sending message:", err);
          setError(err.message)
        }
     }

     return (
          <div>
          <div className="header">
     
          </div>
     
          <div>
               {messages.map(message => (
                    <div key={index}>
                         <div>{message.content}</div>
                    </div>   
               ))}
          </div>
          </div>
     )

}



export default GroupConversation;