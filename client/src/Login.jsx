import './Login.css'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'


function Login(){
    const[user_name,setUser]= useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({user_name,password})
            })

            const data = await res.json()

            if(res.ok){
                localStorage.setItem("token",data.access_token);
                navigate("/home-page")
            }



        } catch (error) {
            console.error('failed to sign up:',error)
        }
    }
 

    return (
        <div className='logincontainer'>
           
            <div className="logindivnum1">
                    <div>
                        Logo
                    </div>
                    <div>
                        FriendsOnly Messaging App
                    </div>
            </div>

            <div className="logindivnum2">
                <div className='logindivnum2A'>Hello!!!</div>
                <div className='logindivnum2B'>
                  <div>New to FriendsOnly?</div> <Link to = "/signup"><button className="signUpLink">Create an account</button></Link>
                </div>
            </div>

            <div className="logindivnum3">
                <form>
                    <p>
                        <label for = "username">UserName</label>
                        <input type="text" id="username" name ="user_name" onChange={(e) =>setUser(e.target.value) } />
                    </p>
                    <p>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) =>setPassword(e.target.value) } />
                    </p>

                    <p className="login_button">
                        <button onClick={handleSubmit}>Log in</button>
                    </p>
                </form>
            </div>
            
        </div>
    )
}


export default Login