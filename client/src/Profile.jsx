import "./Profile.css"
import { IoPersonCircleOutline } from "react-icons/io5";
import {useState,useEffect} from "react"
import { FaUserEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Modal from "./Modal";

function Profile(){
    const[aboutMe,setAboutMe] = useState("")
    const[name,setName] = useState("")
    const[profession,setProfession] = useState("")
    const[location,setLocation] = useState("")
    const[employer,setEmployer] = useState("")
    const[skills,setSkills] = useState([]);
    const[skill,setSkill] = useState('');
    const[isOpen,setIsOpen] = useState(false)
    const[editing,setEditing] = useState(false);
    const[employerEdit,setEmployerEdit] = useState(false);
    const token = localStorage.getItem("token");

    let decoded = "";

    if(token){
        decoded = jwtDecode(token);
    }
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/profile/${decoded.user_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
    
                const data = await response.json();
                console.log(data)
                setAboutMe(data.AboutMe);
                setProfession(data.Profession);
                setEmployer(data.Employer);
                setSkills(data.Skills);
            } catch (err) {
                console.error("Error getting user info:", err);
            }
        };
    
        fetchInfo();
    }, []); 

    useEffect(() => {
          const fetchName = async () =>{
                try {
                    const name = await fetch(`http://localhost:3000/user/name/${decoded.user_id}`,{
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
    
                    const data = await name.json();
                    setName(data.first_name + data.last_name)
                } catch (error) {
                    console.error("Error finding name",err)
                }
            }
        fetchName()
    },[])

    const saveProfile = async () => {
        setEditing(false)
        try {
            const response = await fetch(`http://localhost:3000/user/profile/${decoded.user_id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ profession, location, employer, skills})
            });
    
            const result = await response.json();
            console.log("Saved successfully:", result);
        } catch (err) {
            console.error("Error posting info:", err);
        }
    };

    const saveAboutMe = async () =>{
        try{
            const response = await fetch(`http://localhost:3000/user/profile/aboutMe/${decoded.user_id}`,{
                method: `Post`,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({aboutMe})
            });
            const result = await response.json();
            console.log("Saved successfully:", result);
        }catch(err){
            console.error("error saving data")
        }
    }

    const saveEmployer = async () =>{
        try{
            const response = await fetch(`http://localhost:3000/user/profile/employer/${decoded.user_id}`,{
                method: `Post`,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({employer})
            });
            const result = await response.json();
            console.log("Saved successfully:", result);
        }catch(err){
            console.error("error saving data")
        }
    }


    const addSkill = () =>{
        if(skill.trim() == '' || skills.includes(skill.trim())) return;
        setSkills(prev => [...prev,skill.trim()]);
        setSkill('');
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            addSkill();
        }
    }


  return(
      <div className="profilePage">
          <div className="header">
                <div>My Profile</div>
                <div>
                 <IoPersonCircleOutline/>
                 Luis Begazo
                </div>
          </div>

          <div className="profileContent">

          <div className="leftSide">
            <div className="profileInfo">
                <div className="profileImage" style={{backgroundColor:"red"}}></div>
                <div className="profilePicture"><IoPersonCircleOutline size={90}/></div>
                <div onClick={() => setEditing(true)} className="info">
                    {editing ? (
                        <form onClick={(e) => e.stopPropagation()}>
                        <div className="profession">
                            <label htmlFor="profession">Profession:</label>
                            <input onChange={(e) => setProfession(e.target.value)} type="text" id="profession" name="profession" />
                        </div>
                        <div className="location">
                            <label htmlFor="location">Location:</label>
                            <input onChange={(e) => setLocation(e.target.value)} type="text" id="location" name="location" />
                        </div>
                        <div className="skills">
                            <label htmlFor="skills">Skills:</label>
                            <input
                            type="text"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            onKeyDown={handleKeyDown}
                            />
                            <button type="button" onClick={addSkill}>Add Skill</button>
                        </div>
                        </form>
                    ) : (
                        <div>
                        <div>{name}</div>
                        <div>{profession}</div>
                        <div>{location}</div>
                        <div>{employer}</div>
                        {skills.map((skill, index) => (
                            <div key={index}>{skill}</div>
                        ))}
                        </div>
                    )}
                </div>

                <button onClick={saveProfile}>Save Changes</button>
            </div>
                <div className="aboutMe" style={{display:"flex",gap:"70%"}} >
                    <div>
                        <h1>About Me</h1>
                         <div>{aboutMe}</div>
                         <Modal aboutMe = {aboutMe} setAboutMe = {setAboutMe} saveAboutMe = {saveAboutMe} open={isOpen} onClose={() => setIsOpen(false)}></Modal>
                    </div>
                    <div style={{paddingTop:"20px"}}>
                    <button onClick={() => setIsOpen(true)}><FaUserEdit size={30}/></button>
                    </div>
                    
                </div>
          
          </div>
    

      <div className="rightSide">

      <div className="employer">
        {employerEdit ? (
            <form
            onSubmit={(e) => {
                e.preventDefault();
                saveEmployer();
                setEmployerEdit(false);
            }}
            >
            <input
                type="text"
                value={employer}
                onChange={(e) => setEmployer(e.target.value)}
            />
            <button type="submit">Save</button>
            </form>
        ) : (
            <div onClick={() => setEmployerEdit(true)}>
            <p>{employer}</p>
            </div>
        )}
        </div>

            <div className="Connect">
                <p>Connect</p>
                <ul>
                <p>FaceBook</p>
                <p>Instagram</p>
                <p>Twitter</p>
                </ul>
            </div>

            <div className="connections">
                <p>Connections</p>
              <ul>
                  <div><IoPersonCircleOutline/> Homer Simpson</div>
                  <div><IoPersonCircleOutline/> Marge Simpson</div>
                  <div><IoPersonCircleOutline/> Bart Simpson</div>
              </ul>
            </div>
      </div>
      </div>
      </div>
  )
}

export default Profile