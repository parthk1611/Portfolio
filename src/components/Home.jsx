import React from "react";
import { useSpring, animated } from "react-spring";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaFileAlt,
  FaBlog,
} from "react-icons/fa";
import landingImg from "/logo.svg";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  YOUTUBE_URL,
  RESUME_URL,
  BLOG_URL,
  PERPLEXITY_URL,
} from "../constants";

export default function Home() {
  const logoSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  const iconSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 300, friction: 20 },
    delay: 300,
  });

  return (
    <div
      id="home"
      className="container mx-auto bg-lightDesert flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-4xl font-bold text-darkDesert mb-4 text-left px-8">Hello, Welcome to my page<br/>
      </h1>
      <p className="font-mono text-center font-bold text-2xl text-goldDesert">I'm Parth Kevadiya, Full-stack Developer</p>
      <img src="landing1.svg" alt="" width={200} height={200}/>
      <br/><p className=" font-serif text-center ">"Empowering innovation through seamless code and AI-driven solutions, creating impactful digital experiences that solve real-world problems." </p>

      <animated.div style={iconSpring} className="flex flex-col mt-2 space-x-6">
        <div className="flex mt-2 space-x-6">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={GITHUB_URL}
            className="text-darkDesert hover:text-goldDesert transition-colors duration-300"
          >
            <FaGithub className="w-10 h-10" />
            <span className="sr-only">GitHub account</span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={LINKEDIN_URL}
            className="text-darkDesert hover:text-goldDesert transition-colors duration-300"
          >
            <FaLinkedin className="w-10 h-10" />
            <span className="sr-only">LinkedIn account</span>
          </a>
        
         
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={RESUME_URL}
            className="text-darkDesert hover:text-goldDesert transition-colors duration-300"
          >
            <FaFileAlt className="w-10 h-10" />
            <span className="sr-only">Resume</span>
          </a>
         
        </div>
        
      </animated.div>
    </div>
  );
}
