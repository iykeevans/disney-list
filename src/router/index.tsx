import { createBrowserRouter } from "react-router-dom";

import Home from "@/views/home";
import Character from "@/views/character";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/character/:id",
      element: <Character />,
    },
    {
      path: "*",
      element: <div>Not Found</div>,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

export default router;
