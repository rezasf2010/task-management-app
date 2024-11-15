import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./app/store.js";
import Header from "./components/Header.jsx";
import HomePage from "./components/HomePage.jsx";
import AddTask from "./components/AddTask.jsx";
import EditTask from "./components/EditTask.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/add-task",
      element: <AddTask />,
    },
    {
      path: "/edit-task/:id",
      element: <EditTask />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Header />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      <ToastContainer theme="colored" />
    </Provider>
  </StrictMode>,
);
