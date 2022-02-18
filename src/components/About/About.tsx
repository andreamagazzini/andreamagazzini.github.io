import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import androidIcon from "../../assets/android.svg";
import bootstrapIcon from "../../assets/bootstrap.svg";
import dockerIcon from "../../assets/docker.svg";
import windowsIcon from "../../assets/windows-10.svg";
import vscodeIcon from "../../assets/vscode.svg";
import ubuntuIcon from "../../assets/ubuntu.png"; 
import ScrollAnimation from "react-animate-on-scroll";
import { about } from "../../data";

export const About = () => {
  const icons = [
    { icon: jsIcon, name: "JavaScript" },
    { icon: reactIcon, name: "React" },
    { icon: nodeIcon, name: "Node.js" },
    { icon: typescriptIcon, name: "TypeScript" },
    { icon: cssIcon, name: "CSS" },
    { icon: htmlIcon, name: "HTML" },
    { icon: dockerIcon, name: "Docker" },
    { icon: bootstrapIcon, name: "Bootstrap" },
    { icon: vscodeIcon, name: "VS Code" },
    { icon: androidIcon, name: "Android" },
    { icon: windowsIcon, name: "Windows" },
    { icon: ubuntuIcon, name: "Ubuntu" },
  ];
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 justify-center sm:justify-start">
      <div className="about-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <h2 className="inline-block mb-8 border-b-4 border-blue-500">{about.title}</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.2 * 1000}>
          <p></p>
        </ScrollAnimation>
        {about.paragraphs.map((p, index) => (
          <ScrollAnimation
            key={index}
            animateIn="fadeInLeft"
            delay={(0.4 + index / 5) * 1000}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <p className="text-3xl tracking-widest font-medium">{p}</p>
          </ScrollAnimation>
        ))}

        <ScrollAnimation animateIn="fadeInLeft" delay={0.7 * 1000}>
          <h3 className="mt-12 text-green-500">{about.mainSkills}</h3>
        </ScrollAnimation>

        <div className="mt-2 flex align-center flex-wrap gap-7 justify-center sm:justify-start">
          {icons.map((icon, index) => (
            <div 
              key={index}
              className="flex flex-col align-center relative" 
            >
              <ScrollAnimation
                animateIn="fadeInUp"
                delay={(0.1 + index / 10) * 1000}
              >
                <span className="absolute left-2/4 -bottom-3/4 -translate-x-1/2 -translate-y-1/2 invisible hover:invisible">{icon.name}</span>
                <img className="w-14" src={icon.icon} alt={icon.name} />
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
