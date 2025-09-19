// import useParallax from "../hooks/useParallax";
import { useState } from "react";
import { skillCategories, skillsProficiency } from "../constants/portfolioData";

const Skills = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // const [parallaxRef, parallaxTransform] = useParallax({
  //   speed: 0.3,
  //   direction: "down",
  // });

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % skillCategories.length);
  };

  const prevCard = () => {
    setActiveCardIndex(
      (prev) => (prev - 1 + skillCategories.length) % skillCategories.length
    );
  };

  // Get skills for the active card and their proficiency
  const activeSkills = skillCategories[activeCardIndex]?.skills || [];
  const activeSkillsProficiency = activeSkills.map((skillName) => {
    const proficiency = skillsProficiency.find(
      (skill) => skill.name === skillName
    );
    return {
      name: skillName,
      proficiency: proficiency?.proficiency || 3,
    };
  });

  return (
    <section
      id="skills"
      className="skills"
      style={{
        clipPath: `polygon(
          0% 10%, 
          8% 10%, 8% 5%, 
          12% 5%, 12% 8%, 
          18% 8%, 18% 3%, 
          25% 3%, 25% 9%, 
          30% 9%, 30% 6%, 
          38% 6%, 38% 4%, 
          42% 4%, 42% 7%, 
          48% 7%, 48% 10%, 
          55% 10%, 55% 2%, 
          62% 2%, 62% 8%, 
          68% 8%, 68% 5%, 
          75% 5%, 75% 9%, 
          82% 9%, 82% 3%, 
          88% 3%, 88% 7%, 
          95% 7%, 95% 5%, 
          100% 5%, 100% 100%, 
          0% 100%
        )`,
        marginTop: "-100px",
        paddingTop: "150px",
        position: "relative",
        zIndex: 10,
      }}
      // ref={parallaxRef as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <h2
          className="section-title"
          style={{ marginTop: "-50px", marginBottom: "40px" }}
        >
          Technical Skills
        </h2>

        <div className="skills-layout">
          <div className="skills-left">
            <div className="skills-carousel">
              <div className="carousel-viewport">
                <div
                  className="carousel-container"
                  style={{
                    transform: `rotateY(${
                      -activeCardIndex * (360 / skillCategories.length)
                    }deg)`,
                    transition: "transform 0.6s ease-in-out",
                  }}
                >
                  {skillCategories.map((category, index) => (
                    <div
                      key={index}
                      className="carousel-slide"
                      style={{
                        transform: `rotateY(${
                          index * (360 / skillCategories.length)
                        }deg) translateZ(235px)`,
                      }}
                    >
                      <div className="skill-category-card">
                        {/* SVG with exact paths from reference */}
                        <svg
                          width="205"
                          height="205"
                          viewBox="0 0 200 200"
                          className="card-svg"
                        >
                          <defs>
                            <filter
                              id="dropShadow"
                              x="-20%"
                              y="-20%"
                              width="140%"
                              height="140%"
                            >
                              <feDropShadow
                                dx="3"
                                dy="3"
                                stdDeviation="2"
                                floodColor="rgba(0,0,0,0.3)"
                              />
                            </filter>
                          </defs>

                          {/* Main square with cutouts */}
                          <path
                            d="
                            M 0,0 
                            L 60,0 
                            L 60,30 
                            L 90,30 
                            L 90,0 
                            L 150,0 
                            L 150,50 
                            L 200,50 
                            L 200,120 
                            L 170,120 
                            L 170,160 
                            L 200,160 
                            L 200,200 
                            L 130,200 
                            L 130,170 
                            L 80,170 
                            L 80,200 
                            L 0,200 
                            L 0,90 
                            L 40,90 
                            L 40,60 
                            L 0,60 
                            Z
                          "
                            fill="rgba(255, 255, 255, 0.95)"
                            stroke="#a11738"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter="url(#dropShadow)"
                          />

                          {/* Inner borders for cutouts with consistent thickness */}
                          {/* Top cutout border */}
                          <path
                            d="M 60,0 L 60,30 L 90,30 L 90,0"
                            fill="none"
                            stroke="#a11738"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter="url(#dropShadow)"
                          />

                          {/* Top-right cutout border */}
                          <path
                            d="M 150,0 L 150,50 L 200,50"
                            fill="none"
                            stroke="#a11738"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter="url(#dropShadow)"
                          />

                          {/* Right cutout border */}
                          <path
                            d="M 200,120 L 170,120 L 170,160 L 200,160"
                            fill="none"
                            stroke="#a11738"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter="url(#dropShadow)"
                          />

                          {/* Bottom cutout border */}
                          <path
                            d="M 130,200 L 130,170 L 80,170 L 80,200"
                            fill="none"
                            stroke="#a11738"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter="url(#dropShadow)"
                          />

                          {/* Left cutout border */}
                          <path
                            d="M 0,90 L 40,90 L 40,60 L 0,60"
                            fill="none"
                            stroke="#a11738"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            filter="url(#dropShadow)"
                          />
                        </svg>

                        {/* Detached pieces with exact positioning from reference */}
                        <div className="detached-piece-1"></div>
                        <div className="detached-piece-2"></div>
                        <div className="detached-piece-3"></div>
                        <div className="detached-piece-4"></div>
                        <div className="detached-piece-5"></div>

                        <div className="card-content">
                          <h5 className="category-title">{category.title}</h5>
                          <div className="skill-tags">
                            {category.skills.map((skill, i) => (
                              <span key={i} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="carousel-navigation">
              <button className="carousel-nav-btn prev" onClick={prevCard}>
                &lt;
              </button>
              <div className="carousel-dots">●</div>
              <button className="carousel-nav-btn next" onClick={nextCard}>
                &gt;
              </button>
            </div>
          </div>

          <div className="skills-right">
            <div className="skill-proficiency-list">
              {activeSkillsProficiency.map((skill, index) => (
                <div key={index} className="skill-proficiency-item">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="skill-rating">{skill.proficiency}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
