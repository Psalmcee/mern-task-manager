import { Link } from "react-router-dom";

export default function Dashboard() {
    const username = localStorage.getItem("name")

    const bgBoxStyle = {
        display: "flex", flexDirection: "column", width: "400px", color: "red", border: "#507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0px 0px 8px #507661"
    }

    const boxStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", backgroundColor: "#f5f5f5"
    }

    const navButton = {
        textDecoration: "none"
      }
    return (
        <div style={bgBoxStyle}>
            <div style={{ width: "max-content",  color:  "#FFFFFF",   display: "flex", justifyContent: "start"}}>
                <p style={{ padding: "4px 12px", paddingBottom: "8px", backgroundColor: "#004a4a", borderRadius: "4px", fontSize: "large", }}> Hi, {username} 👋</p>
            </div>
            
            <h1>User Dashboard</h1>
            <div style={boxStyle}>
            <Link to="/create-task" style={navButton}><h3>Create Task</h3></Link>
            <Link to="/tasks" style={navButton}><h3>View all tasks</h3></Link>
            <Link to="/logout" style={navButton}><h3>Log out</h3></Link>
            </div>
            
        </div>
    )
}