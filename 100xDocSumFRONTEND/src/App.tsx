import { useRecoilState } from "recoil";
import "./App.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Header } from "./components/header/Header";
import { authState } from "./store/atom";
import { useEffect, useState } from "react";
import { VerifyKirat } from "./api/auth";

function App() {
  const [_, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    VerifyKirat()
      .then((_) => setAuth(true))
      .catch((err) => {
        setAuth(null);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <>Loading...</>;
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
