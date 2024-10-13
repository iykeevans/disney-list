import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError(); // Get the route-specific error information
  console.error(error); // Log it for debugging purposes

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
    </div>
  );
};

export default ErrorPage;
