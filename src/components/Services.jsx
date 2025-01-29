import React, { useState } from "react";
import { useTrail, useSpring, animated } from "react-spring";
import services from "../constants/services.json";

const ServiceCard = ({ service }) => {
  const [hovered, setHovered] = useState(false);
  const hoverProps = useSpring({
    transform: hovered ? "scale(1.05)" : "scale(1)",
  });

  return (
    <animated.div
      style={hoverProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      <div className="relative">
        <img
          src={service.thumbnail}
          alt={service.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-darkDesert bg-opacity-70 flex items-center justify-center rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
          <h1 className="text-lightDesert text-center text-lg md:text-xl lg:text-2xl font-bold w-full break-words">
            {service.title}
          </h1>
        </div>
      </div>
    </animated.div>
  );
};

export default function Services() {
  const trails = useTrail(services.length, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 200,
    config: { mass: 5, tension: 2000, friction: 200 },
  });

  return (
    <div
      id="services"
      className="container mx-auto flex flex-col items-center p-8 bg-lightDesert mt-12 min-h-screen"
    >
      <h2 className="text-4xl font-bold text-darkDesert mb-4">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {trails.map((props, index) => (
          <animated.div key={services[index].id} style={props}>
            <ServiceCard service={services[index]} />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
