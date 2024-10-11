import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import Home from "./views/home";
import Character from "./views/character";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
