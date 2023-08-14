import React from 'react'
import './worksfiles/works.css'
import { SectionWrapper } from "../hoc"

import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { StarsCanvas } from './canvas';

const ProjectCard = ({
  index,
  image,
  source_code_link,
}) => {
  return (
    <>
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.6)} className="w-[558px] smx:w-[400px] smm:w-[300px]">
    <div className="laptop-frame">     
      <div className="website-container website-container-small">      
         <img className="website-screenshot" src={image} alt="Website Screenshot" />      
      </div>  
    </div>
    <div className="flex items-center justify-center py-1 mx-auto mt-2 border border-violet-500 w-[87%] shadow-tex z-1">
      {source_code_link}
    </div>
  </motion.div>
  </>
  )
}

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px] z-[1]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap justify-center gap-7'>
        {projects.map((project, index) => (
          <div key={`project-${index}`}>
            <ProjectCard index={index} {...project} />
          </div>
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Works, "")