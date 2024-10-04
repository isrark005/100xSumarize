import { useState, useEffect } from "react";
import SwitchBtn from "../SwitchBtn";

export function KiratControllers() {
  const [checked, setChecked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let timeout: number;
   
    if (clickCount === 1) {
      timeout = setTimeout(() => {
        setClickCount(0);
      }, 1000);
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [clickCount]);

  const handleSummaryFlag = () => {
    if (checked) {
      setChecked(false);
      setClickCount(0);
    } else if (!checked) {
      setClickCount((prev) => prev + 1);
      if (clickCount >= 1) {
        setChecked(true);
        setClickCount(0);
      }
    }
  };

  console.log(checked);
  return (
    <div className="kirat-controllers p-3 pr-0">
      <div className="submission-switch flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
        <p className="text-[11px]">DOUBLE CLICK TO ENABLE</p>
        <h3 className="font-mono text-[18px]">Submission Switch</h3></div>
        <SwitchBtn onChange={handleSummaryFlag} checked={checked} />
      </div>
    </div>
  );
}
