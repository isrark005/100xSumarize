import { initialResponse } from "./SumarizeForm";
import { SummaryCard } from "./SummaryCard";

type SummaryCardWrapperProps = {
    summaries: initialResponse[]
}

export function SummaryCardWrapper({ summaries }: SummaryCardWrapperProps) {
    return (
        <>
            {summaries.map((summary, index) => (
                <SummaryCard key={index} cardData={summary} />
            ))}
        </>
    );
}
