import React, { useState } from "react";
import styles from "./taskInput.module.css";

function TaskInput() {
  const [taskArr, setTask] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    descryption: "",
    priority: "",
    status: "",
  });

  const [editting, setEditting] = useState();

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
    setTask((prevArr) =>
      prevArr.filter((currTask) => prevArr.indexOf(currTask) !== index)
    );
  };

  // handleEdit
  const handleEdit = (i) => {
    setEditting(i);
    console.log(taskArr[i]);
    setFormData({
      title: taskArr[i].title,
      descryption: taskArr[i].descryption,
      priority: taskArr[i].priority,
      status: taskArr[i].status,
    });
  };

  // handleUpdate
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(editting);
    setTask(
      taskArr.map((task, indx) =>
        indx === editting ? { ...task, ...formData } : task
      )
    );
    setFormData({ title: "", descryption: "", priority: "", status: "" });
    setEditting(null);
  };

  return (
    <>
      {/* form input */}
      <div className={styles.formCont}>
        <form onSubmit={Number.isInteger(editting) ? handleUpdate : handleSubmit}>
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

          <label htmlFor="priority">Priority:</label>
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

          <label htmlFor="status">Status:</label>
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

          <button type="submit">
            {Number.isInteger(editting) ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>

      {/* pagination */}
      {taskArr.length > 0 ? (
        <Pagination taskArr={taskArr} handleDelete={handleDelete} handleEdit={handleEdit}/>
      ) : (
        ""
      )}
    </>
  );
}

export default TaskInput;

// display task component
function DisplayTask({
  i,
  title,
  des,
  priority,
  status,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.descryption}>
        <h4>{title}</h4>
        <p>{des}</p>
        <h4>{priority}</h4>
        <h4>{status}</h4>
      </div>

      <div className={styles.btns}>
        <button onClick={() => handleDelete(i)}>Delete</button>
        <button onClick={() => handleEdit(i)}>Edit</button>
      </div>
    </div>
  );
}

// pagination component
function Pagination({ taskArr, handleDelete, handleEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = taskArr.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(taskArr.length / tasksPerPage);

  //handlePageClick
  const handlePageClick = (pageNumber) => {
    setCurrentPage((prev) => {
      console.log(currentPage);
      return pageNumber;
    });
  };

  // handlePrevious
  const handlePrevious = () => {
    setCurrentPage((prev) => {
      Math.max(prev - 1, 1);
    });
  };

  // handleNext
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      {/* display task */}
      {currentTasks.length !== 0
        ? currentTasks.map((t, index) => {
            return (
              <DisplayTask
                key={index}
                i={index}
                title={t.title}
                des={t.descryption}
                priority={t.priority}
                status={t.status}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })
        : ""}

      <div className={styles.pagesBtnCon}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            onClick={() => handlePageClick(i + 1)}
            className={currentPage === i + 1 ? styles.activePageBtn : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={Boolean(currentPage === totalPages)}
        >
          &gt;
        </button>
      </div>
    </>
  );
}
