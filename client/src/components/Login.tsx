import { useState } from "react";
import { Header } from "./Header";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({
  setToken,
}: {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState({ error: false, message: "" });

  const navigate = useNavigate();

  async function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      console.log(res);

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setLoginForm({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.message === "Network Error") {
          setError({
            error: true,
            message:
              "Unable to reach server. Please check you internet connection",
          });
        } else {
          setError({
            error: true,
            message: err?.response?.data.error,
          });
        }
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="max-w-full min-[770px]:max-w-[80%] mx-auto mt-10 mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">WELCOME BACK!</h1>

        <p className="mb-8">Sign In to your SmolURL account.</p>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 m-auto max-w-xl mb-4"
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
            className="py-4 px-2 rounded-lg grow"
            required
          />
          <div className="relative">
            <input
              type={passwordType}
              name="password"
              id="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              className="py-4 px-2 rounded-lg w-full"
              required
            />
            <span
              className="absolute py-4 right-3"
              onClick={() =>
                passwordType === "password"
                  ? setPasswordType("text")
                  : setPasswordType("password")
              }
            >
              {passwordType === "password" ? (
                <FaEye size={22} />
              ) : (
                <FaEyeSlash size={22} />
              )}
            </span>
          </div>

          {error.error && <div className="text-red-500">{error.message}</div>}
          <button className="py-4 px-28 mx-auto bg-[#E3A64A] rounded-lg">
            Log In
          </button>

          <p>
            Don't have an account?
            <Link
              to="/signup"
              className="text-[#dd9323] hover:underline cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
