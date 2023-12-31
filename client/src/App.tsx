import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import { useEffect, useState } from "react";
import { UrlData, UserData } from "./types/types";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [urlData, setUrlData] = useState<UrlData | null>(null);
  console.log(user);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, [token]);

  console.log(token);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          token={token}
          setUser={setUser}
          user={user}
          urlData={urlData}
          setUrlData={setUrlData}
        />
      ),
    },
    {
      path: "/login",
      element: <Login setToken={setToken} />,
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
