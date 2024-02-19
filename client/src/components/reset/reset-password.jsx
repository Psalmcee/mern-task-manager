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
        color: "red", border: "solid #507661", marginTop: "32px", display: "flex", flexDirection: "column" 
    }

    const boxStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661"
    }
        return (
            <div style={bgBoxStyle}>
                <h1>Reset Password</h1>
                <p>Please enter your new password.</p>
                <form onSubmit={submitHandler} style={boxStyle}>
                    <label>New Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <button type="submit">Reset Password</button>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
                </form>
            </div>
        )
} 