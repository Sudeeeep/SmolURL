import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <div className="container mx-auto px-4">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
