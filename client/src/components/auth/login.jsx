import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:5555/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
    
          if (response.ok) {
            // Successful login:
            const data = await response.json();
            console.log(data)
            // Store token (if received) securely in localStorage or cookies
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name)
            // Redirect to protected routes
            window.location.href = '/dashboard';
          } else {
            // Login failure:
            setError('Invalid email or password');
          }
        } catch (error) {
          // Network error:
          setError('Network error occurred');
        }
      };

      const bgBoxStyle = {
        display: "flex", flexDirection: "column", width: "400px", color: "red", border: "solid #f5f5f5", marginTop: "5rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0px 0px 8px #f5f5f5" 
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
    display: "block", margin: "10px 0", padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
  }

  const navButton = {
    textDecoration: "none"
  }
    return (
        <div style={bgBoxStyle}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input type="email" id="email" value={email} onChange = {(e) => setEmail(e.target.value)} required style={inputStyle}/>
                <br/>
                <label htmlFor="password" style={labelStyle}>Password</label>
                <input type="password" id="password" value={password} onChange = {(e) => setPassword(e.target.value)} required style={inputStyle}/>
                <br/>
                <input type="submit" value="Login" style={submitButton}/>
                {error && <p>{error}</p>}
            </form>
            <Link to="/forgot-password" style={navButton}><h4 >FORGOT PASSWORD? CLICK TO RESET</h4></Link> 
            <Link to="/" style={navButton}><h3>REGISTER</h3></Link>
        </div>
    )
    
}