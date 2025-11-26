import { Hero } from "../Hero/Hero";
import { Timeline } from "../Timeline/Timeline";
import { Volunteering } from "../Volunteering/Volunteering";
import { SoftSkills } from "../SoftSkills/SoftSkills";
import { TechnicalSkills } from "../TechnicalSkills/TechnicalSkills";
import { Passions } from "../Passions/Passions";
import { Services } from "../Services/Services";
import profileData from "../../data/profile.json";

export function Main() {
  const { experience, education } = profileData;

  // Transform data for Timeline component
  const educationTimeline = education.map(edu => ({
    title: edu.title,
    where: `${edu.institution} - ${edu.location}`,
    when: edu.period,
    icon: "fa-solid:university"
  }));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-10 px-5 lg:px-20 xl:px-52">
        <div className="pt-24 lg:pt-32 pb-16">
          <Hero />
        </div>
      </section>

      {/* Skills Section - Side by Side */}
      <section className="py-20 px-5 lg:px-20 xl:px-52 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Skills Overview
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Core competencies and technical expertise (Dreyfus model: 1=Novice, 5=Expert)
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SoftSkills />
            <TechnicalSkills />
          </div>
        </div>
      </section>

      {/* Engineering Experience Section */}
      <section className="py-20 px-5 lg:px-20 xl:px-52 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Timeline
            title="Engineering Experience"
            points={experience
              .filter(exp => exp.type === 'Full-time' || exp.type === 'Startup')
              .map(exp => ({
                title: exp.title,
                company: exp.company,
                where: exp.location,
                when: exp.period,
                description: exp.description,
                achievements: exp.achievements,
                technologies: exp.technologies,
                link: exp.link || undefined,
                icon: "mdi:code-tags"
              }))}
            showDetails={true}
            icon="mdi:code-tags"
          />
        </div>
      </section>

      {/* Teaching Experience Section */}
      <section className="py-20 px-5 lg:px-20 xl:px-52 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Timeline
            title="Teaching"
            points={experience
              .filter(exp => exp.type === 'Teaching' || exp.type === 'Education')
              .map(exp => ({
                title: exp.title,
                company: exp.company,
                where: exp.location,
                when: exp.period,
                description: exp.description,
                achievements: exp.achievements,
                technologies: exp.technologies,
                link: exp.link || undefined,
                icon: "mdi:school"
              }))}
            showDetails={true}
            icon="mdi:school"
          />
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-5 lg:px-20 xl:px-52 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Timeline
            title="Education"
            points={educationTimeline}
          />
        </div>
      </section>

      {/* Volunteering Section */}
      <Volunteering />

      {/* Passions Section */}
      <Passions />

      {/* Services & CTA Section */}
      <Services />
    </main>
  );
}
