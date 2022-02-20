
import { Hero } from "../Hero/Hero";
import { Career } from "../Career/Career";

import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import androidIcon from "../../assets/android.svg";
import bootstrapIcon from "../../assets/bootstrap.svg";
import dockerIcon from "../../assets/docker.svg";
import flaskIcon from "../../assets/flask.svg";
import mysqlIcon from "../../assets/mysql.svg";
import pythonIcon from "../../assets/python.svg";
import windowsIcon from "../../assets/windows-10.svg";
import vscodeIcon from "../../assets/vscode.svg";
import ubuntuIcon from "../../assets/ubuntu.png";

export function Main() {
  const icons = [
    { icon: jsIcon, name: "JavaScript" },
    { icon: reactIcon, name: "React" },
    { icon: nodeIcon, name: "Node.js" },
    { icon: typescriptIcon, name: "TypeScript" },
    { icon: cssIcon, name: "CSS" },
    { icon: htmlIcon, name: "HTML" },
    { icon: pythonIcon, name: "Python" },
    { icon: flaskIcon, name: "Flask" },
    { icon: mysqlIcon, name: "SQL" },
    { icon: dockerIcon, name: "Docker" },
    { icon: bootstrapIcon, name: "Bootstrap" },
    { icon: vscodeIcon, name: "VS Code" },
    { icon: androidIcon, name: "Android" },
    { icon: windowsIcon, name: "Windows" },
    { icon: ubuntuIcon, name: "Ubuntu" },
  ];

  return (
    <div className="py-10 px-10 lg:px-52 space-y-52">
      <Hero />
      <Career />
    </div>
  );
}
