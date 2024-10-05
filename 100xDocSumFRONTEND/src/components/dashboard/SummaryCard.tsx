import { SiNotion } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { formatTimestamp } from "../../utilities/utillities";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { SummaryWithMarkedDone } from "./SummaryCardWrapper";

type SummaryCardProps = {
  cardData: SummaryWithMarkedDone;
  isKirat: boolean | null,
  handleDeleteCallBack: (id: string)=> void
};

export function SummaryCard({ cardData, isKirat, handleDeleteCallBack }: SummaryCardProps) {

  const handleDeleteSummary = (id: string)=> {
    handleDeleteCallBack(id)
  }

  return (
    <div className="card border rounded-lg px-4 py-5 group">
      <p className="date mb-3 font-mono text-stone-500">
        {formatTimestamp(cardData.updatedAt)}
      </p>
      <p className={`line-clamp-3 group-hover:line-clamp-none transition-all duration-100 cursor-default ${cardData?.markedDone ? 'line-through' : ''}`}>{cardData.docSummary}</p>
      <div className="bottom flex justify-start mt-4">
        <div className="links-section flex gap-4">
          {cardData.notionUrl && (
            <a
              target="_blank"
              href={cardData.notionUrl}
              className="flex items-center gap-2 border rounded-lg px-2 py-1 text-[12px] text-stone-400 hover:text-stone-600 transition"
            >
              <span>
                <SiNotion />
              </span>{" "}
              Doc Link
            </a>
          )}
          {cardData?.twitterUrl && (
            <a
              target="_blank"
              href={cardData.twitterUrl}
              className="flex items-center gap-2 border rounded-lg px-2 py-1 text-[12px] text-stone-400 hover:text-stone-600 transition"
            >
              <span>
                <FaXTwitter />
              </span>{" "}
              Twitter Profile
            </a>
          )}
        </div>
        <div className="author-section mr-5 capitalize font-mono ml-auto">
          — {cardData.name}
        </div>
      {isKirat &&  <div className="done-button overflow-hidden h-[27.5px] w-0 group-hover:w-[95px] transition-all duration-100">
          <button disabled={cardData?.markedDone} onClick={()=> handleDeleteSummary(cardData._id)} className={`flex items-center gap-2 border rounded-lg px-2 py-1 text-[12px] text-gray-700 hover:text-stone-600 transition whitespace-nowrap ${cardData?.markedDone ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <span>
              <MdOutlineMarkEmailRead />
            </span>{" "}
           {cardData?.markedDone ? "Removed" : "Remove"}
          </button>
        </div>}
      </div>
    </div>
  );
}
