import { useState } from "react";
import Swal from "sweetalert2";

const AddTask = ({ onSave }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text && !day) {
      Swal.fire({
        icon: "error",
        title: "Oops.....",
        text: "Please enter a task and a day",
      });
    } else if (!text && day) {
      Swal.fire({
        icon: "error",
        title: "Oops.....",
        text: "Please enter a task",
      });
    } else if (text && !day) {
      Swal.fire({
        icon: "error",
        title: "Oops.....",
        text: "Please enter a day",
      });
    } else {
      onSave({ text, day });
    }
    setText("");
    setDay("");
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Enter a task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input
          type="text"
          placeholder="Enter a day and time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <input type="submit" value="Add Task" className="btn btn-block" />
    </form>
  );
};
export default AddTask;
