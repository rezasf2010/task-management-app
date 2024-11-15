import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTask } from "../redux/taskSlice";
import { toast } from "react-toastify";

const AddTask = () => {
  // Local state for task title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = { title, description };

    // Dispatch the createTask action to add the task and handle success/error
    dispatch(createTask(newTask))
      .then(() => {
        toast.success("Task added successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to create task:", error);
        toast.error("Failed to create task");
      });
  };

  return (
    <div className="max-w-custom mx-auto">
      <div className="container max-w-[90%] w-11/12 mx-auto mt-16 p-3 border border-gray-400 flex flex-col gap-6 rounded-xl shadow-xl">
        <div className="font-bold text-gray-700 pb-2 px-2 border-b-2 border-gray-700 text-center">
          Add Task Page
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start sm:flex-row gap-4 sm:items-center mb-4 w-full">
            <label
              htmlFor="title"
              className=" font-bold text-gray-700  flex-shrink-0"
            >
              Title:{" "}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 rounded-lg h-10 px-2 text-gray-700 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col items-start sm:flex-row gap-4  mb-4 w-full">
            <label htmlFor="desc" className="font-bold text-gray-700">
              Description:{" "}
            </label>
            <textarea
              rows="4"
              id="desc"
              name="desc"
              className="border border-gray-300 rounded w-full py-2 px-3 resize-none text-gray-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="buttons flex gap-6 justify-center ">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Task
            </button>

            <Link
              to="/"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Return Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
