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
        color: "red", border: "solid #507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", display: "flex", flexDirection: "column" 
    }

    const boxStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", color: "black", backgroundColor: "#507661"
    }
    return (
        <div style={bgBoxStyle}>
            <h1>Forgot Password</h1>
           <div style={boxStyle}>
           <p>Enter your email address and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Send Reset Link</button>   
            </form>
            {error && <p>{error}</p> }
            </div>
        </div>
    )
}