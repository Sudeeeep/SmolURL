import { useRef, useState } from "react";
import { ErrorType, UrlData } from "../types/types";

export const Result = ({
  urlData,
  error,
}: {
  urlData: UrlData | null;
  error: ErrorType;
}) => {
  const [btnText, setBtnText] = useState("Copy SmolURL");
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(urlData);
  console.log(error);

  function handleCopy() {
    setBtnText("URL copied");

    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(inputRef.current.value);
    }

    setTimeout(() => {
      setBtnText("Copy SmolURL");
    }, 5000);
  }

  if (urlData) {
    return (
      <div className="mt-10">
        <h1 className="text-center mb-2 text-xl font-bold">Your SmolURL:</h1>
        <div className="sm:w-1/2 m-auto flex flex-col justify-center gap-4 sm:flex-row sm:gap-2">
          <input
            type="text"
            name="shortUrl"
            id="shortUrl"
            ref={inputRef}
            defaultValue={`http://${window.location.host}/${urlData?.shortUrlId}`}
            className="py-4 px-2 rounded-lg grow line-clamp-1"
          />
          <button
            className="py-4 px-4 bg-[#E3A64A] rounded-lg"
            onClick={handleCopy}
          >
            {btnText}
          </button>
        </div>

        <p className="text-center mt-4 mb-2">
          Long URL:
          <a href={urlData?.longUrl} className="underline line-clamp-1">
            {urlData?.longUrl}
          </a>
        </p>
      </div>
    );
  }

  if (error.error) {
    return (
      <>
        <p className="text-center text-red-500 mt-2">{error.message}</p>
      </>
    );
  }
};
