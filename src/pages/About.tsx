import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import BlackPaperSection from "@/components/about/BlackPaperSection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import TeamSection from "@/components/about/TeamSection";

const TEAM_MEMBERS = [
  {
    name: "Matteo Maspero",
    role: "Website creator, Lead Developer & Reviewer",
    image: "https://cig-utrecht.org/img/people/mmasp.jpg",
    bio: "https://cig-utrecht.org/members/matteo-maspero",
    email: "matteo.maspero@dlinrt.eu",
  },
  {
    name: "Mustafa Kadhim",
    role: "Maintainer & Reviewer",
    image: "/people/Musti_suite.png",
    bio: "https://portal.research.lu.se/en/persons/mustafa-kadhim",
    email: "mustafa.kadhim@dlinrt.eu",
  },
  {
    name: "Paul Doolan",
    role: "Advisor & Reviewer",
    image: "https://media.licdn.com/dms/image/v2/C5603AQFwqrTK0EGCwA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1601366437774?e=1756944000&v=beta&t=cD2rZV6XpB1FvsK1zNg9qFp3KA8QXU2e_wgmmGYJzZg",
    bio: "https://www.linkedin.com/in/pjdoolan1/",
    email: "paul.doolan@dlinrt.eu",
  },
  {
    name: "Ana Maria Barragan Montero",
    role: "Advisor & Reviewer", 
    image: "https://media.licdn.com/dms/image/v2/C4D03AQEZU-Eklp4OmQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1641728655258?e=1756944000&v=beta&t=Jjy194jxhY40_IB5hsj4eX_KpkIUOtvybJT5-WN0PXQ",
    bio: "https://be.linkedin.com/in/ana-maria-barragan-montero-93090266",
    email: "ana.barragan@dlinrt.eu",
  }
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const About = () => {
  const [shuffledTeamMembers, setShuffledTeamMembers] = useState(TEAM_MEMBERS);

  useEffect(() => {
    setShuffledTeamMembers(shuffleArray(TEAM_MEMBERS));
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About DLinRT.eu & Team",
    "description": "Learn about our mission, goals, and meet the experts who maintain the DLinRT products finder",
    "url": "https://dlinrt.eu/about",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    },
    "about": {
      "@type": "Organization",
      "name": "DLinRT Team",
      "member": shuffledTeamMembers.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "image": member.image,
        "sameAs": member.bio
      }))
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About DLinRT.eu - Mission, Team & Vision for AI in Radiotherapy"
        description="Discover our mission to advance deep learning in radiation oncology through open-source research. Meet our expert team dedicated to accelerating AI adoption in radiotherapy and medical device innovation."
        canonical="https://dlinrt.eu/about"
        structuredData={structuredData}
      />
      
      <BlackPaperSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <TeamSection teamMembers={shuffledTeamMembers} />
      <Footer />
    </div>
  );
};

export default About;