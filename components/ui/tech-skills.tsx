"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Skill {
  id: string;
  label: string;
  image: string;
}

const skills: Skill[] = [
  { id: "python",     label: "Python",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { id: "typescript", label: "TypeScript",  image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { id: "javascript", label: "JavaScript",  image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { id: "react",      label: "React",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { id: "nextjs",     label: "Next.js",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { id: "tailwind",   label: "Tailwind",    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { id: "tensorflow", label: "TensorFlow",  image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { id: "pytorch",    label: "PyTorch",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { id: "docker",     label: "Docker",      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { id: "aws",        label: "AWS",         image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { id: "azure",      label: "Azure",       image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { id: "git",        label: "Git",         image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { id: "nodejs",     label: "Node.js",     image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { id: "java",       label: "Java",        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { id: "csharp",     label: "C#",          image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { id: "postgresql", label: "SQL",         image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

const TechSkills = () => {
  return (
    <div className="relative w-full overflow-hidden py-6">
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 1.4, stopOnInteraction: false })]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {skills.map((skill) => (
            <CarouselItem
              key={skill.id}
              className="flex basis-1/4 justify-center pl-0 sm:basis-1/5 md:basis-1/6 lg:basis-[12.5%]"
            >
              <div
                className="flex flex-row items-center gap-3 group px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <img
                  src={skill.image}
                  alt={skill.label}
                  className="h-7 w-7 object-contain shrink-0"
                />
                <span
                  className="text-xs font-medium tracking-wide whitespace-nowrap"
                  style={{ color: "#a3a3a3" }}
                >
                  {skill.label}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: "linear-gradient(to right, #0c0c0c, transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: "linear-gradient(to left, #0c0c0c, transparent)" }} />
    </div>
  );
};

export default TechSkills;
