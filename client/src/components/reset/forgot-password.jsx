import { useState } from 'react'
export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        try {
            const response = await fetch('http://localhost:5555/account/forgot-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },  
              body: JSON.stringify({
                email: email
              })
            });
    
            if (response.ok) {
              //from here a response with reset link is sent to the email address provided
                alert('Reset link sent to your mail');
            } else {
                setError('Some error occured, please try again');
            }
        } catch (error) {
            setError('Network Error' + error)
        }
    }

    const bgBoxStyle = {
      display: "flex", flexDirection: "column", width: "400px", border: "solid #f5f5f5", margin: "3rem 0rem",
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
        display: "block", margin: "10px 0", padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
      }
      
    return (
      <div style={bgBoxStyle}>
        <h1 style={{ color: "red" }}>Forgot Password</h1>
        <p>Enter your email address to receive a link to reset your password.</p>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="submit" value="Reset Password" style={submitButton} />
        </form>
        {error && <p>{error}</p>}
      </div>
    )
}