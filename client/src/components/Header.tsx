import { Link } from "react-router-dom";
import smolLogo from "../assets/smol.png";
import { UserData } from "../types/types";

export const Header = ({ user }: { user?: UserData | null }) => {
  return (
    <div className="flex justify-between py-2">
      <Link to="/" className="flex items-center gap-2">
        <img src={smolLogo} alt="SmolURL" className="w-10" />
        <h1 className="text-3xl sm:text-4xl">SmolURL</h1>
      </Link>

      {!user && (
        <Link
          to={"/login"}
          className="bg-[#E3A64A] px-3 py-1 sm:px-6 sm:py-2 rounded-md"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};
