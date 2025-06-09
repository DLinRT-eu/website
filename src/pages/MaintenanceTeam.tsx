
import { Link } from "react-router-dom";
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
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGq6Zvj1IRXLw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677416417272?e=1753315200&v=beta&t=HFi9QRUXVuJ3DJnWgXgIcg0erCWOwzXpzKmgqdlojSk",
    bio: "https://portal.research.lu.se/en/persons/mustafa-kadhim",
    email: "mustafa.kadhim@dlinrt.eu",
  }
];

const MaintenanceTeam = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About DLinRT.eu & Maintenance Team",
    "description": "Learn about our mission, goals, and meet the experts who maintain the DLinRT products finder",
    "url": "https://dlinrt.eu/maintenance-team",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Deep Learning in Radiotherapy",
      "url": "https://dlinrt.eu"
    },
    "about": {
      "@type": "Organization",
      "name": "DLinRT Maintenance Team",
      "member": TEAM_MEMBERS.map(member => ({
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
        title="About DLinRT.eu & Team"
        description="Learn about our mission, goals, and team dedicated to advancing deep learning in radiotherapy through open-source, community-driven initiatives."
        canonical="https://dlinrt.eu/maintenance-team"
        structuredData={structuredData}
      />
      
      <BlackPaperSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <TeamSection teamMembers={TEAM_MEMBERS} />
      <Footer />
    </div>
  );
};

export default MaintenanceTeam;
