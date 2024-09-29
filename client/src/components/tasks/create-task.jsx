import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateTask() {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            task: task,
            description: description || "No Description",
            completed: completed
        }
        try {
            const token = localStorage.getItem('token');
            fetch("http://localhost:5555/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
                .finally(() => {
                    setSuccess(true);
                })
                
                setTimeout(() => {
                   window.location.href = '/tasks'
                }, 50)

        } catch (error) {
            console.log(error)
        }
    }

    const bgBoxStyle = {
        width: "400px", color: "red", border: "#507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", display: "flex", flexDirection: "column" 
    }

    const boxStyle = {
        display: "flex", flexDirection: "column", margin: "12px", padding: "16px", paddingBottom: "16px", backgroundColor: "#f5f5f5", justifyContent: "center", borderRadius: "8px", color: "white"
    }

    const inputStyle = {
        width: "95%", padding: "10px", border: "1px solid #4caf50", borderRadius: "5px"
      }

    const submitButton = {
        display: "block", margin: "10px 0", padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer"
      }

    return (
        <div style={bgBoxStyle}>
            <div style={{ width: "100%", color: "white", display: "flex", justifyContent: "right", alignItems: "center", paddingTop: "12px" }}>
                <Link to={'/dashboard'}>
                    <button style={{ padding: "4px 12px", paddingTop: "8px", color: "white", paddingBottom: "8px", backgroundColor: "#4A0404", border: "none", borderRadius: "4px", fontSize: "large", }}>Dashboard</button>
                </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", marginLeft: "16px", marginRight: "16px" }}>
                <h1>Create Task</h1>
            </div>
            <form onSubmit={handleSubmit} style={boxStyle}>
                <input style={inputStyle} type="text" name="task" id="task" required placeholder="Task Name" value={task} onChange={(e) => setTask(e.target.value)} />
                <br />
                <textarea style={inputStyle} type="text" rows="6" name="description" id="description" placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <br />
                <label style={{ fontSize: "18px", color: "black" }} htmlFor="completed">Completion status</label>
                <input type="checkbox" name="completed" id="completed" value={completed} onChange={(e) => setCompleted(!completed)} />
                <br />
                <button style={submitButton} type="submit" value="Submit">Create Task</button>
                

            </form>
            {success && <p>Task created successfully!</p>}
        </div>
    )
}