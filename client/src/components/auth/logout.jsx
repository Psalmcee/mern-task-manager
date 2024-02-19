export default function Logout() {

    localStorage.removeItem('token');
    
    alert("Logged out successfully!")
    window.location.href = '/'
    return (
        <div>
            <p>Redirecting to home page...</p>
            <p>If you are not redirected, please click <a href="/">here</a></p>
        </div>
    )
}