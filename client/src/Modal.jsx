
function Modal({setAboutMe,open,onClose,saveAboutMe,aboutMe}){
    if(!open) return null
    const handleClick = () =>{
        onClose()
        saveAboutMe()
    }
    return(
        <div>
            <form>
                <textarea name="aboutMe" id="aboutMe" cols="30" rows="10" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} ></textarea>
             </form>
             <button onClick={handleClick}>Save</button>
        </div>
    )
}

export default Modal