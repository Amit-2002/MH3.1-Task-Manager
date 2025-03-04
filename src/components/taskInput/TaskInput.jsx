import React, { useState } from "react";

function TaskInput() {
  const [taskArr, setTask] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    descryption: "",
    priority: "",
    status: "",
  });

            // handleOnChange
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  }

                // handleOnSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    setTask((prev) => [...prev, formData]);
    setFormData({ title: "", descryption: "", priority: "", status: "" });
  };


                  // handleDelete
  const handleDelete = (index) => {
    setTask(prevArr => prevArr.filter(currTask => prevArr.indexOf(currTask) !== index));
  }

  // taskArr.filter(t => taskArr.indexOf(t) !== index);

  return (
    <>              
                          {/* form input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter task"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="descryption"
          name="descryption"
          value={formData.descryption}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="priority">Select Priority:</label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="">Select..</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br />
        <br />

        <label htmlFor="status">Select Status:</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Select..</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <br />
        <br />

        <button type="submit">Add</button>
    </form>

                          {/* display task */}
    {taskArr.length !==0 ? 
    taskArr.map((t,index) => {
        return (
            <DisplayTask 
            i={index} title={t.title} des={t.descryption} priority={t.priority} status={t.status}
            handleDelete={handleDelete}
            />
        )
    })
    : ""}
    </>
  );
}

export default TaskInput;


// display task component
function DisplayTask({i, title, des, priority, status, handleDelete}){
  return(
    <div>
      <h2>Title : {title}</h2>
      <p>Descryption : {des}</p>
      <h4>Priority : {priority}</h4>
      <h4>Status : {status}</h4>
      <button onClick={() => handleDelete(i)}>Delete</button>
      <button>Edit</button>
    </div>
  )
}