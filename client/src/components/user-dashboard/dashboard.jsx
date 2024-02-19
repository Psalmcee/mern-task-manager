import { Link } from "react-router-dom";

export default function Dashboard() {
    const username = localStorage.getItem("name")

    const bgBoxStyle = {
        color: "red", border: "solid #507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", display: "flex", flexDirection: "column" 
    }

    const boxStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661"
    }

    
    return (
        <div style={bgBoxStyle}>
            <div style={{ width: "max-content",  color:  "#FFFFFF",   display: "flex", justifyContent: "start"}}>
                <p style={{ padding: "4px 12px", paddingBottom: "8px", backgroundColor: "#004a4a", borderRadius: "4px", fontSize: "large", }}> Hi, {username} 👋</p>
            </div>
            
            <h1>User Dashboard</h1>
            <div style={boxStyle}>
            <Link to="/create-task" style={{}}><h3>Create Tasks</h3></Link>
            <Link to="/tasks"><h3>View all tasks</h3></Link>
            <Link to="/logout"><h3>Log out</h3></Link>
            </div>
            
        </div>
    )

}