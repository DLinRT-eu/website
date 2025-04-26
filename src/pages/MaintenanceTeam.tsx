
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Matteo Maspero",
    role: "Website creator, Lead Developer",
    image: "https://cig-utrecht.org/img/people/mmasp.jpg",
    bio: "https://cig-utrecht.org/members/matteo-maspero",
  }
];

const MaintenanceTeam = () => {
  return (
    <div className="min-h-screen bg-white py-12">
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
    </div>
  );
};

export default MaintenanceTeam;
