import { SiNotion } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { formatTimestamp } from "../../utilities/utillities";
import { initialResponse } from "./SumarizeForm";

type SummaryCardProps = {
  cardData: initialResponse
}

export function SummaryCard({cardData}: SummaryCardProps) {
 

  return (
    <div className="card border rounded-lg px-4 py-5">
        <p className="date mb-3 font-mono text-stone-500">{formatTimestamp(cardData.updatedAt)}</p>
      <p className="line-clamp-3">{cardData.docSummary}</p>
      <div className="bottom flex justify-between mt-4">
        <div className="links-section flex gap-4">
          {cardData.notionUrl && (
            <a target="_blank" href={cardData.notionUrl} className="flex items-center gap-2 border rounded-lg px-2 py-1 text-[12px] text-stone-400 hover:text-stone-600 transition">
              <span>
                <SiNotion />
              </span>{" "}
              Doc Link
            </a>
          )}
          {cardData?.twitterUrl && (
            <a target="_blank" href={cardData.twitterUrl} className="flex items-center gap-2 border rounded-lg px-2 py-1 text-[12px] text-stone-400 hover:text-stone-600 transition">
              <span>
                <FaXTwitter />
              </span>{" "}
              Twitter Profile
            </a>
          )}
        </div>
        <div className="author-section mr-5 capitalize font-mono">— {cardData.name}</div>
      </div>
    </div>
  );
}
