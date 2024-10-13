import { createBrowserRouter } from "react-router-dom";

import Home from "@/views/home";
import Character from "@/views/character";
import ErrorPage from "@/views/error-page";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/character/:id",
    element: <Character />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;
