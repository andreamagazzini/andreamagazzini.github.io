import { Hero } from "../Hero/Hero";
import { EDUCATION } from "../../data/education";
import { JOB } from "../../data/job";
import { Timeline } from "../Timeline/Timeline";
import { CardGrid } from "../CardGrid";
import { PROJECTS } from "../../data/projects";

export function Main() {
  return (
    <div className="py-10 px-10 lg:px-52 space-y-52">
      <div className="pt-32 lg:pt-72 flex flex-col lg:flex-row justify-between space-y-20 lg:space-y-0">
      <div className="lg:w-1/2">
      <Hero />
      </div>
      
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
      <CardGrid 
        {...PROJECTS}
      />
    </div>
  );
}
