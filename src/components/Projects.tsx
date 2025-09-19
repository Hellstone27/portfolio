import { ExternalLink, Github } from "lucide-react";
// import useParallax from "../hooks/useParallax";
import { projects } from "../constants/portfolioData";

const Projects = () => {
  // Remove parallax for now to fix overlapping issues
  // const [parallaxRef, parallaxTransform] = useParallax({
  //   speed: 0.3,
  //   direction: "down",
  // });

  return (
    <section
      id="projects"
      className="projects"
      // ref={parallaxRef as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card animate-fade-up delay-${
                (index + 1) * 150
              } project-hover-effect`}
            >
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`tech-tag tech-tag-hover delay-${
                        (i + 1) * 50
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link project-link-github"
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link project-link-demo"
                >
                  <ExternalLink size={16} />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
