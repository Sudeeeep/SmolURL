import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { useState } from "react";
import { UrlData, UserData } from "./types/types";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [urlData, setUrlData] = useState<UrlData | null>(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home user={user} urlData={urlData} setUrlData={setUrlData} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="container mx-auto px-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
