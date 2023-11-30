import { Link } from "react-router-dom";

export const CreateAccount = () => {
  return (
    <div className="max-w-full min-[770px]:max-w-[80%] mx-auto mt-24 mb-10 text-center">
      <h1 className="text-3xl font-bold mb-2">Need more features?</h1>

      <p className="mb-8">
        Sign Up to save your SmolURLs and get statistics like the number of
        users that have clicked on your link.
      </p>

      <Link
        to={"/signup"}
        className="py-4 px-8 mx-auto bg-[#E3A64A] rounded-lg"
      >
        Create Account
      </Link>
    </div>
  );
};
