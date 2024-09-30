import { Link } from "react-router-dom";
function SignUp() {
    
    const bgBoxStyle = {
        display: "flex", flexDirection: "column", width: "400px", color: "red", border: "solid #f5f5f5", margin: "3rem 0rem",
        padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0px 0px 8px #f5f5f5" 
    }
    const formStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", color: "black", backgroundColor: "#f5f5f5"
    }
    
    const labelStyle = {
        display: "block", marginBottom: "5px"
    }

    const inputStyle = {
        width: "95%", padding: "10px", border: "1px solid #4caf50", borderRadius: "5px"
    }

    const submitButton = {
        display: "block", margin: "10px 0 6px", padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
      }
    
      const navButton = {
        textDecoration: "none"
      }
   return (
    <>
    <div style={bgBoxStyle}>
        <h1>Sign Up</h1>
        <form action="http://localhost:5555/auth/register" method="POST" style={formStyle}>
            <label htmlFor="avatar" style={labelStyle}>Avatar</label>
            <input type="file" alt="profile image" id="avatar" name="avatar"/>
            <br/>
            <label htmlFor="name" style={labelStyle}>Username</label>
            <input type="name" id="name" name="name" style={inputStyle}/>
            <br/>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input type="email" id="email" name="email" style={inputStyle}/>
            <br/>
            <label htmlFor="location" style={labelStyle}>City</label>
            <input type="text" id="location" name="location" style={inputStyle}/>
            <br/>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input type="password" id="password" name="password" style={inputStyle}/>
            <br/>
             <input style={submitButton}  type="submit" value="Sign Up" />
           
        </form>
        <br/>
        <Link to="/login" style={navButton}><h3>HAVE AN ACCOUNT? CLICK TO LOGIN</h3></Link>
    </div>
    </>
   )
}

export default SignUp;