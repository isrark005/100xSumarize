import { useState } from "react";
import { PopUpComp } from "../PopupComp";
import { SumarizeForm } from "./SumarizeForm";

export function MobileFormPopup() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
    <div className="mobile-bottom-bar-wrapper pt-20 pb-4 w-full fixed bottom-0 md:hidden bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,1)_50%)]">
      <div className="mobile-bottom-bar px-4">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-blue-400 px-6 py-3 text-white rounded-lg hover:bg-blue-700 transition w-full"
        >
          Sumarize a notion doc.
        </button>
      </div>
    </div>
    {isPopupOpen && (
        <PopUpComp
          children={
            <SumarizeForm />
          }
          tallModal={false}
          closePopup={() => setIsPopupOpen(false)}
          doneBtn={false}
        />
      )}
    
    </>
  );
}
