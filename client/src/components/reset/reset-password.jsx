import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from "react";

export default function ResetPassword() {
    const [password, setPassword] =useState("");
    const [confirmPassword, setConfirmPassword] =useState("");
    const [error, setError] =useState("");
    const [success, setSuccess] =useState("");

    const {uid, token} = useParams();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setSuccess('Passwords do not match');
            return;
            }

        try {
            const response = await fetch(`http://localhost:5555/account/reset-password/${uid}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    token
                })
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSuccess("password reset successful");
                // Redirect to protected routes
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError('password reset not successful')
            }

            
        } catch (error) {
            setError('Some error occured, please try again ' + error);
        }
    };

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
            width: "95%", padding: "10px", border: "1px solid #ccc", borderRadius: "3px"
          }

        return (
            <div style={bgBoxStyle}>
                <h1 style={{ color: "red" }}>Reset Password</h1> 
                <p>Please enter your new password.</p>
                <form onSubmit={submitHandler} style={formStyle}>
                    <label style={labelStyle}>New Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle}/>
                    <label style={labelStyle}>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle}/>
                    <button type="submit">Reset Password</button>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
                </form>
            </div>
        )
} 