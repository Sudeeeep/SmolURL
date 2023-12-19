import { useState } from "react";
import { UrlData, UserData } from "../types/types";
import axios, { AxiosError } from "axios";
import { Result } from "./Result";

export const UrlForm = ({
  token,
  user,
  setUser,
  urlData,
  setUrlData,
}: {
  token: string | null;
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  urlData: UrlData | null;
  setUrlData: React.Dispatch<React.SetStateAction<UrlData | null>>;
}) => {
  const [userUrl, setUserUrl] = useState("");
  const [error, setError] = useState({ error: false, message: "" });

  async function generateSmolUrl(e: React.SyntheticEvent) {
    e.preventDefault();
    setUrlData(null);

    if (userUrl === "") {
      setError({
        error: true,
        message: "URL cannot be blank",
      });
    } else {
      if (!user) {
        try {
          const res = await axios.post("http://localhost:3000/url", {
            url: userUrl.trim(),
            userType: "guest",
          });
          console.log(res.data);
          setError({
            error: false,
            message: "",
          });

          setUrlData({
            id: res.data.id,
            longUrl: res.data.longUrl,
            shortUrlId: res.data.shortUrlId,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
          });

          setUserUrl("");
        } catch (err) {
          if (err instanceof AxiosError) {
            console.log(err);
            if (err.message === "Network Error") {
              setError({
                error: true,
                message:
                  "Unable to generate SmolURL, please check your internet connection and try again",
              });
            } else {
              if (err.response?.data.error === "Invalid URL") {
                setError({
                  error: true,
                  message: "URL entered is not a valid URL.",
                });
              }
            }
          }
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-10 max-w-full min-[770px]:max-w-[80%] mx-auto mt-10 px-5 py-10 sm:px-16 rounded-lg border shadow-[0px_0px_4px_0px_rgb(141,137,137)]">
      <h1 className="text-3xl font-bold text-center">
        Paste the URL to be shortened
      </h1>
      <div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-2">
          <input
            type="text"
            name="longUrl"
            id="longUrl"
            placeholder="Enter the link here"
            className="py-4 px-2 rounded-lg grow"
            value={userUrl}
            onChange={(e) => setUserUrl(e.target.value)}
          />
          <button
            className="py-4 px-4 bg-[#E3A64A] rounded-lg"
            onClick={generateSmolUrl}
          >
            Generate SmolURL
          </button>
        </div>

        <Result urlData={urlData} error={error} />
      </div>
      <div>
        <p className="text-center mb-2">
          ShortURL is a free tool to shorten URLs and generate short links.
        </p>
        <p className="text-center">
          URL shortener allows to create a shortened link making it easy to
          share.
        </p>
      </div>
    </div>
  );
};
