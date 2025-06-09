
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, Mail, Users } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const TeamSection = ({ teamMembers }: TeamSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="h-6 w-6 text-[#00A6D6]" />
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
        </div>
        <p className="text-lg text-gray-500">The experts who keep our systems running smoothly</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
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
  );
};

export default TeamSection;
