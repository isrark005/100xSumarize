import { useSetRecoilState } from "recoil";
import "./App.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Header } from "./components/header/Header";
import { authState, submissionFlagState } from "./store/atom";
import { useEffect, useState } from "react";
import { VerifyKirat } from "./api/auth";
import { SubmissionStatus } from "./api/submissionControll";

function App() {
  const setAuth = useSetRecoilState(authState);
  const setSubmissionFlag = useSetRecoilState(submissionFlagState);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Separate loading states
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(true); 

  useEffect(() => {
    // Verify Kirat Auth
    VerifyKirat()
      .then(() => setAuth(true))
      .catch((err) => {
        setAuth(null);
        console.log(err);
      })
      .finally(() => setIsAuthLoading(false));

    // Check submission status
    SubmissionStatus()
      .then((res) => {
        const currentStatus = res?.acceptingSubmissions as boolean;
        setSubmissionFlag(currentStatus);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsSubmissionLoading(false));
  }, [setAuth, setSubmissionFlag]);

  
  if (isAuthLoading || isSubmissionLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }




  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
