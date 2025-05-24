

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const TEAM_MEMBERS = [
  {
    name: "Matteo Maspero",
    role: "Website creator, Lead Developer & Reviewer",
    image: "https://cig-utrecht.org/img/people/mmasp.jpg",
    bio: "https://cig-utrecht.org/members/matteo-maspero",
  },
  {
    name: "Mustafa Kadhim",
    role: "Maintainer & Reviewer",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGq6Zvj1IRXLw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677416417272?e=1753315200&v=beta&t=HFi9QRUXVuJ3DJnWgXgIcg0erCWOwzXpzKmgqdlojSk",
    bio: "https://www.lunduniversity.lu.se/lucat/user/ef5db84c0cc6a2231d337bb509a243fe",
  }
];

const MaintenanceTeam = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Maintenance Team",
    "description": "Meet the experts who maintain the DLinRT products finder",
    "primaryImageOfPage": "https://cig-utrecht.org/img/people/mmasp.jpg",
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
    <div className="min-h-screen bg-white py-12">
      <SEO
        title="Maintenance Team"
        description="Meet the experts who develop and maintain the DLinRT products finder, led by Matteo Maspero."
        canonical="https://dlinrt.eu/maintenance-team"
        structuredData={structuredData}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Our Maintenance Team</h1>
          <p className="mt-4 text-lg text-gray-500">Meet the experts who keep our systems running smoothly</p>
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
