import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
    return(
        <section className="cta">
            <p className="cta-text">
                Interested in me working with you? <br className="sm:block hidden"/> 
                Get in contact with me!               
            </p>
            <Link 
            to='https://www.linkedin.com/in/henard-gertzen-5b4267199/'
            target="_blank"
            rel="noopener mpreferrer"
            className="btn"
            >
                Contact Me
            </Link>
        </section>
    )
}

export default CTA