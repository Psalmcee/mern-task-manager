import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/auth/sign-up";
import Home from "./components/home";
import AllTasks from "./components/tasks/all-tasks";
import Login from "./components/auth/login";
import GetTask from "./components/tasks/get-task";
import ForgotPassword from "./components/reset/forgot-password";
import ResetPassword  from "./components/reset/reset-password";
import CreateTask from "./components/tasks/create-task";
import Dashboard from "./components/user-dashboard/dashboard";
import UpdateTask from "./components/tasks/update-task";
import Logout from "./components/auth/logout";
import DeleteTask from "./components/tasks/delete-task";


function App() {
  return (
    <div className="App">
      <h1>React App</h1>
      <BrowserRouter>  
      <Home />       
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" exact element={<SignUp />} />
          <Route path="/tasks/:id" element={<GetTask />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/delete-task/:id" element={<DeleteTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password"  element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
