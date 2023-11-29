import { CreateAccount } from "./CreateAccount";
import { Header } from "./Header";
import { UrlForm } from "./UrlForm";
import { UrlData, UserData } from "../types/types";

export const Home = ({
  user,
  urlData,
  setUrlData,
}: {
  user: UserData | null;
  urlData: UrlData | null;
  setUrlData: React.Dispatch<React.SetStateAction<UrlData | null>>;
}) => {
  return (
    <>
      <Header />
      <UrlForm user={user} urlData={urlData} setUrlData={setUrlData} />
      <CreateAccount />
    </>
  );
};
