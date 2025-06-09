
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, Mail, FileDown, Heart, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

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

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = './DLinRT_eu_Intent_Roadmap_v0_1.pdf';
    link.download = 'DLinRT_eu_Intent_Roadmap_v0_1.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About DLinRT.eu & Team"
        description="Learn about our mission, goals, and team dedicated to advancing deep learning in radiotherapy through open-source, community-driven initiatives."
        canonical="https://dlinrt.eu/maintenance-team"
        structuredData={structuredData}
      />
      
      {/* Black Paper Download Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About DLinRT.eu</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">DLinRT.eu Intent & Roadmap</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Learn more about our mission, goals, and future plans—rooted in our non-profit, independent, open-source, and community-driven ethos—in our official Black Paper document
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white hover:bg-gray-100 border border-gray-200 shadow-sm"
            onClick={handleDownloadClick}
          >
            <FileDown className="h-5 w-5" />
            <span>Download Black Paper (PDF)</span>
          </Button>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-[#00A6D6]" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To accelerate innovation in radiotherapy by creating an open, comprehensive database of deep learning solutions. 
              We bridge the gap between cutting-edge AI research and clinical practice, making advanced tools accessible to 
              radiation oncology professionals worldwide.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-6 w-6 text-[#00A6D6]" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              A future where every radiation oncology center, regardless of size or location, has access to state-of-the-art 
              deep learning tools that improve patient outcomes, enhance treatment precision, and streamline clinical workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Non-Profit</h3>
                <p className="text-gray-600 text-sm">
                  Driven by mission, not profit. We prioritize patient care and scientific advancement.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Independent</h3>
                <p className="text-gray-600 text-sm">
                  Unbiased evaluations and recommendations free from commercial influence.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Open-Source</h3>
                <p className="text-gray-600 text-sm">
                  Transparent, collaborative development with open access to knowledge and tools.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Community-Driven</h3>
                <p className="text-gray-600 text-sm">
                  Built by and for the radiotherapy community, fostering collaboration and knowledge sharing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 text-[#00A6D6]" />
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <p className="text-lg text-gray-500">The experts who keep our systems running smoothly</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex justify-center">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>
                      <User className="h-16 w-16" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="text-center pt-4">
                <CardTitle className="text-xl mb-2">{member.name}</CardTitle>
                <p className="text-gray-600 mb-4">{member.role}</p>
                
                <div className="flex justify-center mb-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[#00A6D6] hover:text-[#00A6D6]/80 transition-colors duration-200 flex items-center gap-1"
                    aria-label={`Contact ${member.name} by email`}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="text-sm">Contact</span>
                  </a>
                </div>
                
                <Link
                  to={member.bio}
                  className="text-[#00A6D6] hover:text-[#00A6D6]/80 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Bio →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="text-[#00A6D6] hover:text-[#00A6D6]/80 transition-colors duration-200">
            ← Back to Products
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MaintenanceTeam;
