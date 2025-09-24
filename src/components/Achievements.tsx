import React, { useEffect, useState } from "react";
import { achievements } from "../constants/portfolioData";

// Icon components for achievements
const iconComponents = {
  Trophy: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
  Award: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
  Star: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L14.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
};

const Achievements: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("achievements");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Awards & Recognition</h2>
        {/* Achievement Cards */}
        <div className="achievements-grid">
          {achievements.map((achievement, index) => {
            const IconComponent =
              iconComponents[achievement.icon as keyof typeof iconComponents];

            return (
              <div
                key={index}
                className={`achievement-card ${isVisible ? "animate-in" : ""}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="achievement-header">
                  <div className="achievement-icon">
                    {IconComponent && <IconComponent />}
                  </div>
                  <div className="achievement-meta">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <span className="achievement-company">
                      {achievement.company}
                    </span>
                  </div>
                </div>

                <div className="achievement-content">
                  <p className="achievement-description">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
