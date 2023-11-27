export const UrlForm = () => {
  return (
    <div className="flex flex-col gap-10 max-w-full min-[770px]:max-w-[80%] mx-auto mt-10 px-5 py-10 sm:px-16 rounded-lg border shadow-[0px_0px_4px_0px_rgb(141,137,137)]">
      <h1 className="text-3xl font-bold text-center">
        Paste the URL to be shortened
      </h1>
      <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-2">
        <input
          type="text"
          name="longUrl"
          id="longUrl"
          placeholder="Enter the link here"
          className="py-4 px-2 rounded-lg grow"
        />
        <button className="py-4 px-4 bg-[#E3A64A] rounded-lg">
          Generate SmolURL
        </button>
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
