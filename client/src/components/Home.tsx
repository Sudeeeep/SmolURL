import { CreateAccount } from "./CreateAccount";
import { Header } from "./Header";
import { UrlForm } from "./UrlForm";
import { UrlData, UserData } from "../types/types";
import { useEffect } from "react";
import axios from "axios";

export const Home = ({
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
  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  async function fetchUserDetails() {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/users/userDetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header user={user} />
      <UrlForm
        token={token}
        setUser={setUser}
        user={user}
        urlData={urlData}
        setUrlData={setUrlData}
      />
      {!user && <CreateAccount />}
    </>
  );
};
