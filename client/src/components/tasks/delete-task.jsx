import { useParams, useNavigate  } from 'react-router-dom';
import { useEffect } from "react";

export default function DeleteTask() {

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteTask = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5555/tasks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }

                });
               ;
            } catch (error) {
                console.error(error);
            }

            setTimeout(() => {window.location.href = '/tasks'}, 500)
        }
        deleteTask()
    },[id])

    return (
    <div>
      <h1>Delete Task</h1>
      <p>Task deleted</p>
    </div>
  );
}