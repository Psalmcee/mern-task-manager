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
        color: "red", border: "solid #507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", display: "flex", flexDirection: "column" 
    }
    const boxStyle = {
      display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", color: "black", backgroundColor: "#507661"
  }
    return (
        <div style={bgBoxStyle}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={boxStyle}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange = {(e) => setEmail(e.target.value)} required />
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange = {(e) => setPassword(e.target.value)} required />
                <br/>
                <input type="submit" value="Submit" />
                {error && <p>{error}</p>}
            </form>
            <Link to="/forgot-password"><h4>FORGOT PASSWORD? CLICK TO RESET</h4></Link> 
            <Link to="/"><h6>REGISTER</h6></Link>
        </div>
    )
    
}