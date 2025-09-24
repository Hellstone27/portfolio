import { BookOpen } from "lucide-react";
import { useState } from "react";
import { education, certifications } from "../constants/portfolioData";

const Education = () => {
  const [selectedBook, setSelectedBook] = useState<number | null>(0); // Default to button 1 (index 0)

  return (
    <section
      id="education"
      className="education"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(15, 15, 35, 0.5) 0%, rgba(26, 26, 46, 0.5) 50%, rgba(22, 33, 62, 0.5) 100%),
          url('/3dCityDark.png')
        `,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundAttachment: "fixed, fixed",
        clipPath: `polygon(
          0% 8%, 
          6% 8%, 6% 4%, 
          11% 4%, 11% 9%, 
          17% 9%, 17% 2%, 
          23% 2%, 23% 7%, 
          29% 7%, 29% 5%, 
          35% 5%, 35% 3%, 
          41% 3%, 41% 8%, 
          47% 8%, 47% 6%, 
          53% 6%, 53% 1%, 
          59% 1%, 59% 9%, 
          65% 9%, 65% 4%, 
          71% 4%, 71% 7%, 
          77% 7%, 77% 2%, 
          83% 2%, 83% 6%, 
          89% 6%, 89% 8%, 
          95% 8%, 95% 3%, 
          100% 3%, 100% 100%, 
          0% 100%
        )`,
        marginTop: "-100px",
        paddingTop: "150px",
        position: "relative",
        zIndex: 10,
        color: "#fff",
      }}
      // ref={parallaxRef as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <h2
          className="section-title"
          style={{
            marginTop: "-20px",
            marginBottom: "40px",
            color: "white",
            position: "relative",
            zIndex: 20,
          }}
        >
          Education & Certifications
        </h2>

        <div className="library-container">
          {/* Left Side - Education Info & Selected Certificate */}
          <div className="library-left">
            {/* Top Half - Education Degree (Static) */}
            <div className="education-degree-section">
              <div
                className="degree-card"
                style={{ border: "1px solid var(--primary-red-light)" }}
              >
                <div className="degree-header"></div>
                <h3 className="degree-title">{education.degree}</h3>
                <p className="degree-institution" style={{ color: "#ed5076" }}>
                  {education.institution}
                </p>
                <div className="degree-details">
                  <span className="degree-period">{education.period}</span>
                  <span className="degree-location">{education.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom Half - Selected Certificate Details */}
            <div className="certificate-display-section">
              <div className="certificate-display">
                {selectedBook !== null ? (
                  <div className="selected-certificate">
                    <div className="cert-header">
                      <BookOpen
                        size={24}
                        style={{ color: "rgb(237, 80, 118)" }}
                      />
                      <h4>
                        {certifications[selectedBook].type === "certification"
                          ? "Certification Details"
                          : "Course Details"}
                      </h4>
                    </div>
                    <div className="cert-details">
                      <h5 className="cert-title-large">
                        {certifications[selectedBook].title}
                      </h5>
                      <p className="cert-issuer-large">
                        {certifications[selectedBook].issuer}
                      </p>
                      {/* Education navigation indicator */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "8px",
                          marginTop: "40px",
                          paddingBottom: "20px",
                        }}
                      >
                        {certifications.map((_, index) => (
                          <div
                            key={index}
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor:
                                index === selectedBook
                                  ? "rgb(237, 80, 118)"
                                  : "#555",
                              transition: "background-color 0.3s ease",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-selection">
                    <BookOpen
                      size={48}
                      style={{ color: "#64748b", opacity: 0.5 }}
                    />
                    <p>Click on a book to view certificate details</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Bookshelf */}
          <div className="library-right">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Indicator above the bookshelf */}
              <img
                src="/indicator.gif"
                alt="Click indicator"
                style={{
                  width: "60px",
                  height: "60px",
                  marginBottom: "40px",
                  marginRight: "112px",
                  marginTop: "50px",
                  zIndex: 10,
                }}
              />

              <div className="bookshelf-background">
                <img
                  src="/bookShelf.png"
                  alt="3D Bookshelf"
                  className="bookshelf-image"
                  style={{ width: "95%", height: "95%", objectFit: "contain" }}
                />
              </div>

              {/* Interactive Book Areas (coordinates to be provided) */}
              <div className="interactive-books">
                {certifications.map((cert, index) => {
                  // Coordinates for button placement on 425x463 image (scaled to 95%)
                  const bookCoordinates = [
                    { left: 42, top: 149, width: 55, height: 67 }, // Book 1: positioned at 42,149
                    { left: 92, top: 145, width: 55, height: 67 }, // Book 2: positioned at 92,143
                    { left: 223, top: 122, width: 55, height: 67 }, // Book 3: positioned at 223,133
                    { left: 49, top: 252, width: 55, height: 67 }, // Book 4: positioned at 49,259
                    { left: 197, top: 252, width: 55, height: 67 }, // Book 5: positioned at 197,259
                    { left: 224, top: 378, width: 55, height: 67 }, // Book 6: positioned at 224,389
                  ];

                  const coords = bookCoordinates[index] || {
                    left: 20 + index * 60,
                    top: 100 + Math.floor(index / 3) * 80,
                    width: 50,
                    height: 70,
                  };

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedBook(index)}
                      style={{
                        position: "absolute",
                        left: `${coords.left}px`,
                        top: `${coords.top}px`,
                        width: `${coords.width}px`,
                        height: `${coords.height}px`,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 20,
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        const span = e.currentTarget.querySelector("span");
                        if (span && selectedBook !== index)
                          span.style.color = "rgb(237, 80, 118)";
                      }}
                      onMouseLeave={(e) => {
                        const span = e.currentTarget.querySelector("span");
                        if (span && selectedBook !== index)
                          span.style.color = "white";
                      }}
                      title={cert.title}
                    >
                      <span
                        style={{
                          color:
                            selectedBook === index
                              ? "rgb(237, 80, 118)"
                              : "white",
                          fontSize: "16px",
                          transition: "color 0.3s ease",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
