import { useState } from "react";
import { Header } from "./Header";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordType, setPasswordType] = useState({
    password: "password",
    confirmPassword: "password",
  });
  const [error, setError] = useState({ error: false, message: "" });

  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError({
        error: true,
        message: "Passwords do not match. Please try again",
      });
    } else {
      setError({
        error: false,
        message: "",
      });

      try {
        await axios.post("http://localhost:3000/api/users", {
          email: signUpForm.email,
          password: signUpForm.password,
        });

        setSignUpForm({
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.message === "Network Error") {
            setError({
              error: true,
              message:
                "Unable to reach server. Please check you internet connection",
            });
          }
          if (
            err.response?.data.name === "ValidationError" &&
            err.response.data.errors.email
          ) {
            setError({
              error: true,
              message: "A user is already registered with this e-mail address",
            });
          }
          if (err.response?.data.error === "PasswordValidation") {
            setError({
              error: true,
              message: err.response.data.message,
            });
          }
        }
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="max-w-full min-[770px]:max-w-[80%] mx-auto mt-10 mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Need more features?</h1>

        <p className="mb-8">
          Sign Up to save your SmolURLs and get statistics like the number of
          users that have clicked on your link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 m-auto max-w-xl mb-4"
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={signUpForm.email}
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, email: e.target.value })
            }
            className="py-4 px-2 rounded-lg grow"
            required
          />
          <div className="relative">
            <input
              type={passwordType.password}
              name="password"
              id="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, password: e.target.value })
              }
              className="py-4 px-2 rounded-lg w-full"
              required
            />
            <span
              className="absolute py-4 right-3"
              onClick={() =>
                passwordType.password === "password"
                  ? setPasswordType({ ...passwordType, password: "text" })
                  : setPasswordType({ ...passwordType, password: "password" })
              }
            >
              {passwordType.password === "password" ? (
                <FaEye size={22} />
              ) : (
                <FaEyeSlash size={22} />
              )}
            </span>
          </div>
          <div className="relative">
            <input
              type={passwordType.confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={signUpForm.confirmPassword}
              onChange={(e) =>
                setSignUpForm({
                  ...signUpForm,
                  confirmPassword: e.target.value,
                })
              }
              className="py-4 px-2 rounded-lg w-full"
              required
            />
            <span
              className="absolute py-4 right-3"
              onClick={() =>
                passwordType.confirmPassword === "password"
                  ? setPasswordType({
                      ...passwordType,
                      confirmPassword: "text",
                    })
                  : setPasswordType({
                      ...passwordType,
                      confirmPassword: "password",
                    })
              }
            >
              {passwordType.confirmPassword === "password" ? (
                <FaEye size={22} />
              ) : (
                <FaEyeSlash size={22} />
              )}
            </span>
          </div>
          {error.error && <div className="text-red-500">{error.message}</div>}
          <button className="py-4 px-8 mx-auto bg-[#E3A64A] rounded-lg">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
