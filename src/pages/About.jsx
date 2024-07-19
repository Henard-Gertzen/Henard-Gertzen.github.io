import { Loader } from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import { skills, experiences } from '../constants'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';


const About = () => {

  const cvRef = useRef(null);

  const handleSkipToCV = () => {
    if (cvRef.current) {
      cvRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('CV element not found. Ensure the ref is attached correctly.');
    }
  };

  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold drop-shadow">Henard</span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Self-sufficient software Developer from South Africa, eager to learn and expand my skillset in the Software Development sector.
        </p>
        <button onClick={handleSkipToCV} className='text-black-500'>Skip to CV</button>
      </div>
      <div className = "py-10 flex flex-col">
      <h3 className = "subhead-text">My Skills</h3>

      <div className='mt-16 flex flex-wrap gap-12'>
          {skills.map((skill) => (
            <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Work Experience</h3>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Prior to studying I have held part-time jobs at the following companies:        
        </p>
      </div>

      <div className='mt-12 flex'>
        <VerticalTimeline>
          {experiences.map((experience) => 
            <VerticalTimelineElement 
            key={experience.company_name}
            date={experience.date}
            icon={<div className='flex justify-center items-center w-full h-full'>
              <img 
              src={experience.icon}
              alt={experience.company_name}
              className='w-[60%] h-[60%] object-contain'
              />
            </div>}
            iconStyle={{
              background: experience.iconBg
            }}
            contentStyle={{
              borderBottom: '8px',
              borderStyle: 'solid',
              borderBottomColor: experience.iconBg,
              boxShadow: 'none',
            }}
            >
              <div>
                <h3 className='text-black text-xl font-poppins font-semibold'>
                  {experience.title}
                </h3>
                <p className='text-black-500 font-medium font-base'
                style={{margin:0}}>
                  {experience.company_name}
                </p>
              </div>
              <ul className='my-5 list-disc ml-5 space-y-2'>
                {experience.points.map ((point, index) =>(
                  <li key={`experience-point-${index}`}className='text-black-500/50 font-normal pl-1 text-small'>
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </div>
      </div>
      <Suspense fallback = { <Loader />}>
    <section className="relative flex lg:flex-row flex-col
    max-container">
      <div ref={cvRef} className="flex-1 min-w-[50%] flex flex-col">
        <h3 className='subhead-text'>
          My CV
        </h3>
        <embed src="Resume-2024.pdf" className='h-screen' type="application/pdf"/>
      </div>
    </section>
    </Suspense> 
    <hr className='border-slate-200'/>
    <CTA />
    </section>
  );
};

export default About