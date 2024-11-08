import { projects } from '../constants';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';

function Projects() {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold drop-shadow">Projects</span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          I have done a few projects during my time at University be that with a Group or Solo,
          but these are the best of the bunch!
        </p>
      </div>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400] w-ful' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme} `}/>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                src={project.iconUrl}
                alt="Project Icon"
                className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
              <div className='mt-5 flex flex-col'>
                <h4 className='text-2xl font-poppins font-semibold'>
                <Link
                   to={project.link}
                   target="_blank"
                   rel="noopener mpreferrer"
                   className='font-semibold text-blue-600'
                  >
                  {project.name}
                  </Link>
                </h4>
                <p className='mt-2 text-slate-500'>
                  {project.description}
                </p>
              </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200'/>

      <CTA />
    </section>
  )
}

export default Projects