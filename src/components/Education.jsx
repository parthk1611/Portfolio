import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import schools from "../constants/schools.json";


const SchoolsCard = ({ education, onClick }) => (
  <VerticalTimelineElement
    icon={
      <img
        src={education.img}
        alt={education.program}
        className="h-full w-full rounded-full block "
      />
    }
    contentStyle={{ position: "relative" }}
    date={<span className="text-darkDesert">{education.timePeriod}</span>}
  >

    <h3 className="text-2xl font-bold text-darkDesert">{education.program}</h3>
    <p className="text-xl text-darkDesert italic">{education.degree}</p>
    <p className="text-xl text-darkDesert italic">{education.university}</p>
    {/* <p className="text-darkDesert">{experience.description}</p> */}

  </VerticalTimelineElement>
);

const Education = () => {
  const [modalContent, setModalContent] = useState(null);

  return (
    <div
      id="education"
      className="bg-lightDesert p-8 rounded-lg shadow-lg w-full mx-auto mt-12"
    >
      <h2 className="text-4xl font-bold text-darkDesert text-center">
       Education
      </h2>
      <VerticalTimeline>
        {schools.map((education, index) => (
          <SchoolsCard
          key={index} 
          education={education}  
          onClick={() => setModalContent(education)}
          />
        ))}
      </VerticalTimeline>

      
    </div>
  );
};

export default Education;
