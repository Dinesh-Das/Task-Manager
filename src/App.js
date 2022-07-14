// components
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

// react hooks
import { useState, useEffect } from "react";

// package
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const App = () => {
  // All States
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  const getTasks = JSON.parse(localStorage.getItem("tasks"));

  useEffect(() => {
    if (getTasks == null) {
      setTasks([]);
    } else {
      setTasks(getTasks);
    }
    // eslint-disable-next-line
  }, []);

  const addTask = (task) => {
    const id = uuidv4();
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    Swal.fire({
      icon: "success",
      title: "Task Added",
      text: "Your task has been added successfully",
    });

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTasks(deleteTask);

    Swal.fire({
      icon: "success",
      title: "Task Deleted",
      text: "Your task has been deleted successfully",
    });
    localStorage.setItem("tasks", JSON.stringify(deleteTask));
  };

  const editTask = (id) => {
    const text = prompt("Enter a new task");
    const day = prompt("Enter a new day & time");
    let data = JSON.parse(localStorage.getItem("tasks"));

    const myData = data.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          text: text,
          day: day,
          id: uuidv4(),
        };
      }
      return x;
    });
    Swal.fire({
      icon: "success",
      title: "Task Edited",
      text: "Your task has been edited successfully",
    });
    localStorage.setItem("tasks", JSON.stringify(myData));
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <div className="spinnerContainer">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <Header
            showForm={() => setShowAddTask(!showAddTask)}
            changeTextAndColor={showAddTask}
          />

          {showAddTask && <AddTask onSave={addTask} />}

          <h3>Number of Tasks: {tasks.length}</h3>

          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
          ) : (
            "No Task Found!"
          )}
        </div>
      )}
    </>
  );
};
export default App;
