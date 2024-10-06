import TextArea from "../TextArea";
import { useForm } from "react-hook-form";
import { initialResponse } from "./SumarizeForm";
import { AddSummary } from "../../api/summary";

type SummaryUpdateFormProps = {
  summaryRes: initialResponse;
  callBackHandlePublished: ()=> void
};

export function SummaryUpdateForm({ summaryRes, callBackHandlePublished }: SummaryUpdateFormProps) {
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      summary: summaryRes.docSummary,
    },
  });
  const summaryLetterCount = watch("summary").length;

  const handleSummaryUpdate = (summaryData: any) => {
   

    const reqBody = {
      _id: summaryRes._id,
      docSummary: summaryData.summary
    }
    if(summaryData){
      AddSummary(reqBody)
      .then((res)=> {
        console.log(res);
        callBackHandlePublished()
      })
      .catch((err)=> console.log(err))
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSummaryUpdate)}>
      <TextArea
        letterCount={summaryLetterCount}
        label="Summary (please make changes as per your need)"
        {...register("summary", {
          required: "Please enter your summary",
        })}
      />
      <button disabled={summaryLetterCount > 300} className="w-full bg-blue-400 text-white py-2 font-mono uppercase rounded-lg mt-4 hover:bg-blue-700 transition">
        Add my Summary
      </button>
    </form>
  );
}
