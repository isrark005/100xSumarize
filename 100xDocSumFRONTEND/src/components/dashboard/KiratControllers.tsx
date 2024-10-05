import { useState } from "react";
import SwitchBtn from "../SwitchBtn";
import { SubmissionFlagToggle } from "../../api/submissionControll";
import { submissionFlagState } from "../../store/atom";
import { useRecoilState } from "recoil";


export function KiratControllers() {
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
    <div className="kirat-controllers p-3 pr-0">
      <div className="submission-switch flex justify-between items-center py-2 px-4 border rounded-lg shadow-md">
        <div className="content flex flex-col">
        <h3 className="font-mono text-[18px]">Receive Submission</h3></div>
        <SwitchBtn onChange={handleSummaryFlag} checked={checked} />
      </div>
    </div>
  );
}
