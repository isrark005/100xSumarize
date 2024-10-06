import { useState } from "react";
import SwitchBtn from "../SwitchBtn";
import { SubmissionFlagToggle } from "../../api/submissionControll";
import { submissionFlagState } from "../../store/atom";
import { useRecoilState } from "recoil";
import { ClearData } from "../../api/summary";
import { toast } from "sonner";

type KiratControllersProps = {
  totalNumberOfEntried: number;
  clearSummaryCallBack: () => void;
};

export function KiratControllers({
  totalNumberOfEntried,
  clearSummaryCallBack,
}: KiratControllersProps) {
  const [submissionFlag, setSubmissionFlag] =
    useRecoilState(submissionFlagState);
  const [checked, setChecked] = useState(submissionFlag);

  const handleSummaryFlag = () => {
    setChecked(!checked);
    SubmissionFlagToggle()
      .then((res) => {
        setSubmissionFlag(res.submissionFlag as boolean);
        toast.success(res?.message)
      })
      .catch((err) => {
        console.log(err);
      });
    };
    
    const handleClearDatabase = () => {
      ClearData()
      .then((res) => {
        console.log(res);
        clearSummaryCallBack();
        toast.success('Cleared summary Data successfully!')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="kirat-controllers p-3 pr-0 space-y-4">
      <div className="submission-switch flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
          <h3 className="font-mono text-[18px]">Receive Submission </h3>
        </div>
        <SwitchBtn onChange={handleSummaryFlag} checked={checked} />
      </div>
      <div className="total-entries flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
          <h3 className="font-mono text-[18px]">Total Entries: </h3>
        </div>
        <p>{totalNumberOfEntried}</p>
      </div>
      <div className="clear-database flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
          <h3 className="font-mono text-[18px]">Start fresh! </h3>
        </div>
        <button
          onClick={handleClearDatabase}
          className="bg-red-600 px-4 py-1 rounded-lg text-white font-mono text-[12px]"
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
