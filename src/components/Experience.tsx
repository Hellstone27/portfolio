import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { experiences } from "../constants/portfolioData";

const Experience: React.FC = () => {
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
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

  const handleLaptopClick = () => {
    setCurrentExperienceIndex((prev) =>
      prev === experiences.length - 1 ? 0 : prev + 1
    );
  };

  const nextExperience = () => {
    setCurrentExperienceIndex((prev) =>
      prev === experiences.length - 1 ? 0 : prev + 1
    );
  };

  const prevExperience = () => {
    setCurrentExperienceIndex((prev) =>
      prev === 0 ? experiences.length - 1 : prev - 1
    );
  };

  const currentExperience = experiences[currentExperienceIndex];

  return (
    <>
      <section
        id="experience"
        className="hero"
        style={{
          backgroundImage: `
          linear-gradient(135deg, rgba(15, 15, 35, 0.5) 0%, rgba(26, 26, 46, 0.5) 50%, rgba(22, 33, 62, 0.5) 100%),
          url('/3dCityDark.png')
        `,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundAttachment: "fixed, fixed",
          minHeight: "auto",
          position: "relative",
          overflow: "hidden",
          marginTop: isMobile ? "0" : "-100px",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          zIndex: 10,
          clipPath: isMobile
            ? "none"
            : `polygon(
          0% 5%, 
          5% 5%, 5% 3%, 
          10% 3%, 10% 4%, 
          15% 4%, 15% 2%, 
          20% 2%, 20% 3%, 
          25% 3%, 25% 4%, 
          30% 4%, 30% 2%, 
          35% 2%, 35% 3%, 
          40% 3%, 40% 3%, 
          45% 3%, 45% 5%, 
          50% 5%, 50% 3%, 
          55% 3%, 55% 5%, 
          60% 5%, 60% 1%, 
          65% 1%, 65% 3%, 
          70% 3%, 70% 3%, 
          75% 3%, 75% 4%, 
          80% 4%, 80% 2%, 
          85% 2%, 85% 3%, 
          90% 3%, 90% 5%, 
          95% 5%, 95% 3%, 
          100% 3%, 100% 100%, 
          0% 100%
        )`,
        }}
      >
        <div className="container">
          <h2
            className="section-title animate-fade-up"
            style={{ color: "#ffffff", position: "relative", zIndex: 20 }}
          >
            Work Experience
          </h2>
          <div className="about-main">
            {/* Office Room Image - Left Side - Hide on mobile */}
            {!isMobile && (
              <div className="about-left">
                <div
                  style={{
                    position: "relative",
                    transition: "transform 0.3s ease",
                    marginTop: "-40px",
                  }}
                >
                  <img
                    src="/officeRoom.png"
                    alt="Office Room"
                    className="about-image"
                    style={{
                      transition: "filter 0.3s ease",
                      width: "525px",
                      height: "484px",
                      objectFit: "cover",
                    }}
                  />
                  {/* Clickable "Click Me" Button with LabCity3D flickering effect */}
                  <button
                    className="laptop-screen-button"
                    onClick={handleLaptopClick}
                    style={{
                      clipPath: `polygon(
                      ${(231 / 525) * 100}% ${(235 / 487) * 100}%,
                      ${(220 / 525) * 100}% ${(260 / 487) * 100}%,
                      ${(246 / 525) * 100}% ${(275 / 487) * 100}%,
                      ${(256 / 525) * 100}% ${(250 / 487) * 100}%
                    )`,
                    }}
                  ></button>

                  {/* GIF Indicator positioned over laptop */}
                  <img
                    src="/indicator.gif"
                    alt="Click indicator"
                    style={{
                      position: "absolute",
                      top: "190px",
                      left: "215px",
                      width: "60px",
                      height: "60px",
                      pointerEvents: "none",
                      zIndex: 3,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Work Experience Details - Right Side - Hide on mobile */}
            {!isMobile && (
              <div className="about-right">
                {/* Translucent Container */}
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "15px",
                    padding: "2rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    marginTop: "-30px",
                    height: "450px",
                    position: "relative",
                  }}
                >
                  <div className="about-content">
                    <div
                      style={{ marginBottom: "1rem", paddingBottom: "60px" }}
                    >
                      <h3
                        style={{
                          color: "rgb(237, 80, 118)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {currentExperience.title}
                      </h3>
                      <p style={{ color: "#cccccc", marginBottom: "0.5rem" }}>
                        {currentExperience.company} • {currentExperience.period}
                      </p>
                      <p
                        style={{
                          color: "#aaaaaa",
                          fontSize: "0.9rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {currentExperience.location}
                      </p>

                      {currentExperience.achievements.map(
                        (achievement, achievementIndex) => (
                          <div
                            key={achievementIndex}
                            style={{ display: "flex", marginBottom: "0.5rem" }}
                          >
                            <span
                              style={{
                                color: "#cd1e49",
                                marginRight: "0.5rem",
                              }}
                            >
                              •
                            </span>
                            <p
                              style={{ color: "#dddddd", fontSize: "0.95rem" }}
                            >
                              {achievement}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    {/* Experience navigation indicator */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                      }}
                    >
                      {experiences.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor:
                              index === currentExperienceIndex
                                ? "#cd1e49"
                                : "#555",
                            transition: "background-color 0.3s ease",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Carousel */}
            {isMobile && (
              <div className="experience-mobile-carousel">
                <div className="experience-carousel-header">
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgb(237, 80, 118)",
                      cursor: "pointer",
                      fontSize: "24px",
                      padding: "8px",
                    }}
                    onClick={prevExperience}
                    disabled={experiences.length <= 1}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <h4 style={{ color: "rgb(237, 80, 118)", margin: 0 }}>
                    Experience ({currentExperienceIndex + 1} of{" "}
                    {experiences.length})
                  </h4>

                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "rgb(237, 80, 118)",
                      cursor: "pointer",
                      fontSize: "24px",
                      padding: "8px",
                    }}
                    onClick={nextExperience}
                    disabled={experiences.length <= 1}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div style={{ padding: "1rem 0" }}>
                  <h3
                    style={{
                      color: "rgb(237, 80, 118)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {currentExperience.title}
                  </h3>
                  <p style={{ color: "#cccccc", marginBottom: "0.5rem" }}>
                    {currentExperience.company} • {currentExperience.period}
                  </p>
                  <p
                    style={{
                      color: "#aaaaaa",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {currentExperience.location}
                  </p>

                  {currentExperience.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", marginBottom: "0.5rem" }}
                    >
                      <span style={{ color: "#cd1e49", marginRight: "0.5rem" }}>
                        •
                      </span>
                      <p
                        style={{
                          color: "#dddddd",
                          fontSize: "0.9rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Mobile navigation dots */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "1rem",
                  }}
                >
                  {experiences.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentExperienceIndex(index)}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor:
                          index === currentExperienceIndex ? "#cd1e49" : "#555",
                        transition: "background-color 0.3s ease",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>{" "}
          {/* Close about-main */}
        </div>{" "}
        {/* Close container */}
      </section>
    </>
  );
};

export default Experience;
