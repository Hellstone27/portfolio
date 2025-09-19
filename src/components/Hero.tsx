import { Github, Linkedin, Mail } from "lucide-react";
// import useParallax from "../hooks/useParallax";
import City3D from "./City3D";
import { personalInfo } from "../constants/portfolioData";

const Hero = () => {
  // const [parallaxRef, parallaxTransform] = useParallax({
  //   speed: 0.3,
  //   direction: "down",
  // });
  // const [backgroundRef, backgroundTransform] = useParallax({
  //   speed: 0.1,
  //   direction: "down",
  // });

  return (
    <section
      id="home"
      className="hero"
      // ref={parallaxRef as React.RefObject<HTMLElement>}
    >
      <div className="hero-background">
        <City3D />
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-up">
            Hi, I'm <span className="highlight">{personalInfo.name}</span>
          </h1>
          <h2 className="hero-subtitle animate-fade-up delay-200">
            {personalInfo.title}
          </h2>
          <p className="hero-description animate-fade-up delay-400">
            {personalInfo.description}
          </p>
          <div className="hero-actions">
            <div className="social-links">
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a href={`mailto:${personalInfo.email}`}>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
