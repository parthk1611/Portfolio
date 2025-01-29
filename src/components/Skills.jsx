import { useTrail, animated } from "react-spring";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaNpm,
  FaBootstrap,
  FaPython,
  FaStripe,
  FaJava
} from "react-icons/fa";
import {
  SiVisualstudiocode,
  SiMongodb,
  SiTailwindcss,
  SiPrisma,
  SiTypescript,
  SiJavascript,
  SiOpenai,
  SiYarn,
  SiVite,
  SiMysql,
  SiRadixui
} from "react-icons/si";
import { DiGithubBadge } from "react-icons/di";

const skills = [
  { id: "html", Component: FaHtml5 },
  { id: "css", Component: FaCss3Alt },
  { id: "javascript", Component: SiJavascript },
  { id: "typescript", Component: SiTypescript },
  { id: "react", Component: FaReact },
  { id: "stripe", Component: FaStripe },
  { id: "tailwind", Component: SiTailwindcss },
  { id: "node", Component: FaNodeJs },
  { id: "sql", Component: SiMysql },
  { id: "npm", Component: FaNpm },
  { id: "yarn", Component: SiYarn },
  { id: "mongodb", Component: SiMongodb },
  { id: "vite", Component: SiVite },
  { id: "vscode", Component: SiVisualstudiocode },
  { id: "github", Component: DiGithubBadge },
  { id: "prisma", Component: SiPrisma },
  { id: "openai", Component: SiOpenai },
  { id: "python", Component: FaPython },
  { id: "radixui", Component: SiRadixui },
  { id: "java", Component: FaJava },
];

export default function Skills() {
  const trail = useTrail(skills.length, {
    from: { transform: "translate3d(0,-40px,0)", opacity: 0 },
    to: { transform: "translate3d(0,0px,0)", opacity: 1 },
  });

  return (
    <div
      id="skills"
      className="bg-lightDesert rounded-lg shadow-md flex items-center justify-center min-h-screen"
    >
      <div className="text-center max-w-2xl w-full mx-auto">
        <h2 className="text-4xl font-bold text-darkDesert mb-6">Services</h2>
        <div className="grid grid-cols-4 gap-4 my-4 justify-items-center">
          {trail.map((props, index) => {
            const { Component } = skills[index];
            return (
              <animated.div
                style={props}
                className="text-5xl text-goldDesert transition-all duration-300 transform hover:scale-110 hover:text-darkDesert"
                key={skills[index].id}
              >
                <Component />
              </animated.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
