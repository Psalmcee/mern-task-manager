import { Link } from "react-router-dom";
function SignUp() {
    
    const bgBoxStyle = {
        color: "red", border: "solid #507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", display: "flex", flexDirection: "column" 
    }
    const boxStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", color: "black", backgroundColor: "#507661"
    }

   return (
    <>
    <div style={bgBoxStyle}>
        <h1>Sign Up</h1>
        <form action="http://localhost:5555/auth/register" method="POST" style={boxStyle}>
            <label htmlFor="avatar">Avatar</label>
            <input type="file" alt="profile image" id="avatar" name="avatar" />
            <br/>
            <label htmlFor="name">Username</label>
            <input type="name" id="name" name="name" />
            <br/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <br/>
            <label htmlFor="location">City</label>
            <input type="text" id="location" name="location" />
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
            <br/>
            <div style={{ display: "flex", justifyContent: "center"}}>
                 <input style={{ width: "12rem", padding: "12px 24px", paddingBottom: "8px", backgroundColor: "yellowgreen", border: "none", borderRadius: "4px"}}  type="submit" value="Submit" />
            </div>
           
        </form>
        <br/>
        <Link to="/login"><h2 >HAVE AN ACCOUNT? CLICK TO LOGIN</h2></Link>
    </div>
    </>
   )
}

export default SignUp;