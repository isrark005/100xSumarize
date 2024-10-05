import { useForm } from "react-hook-form";
import InputBox from "../InputBox";
import { MyQuestion } from "../../api/summary";
import { useState } from "react";
import { SummaryUpdateForm } from "./SummaryUpdateForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { submissionFlagState } from "../../store/atom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

type formDataT = {
  name: string;
  notionUrl: string;
  twitterUrl: string;
};

export type initialResponse = {
  name: string;
  notionUrl: string;
  notionData: string;
  docSummary: string;
  twitterUrl: string;
  status: "draft" | "published";
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  alreadyExists?: boolean;
};

export function SumarizeForm() {
  const { handleSubmit, register } = useForm<formDataT>();
  const [gotSummary, setGotSummary] = useState<initialResponse | null>(null);
  const [alreadyExsist, setAlreadyExsist] = useState(false);
  const [published, setPublished] = useState(false);
  const [loadingStage, setLoadingStage] = useState<string | null>(null);
  const submissionFlag = useRecoilValue(submissionFlagState);

  const submitForm = (formData: formDataT) => {
    setLoadingStage("Scraping data from notion page...");
  
    // Simulate scraping phase
    setTimeout(() => {
      setLoadingStage("Summarizing your question...");
  
      MyQuestion(formData)
        .then((res: initialResponse) => {
          setGotSummary(res);
          setLoadingStage(null);
  
          if (res?.alreadyExists) setAlreadyExsist(true);
        })
        .catch((error: any) => {
          
          if (error.message === "Not accepting entries currently") {
            console.log("Submissions are closed. Please try again later.");
          } else {
            console.error("An error occurred while submitting:", error);
          }
  
          
          setLoadingStage(null);
        });
    }, 3000);
  };
  

  const handlePublished = () => {
    setGotSummary(null);
    setAlreadyExsist(false);
    setLoadingStage(null);
    setPublished(true);
    toast.success('Published question with summary successfully');
  };

  const resetForm = () => {
    setGotSummary(null);
    setAlreadyExsist(false);
    setPublished(false);
    setLoadingStage(null);
  };

  return (
    <div className="form-wrapper border px-4 py-6 mb-5 rounded-lg">
      {alreadyExsist && (
        <p className="text-[10.5px] text-gray-600 font-mono">
        Existing entry found! Rewrite a summary or publish a different notion page.{" "}
        <span onClick={resetForm} className="text-red-600 hover:underline cursor-pointer">&lt;Reset&gt;</span>
      </p>
      )}
      
      {!gotSummary ? (
        <form onSubmit={handleSubmit(submitForm)}>
          <fieldset disabled={!submissionFlag}>
          <InputBox
            label="Name"
            {...register("name", {
              required: "Please enter your name",
            })}
            disableField={!submissionFlag}
          />
          <InputBox
            label="Notion Public URL"
            {...register("notionUrl", {
              required: "Please enter the Notion URL",
            })}
            disableField={!submissionFlag}
          />
          <InputBox
            label="Twitter (Optional)"
            {...register("twitterUrl", {
              required: false,
            })}
            disableField={!submissionFlag}
          />
          <button className={`w-full ${submissionFlag ? "bg-blue-400 hover:bg-blue-700" : "bg-gray-400"} text-white py-2 font-mono uppercase rounded-md mt-4  transition`}>
            Continue
          </button>
          </fieldset>
        </form>
        ) : (
        <SummaryUpdateForm summaryRes={gotSummary} callBackHandlePublished={handlePublished} />
      )}
      
      {loadingStage && <p className="text-[12px] font-mono text-green-600 flex items-center gap-2 mt-2.5"><AiOutlineLoading3Quarters className="animate-spin" /> {loadingStage}</p>} 
      {published && <p>Published Successfully!</p>}
    </div>
  );
}
