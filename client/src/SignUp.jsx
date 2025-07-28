import react from "react"
import "./SignUp.css"
import {useState} from 'react'
import{Link} from 'react-router-dom'

function SignUp(){
    const[user_name,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [first_name,setFirstName] = useState("")
    const [last_name,setLastName] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/signup",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({user_name,password,email,first_name,last_name,profile_picture:"./images/defaultPic"})
            })
            
            const data = await res.json();
            console.log("user signed in")
        } catch (error) {
            console.error('failed to sign in:',error)
        }
    }


    return (
        <div className='signupcontainer'>
           
            <div className="signupdivnum1">
                    <div>
                        Logo
                    </div>
                    <div>
                        FriendsOnly Messaging App
                    </div>
            </div>

            <div className="signupdivnum2">
                <div className='signupdivnum2A'>Hello!!!</div>
                <div className='signupdivnum2B'>
                  <div>Already Have An account ?</div> <Link to = "/"><button className="LoginLink">Login</button></Link>
                </div>
            </div>

            <div className="signupdivnum3">
                <form>
                    <p>
                        <label for = "username">UserName</label>
                        <input type="text" id="username" name ="user_name" onChange={(e) =>setUserName(e.target.value) } />
                    </p>
                    <p>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) =>setPassword(e.target.value) } />
                    </p>

                    <p>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) =>setEmail(e.target.value) } />
                    </p>

                    <p>
                        <label for="firstName">firstName</label>
                        <input type="text" name="first_name" id="firstName" onChange={(e) =>setFirstName(e.target.value) } />
                    </p>

                    <p>
                        <label for="LastName">firstName</label>
                        <input type="text" name="last_name" id="LastName" onChange={(e) =>setLastName(e.target.value) } />
                    </p>

                    <p className="signup_button">
                        <button onClick={handleSubmit} >Sign up</button>
                    </p>
                </form>
            </div>
            
        </div>
    )
       
}

export default SignUp