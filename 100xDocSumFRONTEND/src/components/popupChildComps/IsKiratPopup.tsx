import { useState } from "react";
import InputBox from "../InputBox";
import { useRecoilState } from "recoil";
import { authState } from "../../store/atom";
import { LoginKirat } from "../../api/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type IsKiratPopupProps = {
    closePopupCallBackFnc: ()=> void
}

export function IsKiratPopup({closePopupCallBackFnc}: IsKiratPopupProps) {
  const [passwordValue, setPasswordValue] = useState("");
  const [_, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('')
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (passwordValue){
      LoginKirat(passwordValue)
        .then((_) => {
            setAuth(true)
            closePopupCallBackFnc()
        })
        .catch(() => {
            setError("Incorrect password!")
            
        })
        .finally(() => setIsLoading(false));
    }else {
        setError("Please enter password")
    }
  };
  return (
    <div className="popup-inner-wrapper pb-6">
      <form onSubmit={handleLogin}>
        <InputBox
          type="password"
          label="Enter the password I sent you on Twitter from: isrark005"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.currentTarget.value)}
          errorMessage={error}
        />
        <button
          type="submit"
          className="bg-blue-400 px-6 py-3 mt-3 text-white rounded-lg hover:bg-blue-700 transition"
        >
         {isLoading ? <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin duration-500 " color="white" /> {` we are trying :)`}</span> : "Let me in!"}
        </button>
      </form>
    </div>
  );
}
