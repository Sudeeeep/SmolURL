import { CreateAccount } from "./CreateAccount";
import { Header } from "./Header";
import { UrlForm } from "./UrlForm";

export const Home = () => {
  return (
    <>
      <Header />
      <UrlForm />
      <CreateAccount />
    </>
  );
};
