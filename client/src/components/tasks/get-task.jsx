import { useEffect } from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function GetTask() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5555/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const { msg } = await response.json();
          setTask(msg);
          setLoading(false);

        } else {

          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        setError(error);

        console.error('Error fetching data:', error);
      }
    };

    fetchTask();
  }, [id]);

  if (task.length === 0) {
    return (
      <div>
        <p> No tasks available, please add task</p>
        <Link to={"/create-task"}><h5>Create Task</h5></Link>
      </div>
    )
  }

  const bgBoxStyle = {
    display: "flex", flexDirection: "column", width: "400px", color: "red", border: "solid #f5f5f5", margin: "3rem 0rem",
    padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0px 0px 8px #507661" 
}

  const boxStyle = {
    display: "flex", flexDirection: "column", fontSize: "large", margin: "0px 24px", padding: "16px", paddingBottom: "16px", color: "white", backgroundColor: "#765052", border: "solid #507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661"
}
  return (

    <div style={bgBoxStyle}>
      <div style={{ width: "100%", color: "white", display: "flex", justifyContent: "right", alignItems: "center" }}>
          <Link to={'/dashboard'}>
          <button style={{ padding: "4px 12px", paddingTop: "8px", color: "white", paddingBottom: "8px", backgroundColor: "#4A0404", border: "none", borderRadius: "4px", fontSize: "large", }}>Dashboard</button>
          </Link>
        </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px", marginLeft: "16px", marginRight: "16px" }}>
        <h1>Task</h1>
      </div>
      <div style={ boxStyle }>
        <p>Title: {task.task}</p>
        <p>Description: {task.description}</p>
        <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>
      </div>

      <div style={{display: "flex", justifyContent: "center"}}>
        <Link to={`/update-task/${id}`}>
          <button style={{marginTop: "16px" , width: "max-content", display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", paddingBottom: "8px", backgroundColor: "gray", color: "black", border: "none", borderRadius: "4px", boxShadow: "0px 0px 8px #507661" }}>Update Task</button>
        </Link>
        <Link to={`/delete-task/${id}`}>
          <button style={{ marginTop: "16px", marginLeft: "16px", width: "max-content", display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", paddingBottom: "8px", backgroundColor: "gray", color: "black", border: "none", borderRadius: "4px", boxShadow: "0px 0px 8px #507661" }}>Delete Task</button>
        </Link>
      </div>
      
      {loading && <p>Loading task...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>


  )
}
