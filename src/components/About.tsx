// import useParallax from "../hooks/useParallax";
import { useState } from "react";
import {
  aboutStats,
  aboutTabs,
  journeyMapData,
} from "../constants/portfolioData";

const About = () => {
  const [activeTab, setActiveTab] = useState<"story" | "journey" | "values">(
    "story"
  );

  // Find the default checkpoint (2025) and set it as initial selection
  const defaultCheckpoint = journeyMapData.find(
    (checkpoint) => checkpoint.isDefault
  );
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    defaultCheckpoint ? defaultCheckpoint.id : null
  );

  const renderJourneyMap = () => {
    return (
      <div className="journey-map-container">
        <div className="journey-map">
          {/* SVG for curved dotted lines */}
          <svg className="journey-lines" viewBox="0 0 800 140">
            {journeyMapData.slice(0, -1).map((checkpoint, index) => {
              const current = checkpoint.position;
              const next = journeyMapData[index + 1].position;

              // Convert percentage to SVG coordinates
              const startX = (current.x / 100) * 800;
              const startY = (current.y / 100) * 140;
              const endX = (next.x / 100) * 800;
              const endY = (next.y / 100) * 140;

              // Create curved path with control points
              const midX = (startX + endX) / 2;
              const midY = Math.min(startY, endY) - 25;

              return (
                <path
                  key={`line-${checkpoint.id}`}
                  d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                  stroke="#cd1e49"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  fill="none"
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Checkpoints */}
          {journeyMapData.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className={`journey-checkpoint ${
                selectedCheckpoint === checkpoint.id ? "active" : ""
              }`}
              style={{
                left: `${checkpoint.position.x}%`,
                top: `${checkpoint.position.y}%`,
              }}
              onClick={() => setSelectedCheckpoint(checkpoint.id)}
            >
              <div className="checkpoint-icon">
                <div className="checkpoint-pulse"></div>
                {selectedCheckpoint === checkpoint.id && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-25px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "1.2rem",
                      animation: "centerBounce 0.6s ease",
                      zIndex: 999,
                      display: "inline-block",
                    }}
                  >
                    📍
                  </span>
                )}
              </div>
              <div className="checkpoint-year">{checkpoint.year}</div>
            </div>
          ))}
        </div>

        {/* Selected checkpoint description */}
        {selectedCheckpoint && (
          <div className="journey-description">
            {(() => {
              const checkpoint = journeyMapData.find(
                (c) => c.id === selectedCheckpoint
              );
              return checkpoint ? (
                <div className="description-content">
                  <p>{checkpoint.description}</p>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="about"
      className="about"
      // ref={parallaxRef as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <h2 className="section-title animate-fade-up">About Me</h2>

        {/* Stats Section */}
        <div className="about-main">
          <div className="about-left">
            <div className="about-stats">
              {aboutStats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              {Object.entries(aboutTabs).map(([key, tab]) => (
                <button
                  key={key}
                  className={`tab-button ${activeTab === key ? "active" : ""}`}
                  onClick={() =>
                    setActiveTab(key as "story" | "journey" | "values")
                  }
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <div className="content-area">
                {activeTab === "journey"
                  ? renderJourneyMap()
                  : aboutTabs[activeTab].content.map((item, index) => (
                      <div
                        key={index}
                        className={`content-item ${
                          activeTab === "values" ? "value-item" : ""
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item}
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
