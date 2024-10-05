import { useRecoilValue } from "recoil";
import { useState } from "react";
import { isKiratState } from "../../store/selector";
import { initialResponse } from "./SumarizeForm";
import { SummaryCard } from "./SummaryCard";
import { MarkSummaryAsDone } from "../../api/summary";

export type SummaryWithMarkedDone = initialResponse & {
  markedDone?: boolean;
};

type SummaryCardWrapperProps = {
  summaries: SummaryWithMarkedDone[];
};

export function SummaryCardWrapper({
  summaries: initialSummaries,
}: SummaryCardWrapperProps) {
  const isKirat = useRecoilValue(isKiratState);
  const [summaries, setSummaries] =
    useState<SummaryWithMarkedDone[]>(initialSummaries);

  const handleDeleteSummary = (id: string) => {
    if (id) {
      MarkSummaryAsDone(id)
        .then((res) => {
          console.log(res);

          setSummaries((prevSummaries) =>
            prevSummaries.map((sum) =>
              sum._id === id ? { ...sum, markedDone: true } : sum
            )
          );
        })
        .catch((error) => {
          console.error("Error marking summary as done:", error);
        });
    }
  };

  return (
    <>
      {summaries.length > 0 ? (
        summaries.map((summary, index) => (
          <SummaryCard
            key={index}
            cardData={summary}
            isKirat={isKirat}
            handleDeleteCallBack={handleDeleteSummary}
          />
        ))
      ) : (
        <div>
          We all can submit our entries once kirat enables the submission
        </div>
      )}
    </>
  );
}
