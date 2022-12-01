import ScrollAnimation from "react-animate-on-scroll";
import { about } from "../../data/about";

export const About = () => {
  return (
    <div className="mt-12 justify-center lg:justify-start">
      <div>
        <ScrollAnimation animateIn="fadeInUp">
          <h2 className="inline-block mb-8 border-b-4 border-blue-500">{about.title}</h2>
        </ScrollAnimation>
        {about.paragraphs.map((p, index) => (
          <ScrollAnimation
            key={index}
            animateIn="fadeInUp"
            delay={(0.4 + index / 5) * 1000}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <p className="text-2xl tracking-widest font-medium">{p}</p>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}
