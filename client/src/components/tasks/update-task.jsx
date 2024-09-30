import { useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";

export default function UpdateTask() {
    const [task, setTask] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTask = async () => {
            try {
                localStorage.getItem("token")
                const response = await fetch(`http://localhost:5555/tasks/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const { msg } = await response.json()
                setTask(msg)
            }

            catch (error) {
                console.log('Error:', error)
            }
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token")

            await fetch(`http://localhost:5555/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(task)
            })
        }
        catch (error) {
            console.log('Error:', error)
        }

        alert('Task Updated')
        setTimeout(() =>
            navigate(`/tasks/${id}`),
            1000)

    }

    const bgBoxStyle = {
        display: "flex", flexDirection: "column", width: "400px", color: "red", border: "solid #f5f5f5", margin: "3rem 0rem",
        padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0px 0px 8px #507661" 
    }

    const boxStyle = {
        display: "flex", flexDirection: "column", color: "black", backgroundColor: "wheat", border: "#507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", marginTop: "16px 16px 0px", padding: "16px", paddingBottom: "16px"
    }
    return (
        <div style={bgBoxStyle}>
            <div style={{ width: "100%", color: "white", display: "flex", justifyContent: "right", alignItems: "center" }}>
                <Link to={'/dashboard'}>
                    <button style={{ padding: "4px 12px", paddingTop: "8px", color: "white", paddingBottom: "8px", backgroundColor: "#4A0404", border: "none", borderRadius: "4px", fontSize: "large", }}>Dashboard</button>
                </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", marginLeft: "16px", marginRight: "16px" }}>
                <h1>Update Task</h1>
            </div>
            <form onSubmit={handleSubmit} style={boxStyle}>
                <div>
                    <p>Task: {task.task || ''}</p>
                </div>

                <div>
                    <label htmlFor="taskDescription">Description:</label>
                    <textarea id="taskDescription" rows={5} name="description" value={task.description || ""} onChange={handleChange}></textarea>
                </div>

                <div>
                    <label htmlFor="completed">Completed:</label>
                    <input type="checkbox" id="completed" name="completed" checked={task.completed || false} onChange={(e) => setTask({ ...task, completed: e.target.checked })} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button style={{ marginTop: "16px", width: "max-content", display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", paddingBottom: "8px", backgroundColor: "gray", color: "black", border: "none", borderRadius: "4px", boxShadow: "0px 0px 8px #507661" }} type="submit" value="Submit">Update Task</button>
                </div>

            </form>
        </div>
    )

}