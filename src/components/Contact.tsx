import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { personalInfo } from "../constants/portfolioData";
// import useParallax from "../hooks/useParallax";

const Contact = () => {
  return (
    <section
      id="contact"
      className="contact"
      style={{
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
        paddingTop: "100px",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div className="container">
        <h2 className="section-title animate-fade-up">Let's Connect</h2>
        <div className="contact-content">
          <div className="contact-info animate-fade-up delay-200">
            <div className="contact-details">
              <div className="contact-item animate-slide-left delay-300 animate-glow-hover">
                <Mail size={20} />
                <div>
                  <span className="contact-label">Email</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="contact-value"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="contact-item animate-slide-left delay-400 animate-glow-hover">
                <Linkedin size={20} />
                <div>
                  <span className="contact-label">LinkedIn</span>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    className="contact-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              <div className="contact-item animate-slide-left delay-500 animate-glow-hover">
                <Github size={20} />
                <div>
                  <span className="contact-label">GitHub</span>
                  <a
                    href={personalInfo.socialLinks.github}
                    className="contact-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>

              <div className="contact-item animate-slide-left delay-600 animate-glow-hover">
                <MapPin size={20} />
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
