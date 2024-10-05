import { useState } from "react";
import SwitchBtn from "../SwitchBtn";
import { SubmissionFlagToggle } from "../../api/submissionControll";
import { submissionFlagState } from "../../store/atom";
import { useRecoilState } from "recoil";

type KiratControllersProps = {
  totalNumberOfEntried: number
}

export function KiratControllers({totalNumberOfEntried}: KiratControllersProps) {
  const [submissionFlag, setSubmissionFlag] = useRecoilState(submissionFlagState);
  const [checked, setChecked] = useState(submissionFlag);

  
  const handleSummaryFlag = () => {
    setChecked(!checked)
    SubmissionFlagToggle()
    .then((res)=> {
      setSubmissionFlag(res.submissionFlag as boolean)
    })
    .catch((err)=> {
      console.log(err);
    })
  };

 

  console.log(checked);
  return (
    <div className="kirat-controllers p-3 pr-0 space-y-4">
      <div className="submission-switch flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
        <h3 className="font-mono text-[18px]">Receive Submission</h3></div>
        <SwitchBtn onChange={handleSummaryFlag} checked={checked} />
      </div>
      <div className="submission-switch flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
        <h3 className="font-mono text-[18px]">Total Entries: </h3></div>
        <p>{totalNumberOfEntried}</p>
      </div>
    </div>
  );
}
