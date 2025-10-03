// import useParallax from "../hooks/useParallax";
import { useState, useEffect } from "react";
import { skillCategories, skillsProficiency } from "../constants/portfolioData";

const Skills = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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
        clipPath: isMobile
          ? "none"
          : `polygon(
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
        marginTop: isMobile ? "0" : "-100px",
        paddingTop: isMobile ? "4rem" : "150px",
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
          {/* Desktop View - 3D Carousel */}
          {!isMobile && (
            <>
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
                          className={`carousel-slide ${
                            index === activeCardIndex ? "active" : ""
                          }`}
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
                              <h5 className="category-title">
                                {category.title}
                              </h5>
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
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgb(237, 80, 118)",
                      cursor: "pointer",
                      fontSize: "24px",
                      fontWeight: "bold",
                      padding: "8px",
                    }}
                    onClick={prevCard}
                  >
                    ‹
                  </button>
                  <div className="carousel-dots">
                    {skillCategories.map((_, index) => (
                      <span
                        key={index}
                        className={`carousel-dot ${
                          index === activeCardIndex ? "active" : ""
                        }`}
                        onClick={() => setActiveCardIndex(index)}
                        style={{
                          cursor: "pointer",
                          margin: "0 4px",
                          opacity: index === activeCardIndex ? 1 : 0.5,
                        }}
                      >
                        ●
                      </span>
                    ))}
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgb(237, 80, 118)",
                      cursor: "pointer",
                      fontSize: "24px",
                      fontWeight: "bold",
                      padding: "8px",
                    }}
                    onClick={nextCard}
                  >
                    ›
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
                            style={{
                              width: `${(skill.proficiency / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="skill-rating">
                          {skill.proficiency}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Mobile View - Simple Grid Layout */}
          {isMobile && (
            <div
              className="skills-mobile"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                padding: "0 1rem",
              }}
            >
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="skill-category-mobile">
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "15px",
                      padding: "1.5rem",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      height: "fit-content",
                    }}
                  >
                    <h3
                      style={{
                        color: "rgb(237, 80, 118)",
                        marginBottom: "1rem",
                        fontSize: "1.2rem",
                        textAlign: "center",
                      }}
                    >
                      {category.title}
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(110px, 1fr))",
                        gap: "0.8rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {category.skills.map((skill, skillIndex) => {
                        const proficiency = skillsProficiency.find(
                          (s) => s.name === skill
                        );
                        return (
                          <div
                            key={skillIndex}
                            style={{
                              background: "rgba(237, 80, 118, 0.1)",
                              border: "1px solid rgba(237, 80, 118, 0.3)",
                              borderRadius: "8px",
                              padding: "0.8rem",
                              textAlign: "center",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                marginBottom: "0.5rem",
                                lineHeight: "1.2",
                              }}
                            >
                              {skill}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "2px",
                              }}
                            >
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor:
                                      star <= (proficiency?.proficiency || 3)
                                        ? "rgb(237, 80, 118)"
                                        : "rgba(255, 255, 255, 0.3)",
                                    transition: "background-color 0.3s ease",
                                  }}
                                />
                              ))}
                            </div>
                            <div
                              style={{
                                color: "rgb(237, 80, 118)",
                                fontSize: "0.75rem",
                                marginTop: "0.3rem",
                              }}
                            >
                              {proficiency?.proficiency || 3}/5
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
