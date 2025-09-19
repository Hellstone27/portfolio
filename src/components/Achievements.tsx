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
        d="M6 9C6 10.45 6.39 11.8 7.06 12.96L5.5 14.5C5.21 14.79 5.21 15.27 5.5 15.56C5.79 15.85 6.27 15.85 6.56 15.56L8.1 14.02C9.26 14.69 10.61 15.08 12.06 15.08S14.86 14.69 16.02 14.02L17.56 15.56C17.85 15.85 18.33 15.85 18.62 15.56C18.91 15.27 18.91 14.79 18.62 14.5L17.08 12.96C17.75 11.8 18.14 10.45 18.14 9H20C20.55 9 21 8.55 21 8S20.55 7 20 7H18.14C18.14 5.55 17.75 4.2 17.08 3.04L18.62 1.5C18.91 1.21 18.91 0.73 18.62 0.44C18.33 0.15 17.85 0.15 17.56 0.44L16.02 1.98C14.86 1.31 13.51 0.92 12.06 0.92S9.26 1.31 8.1 1.98L6.56 0.44C6.27 0.15 5.79 0.15 5.5 0.44C5.21 0.73 5.21 1.21 5.5 1.5L7.04 3.04C6.37 4.2 5.98 5.55 5.98 7H4C3.45 7 3 7.45 3 8S3.45 9 4 9H6Z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="5" fill="currentColor" />
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
