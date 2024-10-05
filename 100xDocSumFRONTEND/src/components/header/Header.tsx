import { useState } from "react";
import { Container } from "../Container";
import { PopUpComp } from "../PopupComp";
import { IsKiratPopup } from "../popupChildComps/IsKiratPopup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isKiratState } from "../../store/selector";
import { authState } from "../../store/atom";
import { LogoutKirat } from "../../api/auth";

export function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isKirat = useRecoilValue(isKiratState);
  const setAuth = useSetRecoilState(authState);
  const closePopupCallBackFnc = () => {
    setIsPopupOpen(false);
  };

  const handlegout = ()=> {
    LogoutKirat()
    .then((res) => {
      console.log(res.message); 
      setAuth(null); 
    })
    .catch((error) => {
      console.error("Logout failed:", error.message || error);
  
    });
  }
  return (
    <header className="border-b">
      <Container className="max-md:px-4">
        <nav className="flex justify-between py-4 items-center">
          <div className="logo font-mono bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[375px]:block">
            100xSumarize
          </div>
          <div>
           {!isKirat ? <button
              onClick={() => setIsPopupOpen(true)}
              className="bg-blue-400 px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Are you kirat?!
            </button> : <><span className="mr-4">Hello Kirat!</span> <button
              onClick={handlegout}
              className="bg-blue-400 px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button></>}
          </div>
        </nav>
      </Container>
      {isPopupOpen && (
        <PopUpComp
          children={
            <IsKiratPopup closePopupCallBackFnc={closePopupCallBackFnc} />
          }
          tallModal={false}
          closePopup={() => setIsPopupOpen(false)}
          doneBtn={false}
        />
      )}
    </header>
  );
}
