import { useRef } from "react";
import { CgClose } from "react-icons/cg";

type PopUpCompProps = {
  closePopup: React.MouseEventHandler<HTMLSpanElement>;
  children: string | JSX.Element | undefined;
  popUpTitle?: string;
  tallModal: boolean;
  doneBtn?: boolean;
};
export function PopUpComp({
  closePopup,
  children,
  popUpTitle,
  tallModal,
  doneBtn = true,
}: PopUpCompProps) {
  const modulRef = useRef<HTMLDivElement>(null);
  const closeModule = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modulRef.current === e.target) {
      closePopup(e);
    }
  };

  return (
    <div
      ref={modulRef}
      onClick={closeModule}
      className="popup-wrapper fixed inset-0 bg-[#212735] bg-opacity-85  flex items-center justify-center z-[1000]"
    >
      <div
        className={`popup-main relative w-[560px] bg-white px-8 ${doneBtn ? "py-6" : "pt-6"} ${tallModal ? "h-[100dvh] overflow-y-auto overflow-x-hidden flex flex-col justify-start max-md:m-3" : "rounded-xl max-w-[80%]"}`}
      >
        <span
          onClick={closePopup}
          className={`cursor-pointer  w-10 bg-white ${tallModal ? "justify-start mb-6" : "absolute aspect-square -top-[67px] left-[45%] justify-center"} flex  items-center rounded-full`}
        >
          <CgClose size={24} />
        </span>
        <h4 className="popup-title text-[#6D7486] text-[10px] font-semibold">
          {popUpTitle}
        </h4>
        <div className="text-[14px] break-words">{children}</div>
        {tallModal && doneBtn && (
          <div className="btn-container border-t border-[#ECECEC] mt-auto">
            <button
              onClick={closePopup}
              children="Done"
              className="bg-[#212735] text-white mt-4 float-right"
            />
          </div>
        )}
      </div>
    </div>
  );
}