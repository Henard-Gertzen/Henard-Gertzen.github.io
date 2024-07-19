import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
        <div>
          <h2 className='sm:text-bold sm:leading-snug text-center py-4 mx-5 font-bold text-black'>← Feel free to turn the island →</h2>
          <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-purple py-4 px-8 text-white mx-5'>
            Hi, I'm
            <span className='font-semibold mx-2 text-white'>Henard</span>
            <br />
            A Software Developer from South-Africa! 🇿🇦
          </h1>
        </div>
    );

    if (currentStage === 2) {
      return (
        <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Need a project done or looking for a dev? <br/> I am just a click away
        </p>
  
        <Link to='https://www.linkedin.com/in/henard-gertzen-5b4267199/' className='neo-brutalism-white neo-btn' target="_blank" rel="noopener mpreferrer"
            >
          Get in Contact!
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
      );
    }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Click here to find out more about me <br /> and view my CV!
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn' target="_blank" rel="noopener mpreferrer">
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          I have worked on many projects. <br /> Curious what these are?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn' target="_blank" rel="noopener mpreferrer">
          Visit my portfolio
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }


  return null;
};

export default HomeInfo;