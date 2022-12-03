import { SKILLS } from "./skills";

const { react, nodejs, spring, serverless, neo4j, d3, javascript, typescript, cplusplus, java, solidity } = SKILLS;

export const PROJECTS = {
  title: "Projects",
  cards: [{
      description: `Full stack development of a
      new platform from scratch: user
      can connect their shopify store
      and import products and order
      and directly fulfill them.`,
      company: "uDroppy",
      when: "1 year and 7 months",
      icon: "ic:outline-work",
      skills: {
        Framework: `FE: Next.js + React, BE: Serverless + Node.js`,
        Languages: `JavaScript, TypeScript`,
        Automation: `Vercel, AWS, GitHub Actions`,
        IDE: "VSCode",
        icons: [react, nodejs, serverless, javascript, typescript]
      }
    },
    {
      description: `Work on the maintenance and
      development of different web
      and mobile banking platform
      (Credit Suisse, Clientis, CIC)`,
      company: "ti&m",
      when: "2 years and 2 months",
      icon: "ic:outline-work",
      skills: {
        Framework: "React (Redux + Saga), Spring",
        Languages: "JavaScript, TypeScript, Java, HTML5, SCSS",
        Automation: "Docker, Jenkins",
        IDE: "IntelliJ Idea, Android Studio",
        OS: "Ubuntu, Windows",
        icons: [react, spring, javascript, typescript]
      }
    },
    {
      description: `Work for a project about linked
      mobility, parsing raw data of
      train timeplans and loading it
      in a graph database`,
      company: "SBB CFF FFS (Swiss railways)",
      when: "8 months",
      icon: "ic:outline-work",
      skills: {
        Methodology: "Agile/Scrum",
        Languages: "Java, JavaScript, Cypher",
        Database: "Neo4J",
        Libraries: "React, D3",
        icons: [react, neo4j, d3]
      }
    },
    {
      description: `Maintenance of a Tandem
      NonStop SQL machine and
      development of automated
      tests.`,
      company: "SIX Payments",
      when: "6 months",
      icon: "ic:outline-work",
      skills: {
        Languages: "COBOL, C++, Java",
        Framework: "JUnit, Mockito",
        IDE: "Eclipse",
        Software: "SVN, SQuirreL SQL",
        icons: [cplusplus, java]
      }
    },
    {
      description: `Development of a mobile app
      based on the Ethereum
      blockchain to invest in ICO`,
      company: "ti&m",
      when: "3 months",
      icon: "ic:outline-work",
      skills: {
        Framework: "React Native, Node.js", 
        Languages: "JavaScript, Solidity",
        icons: [nodejs, react, solidity]
      }
    },
    {
      description: `Development of an application
      to automatically tune the
      parameters of a humanoid
      joint-mass model`,
      company: "Università degli Studi di Genova",
      when: "6 months",
      icon: "fa-solid:university",
      skills: {
        Languages: "C++",
        IDE: "Visual Studio",
        Software: "EyesWeb",
        icons: [cplusplus]
      }
    }
  ],
}