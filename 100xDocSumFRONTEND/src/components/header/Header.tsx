import { useState } from "react";
import { Container } from "../Container";
import { PopUpComp } from "../PopupComp";
import { IsKiratPopup } from "../popupChildComps/IsKiratPopup";

export function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <header className="border-b">
      <Container className="">
        <nav className="flex justify-between py-4 items-center">
            <div className="logo font-mono bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[375px]:block">100xSumarize</div>
            <div><button onClick={()=> setIsPopupOpen(true)} className="bg-blue-400 px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition">Are you kirat?!</button></div>
        </nav>
      </Container>
      {isPopupOpen && (
          <PopUpComp
            children={
             <IsKiratPopup/>
            }
            tallModal={false}
            closePopup={() => setIsPopupOpen(false)}
            doneBtn={false}
          />
        )}
    </header>
  );
}
