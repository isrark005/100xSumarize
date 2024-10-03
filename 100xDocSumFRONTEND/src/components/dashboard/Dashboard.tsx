import { Container } from "../Container";
import { MobileFormPopup } from "./MobileFormPopup";
import { SumarizeForm } from "./SumarizeForm";
import { SummaryCard } from "./SummaryCard";

export function Dashboard() {
  return (
    <main className="">
    <Container>
      <section className="flex h-[calc(100svh_-_80.8px)] max-md:flex-col">
        <div className="left-sidebar w-3/12 pr-4 pt-4 sticky top-0 h-fit max-md:hidden">
        <SumarizeForm />
        </div>
        <div className="main-section w-6/12 border-l p-4 overflow-y-auto flex flex-col gap-4 max-md:w-full">
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        <SummaryCard />
        </div>
        <div className="right-sidebar w-3/12 max-md:hidden"></div>
        <MobileFormPopup/>
      </section>
    </Container>
    </main>
  );
}
