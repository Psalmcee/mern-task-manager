import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  
  const username = localStorage.getItem('name');
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5555/tasks/', {
          headers: {
            Authorization: `Bearer ${token}`
          }  
        });

        if (response.ok) {
          const { msg } = await response.json();
         // console.log(msg)
          setTasks(msg.map(task => ({
            id: task._id,
            name: task.task,
            description: task.description,
            completed: task.completed,
          })));

        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTasks();
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        <p> No tasks available, please add task</p>
    <Link to={"/create-task"}><h5>Create Task</h5></Link>
      </div>
    )
  }

  const bgBoxStyle = { 
    color: "red", border: "solid #507661", marginTop: "8rem", marginLeft: "32px", marginRight: "32px", padding: "16px", paddingBottom: "16px", backgroundColor: "#507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", display: "flex", flexDirection: "column" 
  }

  const boxStyle = {
    display: "flex", flexDirection: "column", fontSize: "large",margin: "12px", margin: "0px 24px", padding: "16px", paddingBottom: "16px", color: "white", backgroundColor: "#765052", border: "solid #507661", borderRadius: "8px", boxShadow: "0px 0px 8px #507661", marginTop: "16px" , marginLeft: "16px", marginRight: "16px"  , padding: "16px", paddingBottom: "16px"
  }

  return (
    <div style={bgBoxStyle}>
      <div style={{ width: "100%", color: "white", display: "flex", justifyContent: "right" }}>
        <div style={{ width: "max-content", color: "white", display: "flex", alignItems: "center" }}>
          <Link to={'/dashboard'}>
            <button style={{ padding: "4px 12px", paddingTop: "8px", color: "white", paddingBottom: "8px", backgroundColor: "#4A0404", border: "none", borderRadius: "4px", fontSize: "large", }}>Dashboard</button>
          </Link>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center", marginTop: "16px", marginLeft: "16px", marginRight: "16px"}}>
        <h1>All Tasks</h1>
      </div>
           
      <ul style={boxStyle}>
        {tasks.map(task => (
         <li key={task.id} style={{ backgroundColor: "wheat", margin: "8px", padding: "16px", listStyleType: "none" }}>
          <Link to={`/tasks/${task.id}`} style={{ textDecoration: "none", color: "black"}}>
            <p>Name: {task.name}</p>
            <p>Description: {task.description}</p>
            <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
          </Link></li>
        ))}
      </ul>
    </div>
  );
}