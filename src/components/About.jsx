import React, { memo, useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GITHUB_URL, LINKEDIN_URL, PERPLEXITY_URL } from "../constants/index";
import { useSpring, animated, config } from "react-spring";
import { SiPerplexity } from "react-icons/si";

const Anchor = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-2 text-darkDesert hover:text-goldDesert transition-colors duration-300"
    aria-label={`Link to ${href}`}
  >
    {children}
  </a>
);

const About = () => {
  // Fade-in effect
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.slow,
  });

  // Springy effect on image hover
  const [scale, setScale] = useState(1);
  const springProps = useSpring({
    transform: `scale(${scale})`,
    config: config.wobbly,
  });

  // Slide-up effect
  const slideUp = useSpring({
    transform: "translate3d(0,0px,0)",
    from: { transform: "translate3d(0,40px,0)" },
    delay: 200,
  });

  return (
    <animated.div
      style={fadeIn}
      id="about"
      className="container mx-auto flex flex-col items-center justify-center bg-lightDesert min-h-screen"
    >
      <animated.img
        style={{ ...springProps }}
        src="images/profile.jpeg"
        alt="Sara"
        className="rounded-full w-64 h-64 border-4 border-darkDesert object-cover mb-8 mt-20"
        onMouseEnter={() => setScale(1.1)}
        onMouseLeave={() => setScale(1)}
      />
      <animated.div style={slideUp}>
        <h1 className="text-4xl font-bold text-darkDesert mb-4 text-center px-8">
          Parth Kevadiya
        </h1>
        <p className="text-lg text-darkDesert mb-4 text-justify px-8">
        Hi there! I’m a science-loving, code-wielding full-stack web developer with a passion for crafting apps that make life easier—like Quickmedit, my brainchild that’s revolutionizing emergency healthcare access. With a degree in CSE-AI, I’ve mastered the art of turning complex ideas into seamless user experiences, all while staying on top of the latest tech trends.
        </p>
        <p className="text-lg text-darkDesert mb-4 text-justify px-8">
        When I’m not debugging or designing, you’ll find me immersed in competitive MMO video games or diving into epic story mode adventures. Whether it’s leading a team to victory or unraveling a gripping narrative, I bring the same determination and creativity to gaming that I do to coding.
        </p>
        <p className="text-lg text-darkDesert mb-4 text-justify px-8">
        Whether it’s developing apps, gaming, or brainstorming the next big idea, I’m all about solving problems, making an impact, and having fun along the way. Let’s create something amazing together—extra points if it involves AI, innovation, or a shared love for gaming!{" "}
          
          
        </p>

        <p className="text-lg text-darkDesert mb-4 text-center px-8">
          Let's collab!
        </p>
        <div className="flex justify-center items-center pb-8">
          <Anchor href={GITHUB_URL}>
            <FaGithub size={32} />
          </Anchor>
          <Anchor href={LINKEDIN_URL}>
            <FaLinkedin size={32} />
          </Anchor>
          {/* <Anchor href={PERPLEXITY_URL}>
            <SiPerplexity size={32} />
          </Anchor> */}
        </div>
        <div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default memo(About);
