import { SiNotion } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { formatTimestamp } from "../../utilities/utillities";

export function SummaryCard() {
  const cardData = {
    _id: "66eadb47a9c166c878b42f70",
    name: "israr",
    notionUrl:
      "https://phase-mice-483.notion.site/Question-10222bebb06e8083986ccef91690316d",
    notionData:
      "I've been working in 2 startups both are quite early don't compensate much I learnt a lot from both of these jobs but now I don't have enough time to try something new one of the startup said they'll increase my compensation after they get funding but I am not sure how its gonna go should I keep working for some more months or should I leave them and look for better opportunity, I've build the whole frontend so I am optimistic if this goes well it'll be good for me  ",
    docSummary:
      "Israr is torn between staying at a startup that promised increased compensation after funding or leaving for a better opportunity. They built the entire frontend and are optimistic about their skills, but unsure about the funding timeline.  Israr needs to decide whether to stay for more months hoping for the promised raise or look for new opportunities. \n",
    createdAt: "2024-09-18T13:53:11.602Z",
    updatedAt: "2024-09-18T13:53:11.602Z",
    twitterURL: "https://twitter.com/isrark005",
  };

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
          {cardData?.twitterURL && (
            <a target="_blank" href={cardData.twitterURL} className="flex items-center gap-2 border rounded-lg px-2 py-1 text-[12px] text-stone-400 hover:text-stone-600 transition">
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
