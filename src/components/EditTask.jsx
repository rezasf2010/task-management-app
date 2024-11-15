import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { toast } from "react-toastify";

const EditTask = () => {
  // Local state for form data (title, description, and completion status)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  // Extract task ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector((state) =>
    state.task.tasks.results.find((task) => task.id === Number(id))
  );

  // useEffect to set the form data when the task is loaded
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
    }
  }, [task]);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for updating the task
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the updateTask action to update the task
    dispatch(updateTask({ id, ...formData }))
      .then(() => {
        toast.success("Task updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
        toast.error("Failed to update task");
      });
  };

  return (
    <div className="max-w-custom mx-auto">
      <div className="container max-w-[90%] w-11/12 mx-auto mt-16 p-3 border border-gray-400 flex flex-col gap-6 rounded-xl shadow-xl">
        <div className="font-bold text-gray-700 pb-2 px-2 border-b-2 border-gray-700 text-center">
          Edit Task Page
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
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-start sm:flex-row gap-4  mb-4 w-full">
            <label htmlFor="description" className="font-bold text-gray-700">
              Description:{" "}
            </label>
            <textarea
              rows="4"
              id="description"
              name="description"
              className="border border-gray-300 rounded w-full py-2 px-3 resize-none text-gray-700"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="buttons flex gap-6 justify-center ">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
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

export default EditTask;
