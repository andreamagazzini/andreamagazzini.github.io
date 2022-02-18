import bachelor from "../../assets/bachelor.png";
import suitcase from "../../assets/suitcase.png";
import { career } from "../../data";
import Card from "../Card/Card";

export const Career = () => {
  return (
    <div>
      <h2 className="text-6xl mb-20 text-center">{career.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden p-4 gap-8">
        {career.jobs.map((job) => (
          <Card 
            key={job.company}
            top={[<img className="h-10" src={suitcase} />, job.company]}
            header={job.title}
            body={job.description}
            bottom={[job.whereAndWhen]}
          />
        ))}
        {career.schools.map((school) => (
          <Card 
            key={school.title}
            top={[<img className="h-10" src={bachelor} />]}
            header={school.title}
            body={school.where}
            bottom={[school.when]}
          />
        ))}
      </div>
    </div>
  );
}
