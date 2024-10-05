import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { Container } from "../Container";
import { KiratControllers } from "./KiratControllers";
import { MobileFormPopup } from "./MobileFormPopup";
import { initialResponse, SumarizeForm } from "./SumarizeForm";
import { SummaryCardWrapper } from "./SummaryCardWrapper";
import { authState } from "../../store/atom";
import { FetchSummaries } from "../../api/summary";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// interface SummariesResponse {
//   summaries: initialResponse[];
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
// }
export function Dashboard() {
  const isLogin = useRecoilValue(authState);
  const [summaries, setSummaries] = useState<initialResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const summaryWrapperRef = useRef<HTMLDivElement>(null);
  const [totalNumberofPages, setTotalNumberofPages] = useState(0)

  useEffect(() => {
    const loadSummaries = async (page = 1) => {
      try {
        const data = await FetchSummaries(page); 
        setTotalNumberofPages(data.totalItems)
        setSummaries((prevSummaries) => [...prevSummaries, ...data.summaries]);
      } catch (error) {
        console.error("Error fetching summaries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSummaries(currentPage);
  }, [currentPage]); 

  useEffect(() => {
    const handleScroll = () => {
      if (summaryWrapperRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = summaryWrapperRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          setCurrentPage((prevPage) => prevPage + 1); 
        }
      }
    };

    const wrapper = summaryWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, []); 

  return (
    <main className="">
      <Container>
        <section className="flex h-[calc(100svh_-_80.8px)] max-md:flex-col">
          <div className="left-sidebar w-3/12 pr-4 pt-4 sticky top-0 h-fit max-md:hidden">
            <SumarizeForm />
          </div>
          <div
            ref={summaryWrapperRef}
            className="main-section w-6/12 border-l p-4 overflow-y-auto flex flex-col gap-4 max-md:w-full"
          >
            {!loading ? (
              <SummaryCardWrapper summaries={summaries} />
            ) : (
              <div className="mt-9 flex justify-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            )}
          </div>
          <div className="right-sidebar w-3/12 max-md:hidden">
            {isLogin && <KiratControllers totalNumberOfEntried={totalNumberofPages} />}
          </div>
          <MobileFormPopup />
        </section>
      </Container>
    </main>
  );
}
