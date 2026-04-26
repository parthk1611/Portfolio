"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Technical Stack",
  logos = [
    {
      id: "logo-1",
      description: "Python",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-2",
      description: "TypeScript",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-3",
      description: "React",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-4",
      description: "Next.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-5",
      description: "TensorFlow",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-6",
      description: "PyTorch",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-7",
      description: "Docker",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-8",
      description: "AWS",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-9",
      description: "Azure",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-10",
      description: "Git",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-11",
      description: "Node.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-12",
      description: "Tailwind CSS",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      className: "h-4 w-auto",
    },
    {
      id: "logo-13",
      description: "Java",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-14",
      description: "C#",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-15",
      description: "SQL",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      className: "h-7 w-auto",
    },
    {
      id: "logo-16",
      description: "JavaScript",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      className: "h-7 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-6 md:py-10">
      <div className="relative w-full flex items-center justify-center">
        <Carousel
          opts={{ loop: true }}
          plugins={[AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1 })]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-auto justify-center pl-0"
              >
                <div className="mx-3 sm:mx-5 md:mx-8 flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    className="h-5 sm:h-6 md:h-7 w-auto"
                  />
                  <span className="whitespace-nowrap text-sm sm:text-base md:text-lg font-medium text-neutral-400">
                    {logo.description}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-y-0 left-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export { Logos3 };
