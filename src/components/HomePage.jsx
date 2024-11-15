import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import {
  fetchTasks,
  deleteTask,
  toggleTaskCompletion,
} from "../redux/taskSlice";

const HomePage = () => {
  // Access the task state from Redux store
  const task = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = task.loading;

  // Fetch tasks when the component is mounted
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  // Handle task deletion and show notifications using toast
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId))
      .then(() => {
        toast.success("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
        toast.error("Failed to delete task");
      });
  };

  // Handle toggling of task completion status
  const handleToggleCompletion = (task) => {
    dispatch(toggleTaskCompletion(task));
  };

  return (
    <div className="max-w-custom mx-auto">
      <div className="flex items-center justify-between m-6">
        <div className="flex">
          <p className="font-semibold text-gray-700 text-xl pb-2 px-2 border-b-2 border-gray-700">
            List of Tasks
          </p>
        </div>
        <Link
          to="/add-task"
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
        >
          Add New Task
        </Link>
      </div>

      {task.loading && <Spinner loading={loading} />}
      {!task.loading && task.error ? (
        <div className="text-center">Error: {task.error}</div>
      ) : null}
      {!task.loading && task.tasks.results ? (
        <div className="flex flex-col items-center gap-4 mx-6">
          {task.tasks.results.map((task) => (
            <div
              key={task.id}
              className={` relative border ${
                task.completed
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              } rounded-lg shadow-md container pl-6 py-4`}
            >
              <div className="absolute top-[10px] right-[10px] flex items-center gap-2">
                <p className="text-sm md:text-base font-bold text-gray-700">
                  Completed:
                </p>
                <div
                  className={`relative inline-block w-12 h-6 cursor-pointer ${
                    task.completed ? "bg-green-500" : "bg-gray-300"
                  } rounded-full transition-colors duration-300`}
                  onClick={() => handleToggleCompletion(task)}
                >
                  <div
                    className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      task.completed ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
              <p className="mb-3">
                {" "}
                <span className="font-bold">Title : </span>
                {task.title}
              </p>
              <p className="ml-2 mb-3">
                {" "}
                <span className="font-bold">Description : </span>
                {task.description}
              </p>

              {/* Edit and Delete buttons */}
              <div className="flex justify-end pr-[10px] gap-4">
                <button
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  className="md:w-auto text-sm  px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="md:w-auto text-sm  px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
