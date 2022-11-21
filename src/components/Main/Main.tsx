import { Hero } from "../Hero/Hero";
import { EDUCATION } from "../../data/education";
import { JOB } from "../../data/job";
import { Timeline } from "../Timeline/Timeline";

export function Main() {
  return (
    <div className="py-10 px-10 lg:px-52 space-y-52">
      <Hero />
      <div className="flex justify-center flex-col space-y-40 sm:flex-row sm:space-x-40 sm:space-y-0">
      <Timeline
        title={JOB.title}
        points={JOB.cards}
      />
      <Timeline
        title={EDUCATION.title}
        points={EDUCATION.cards}
      />
      </div>
    </div>
  );
}
