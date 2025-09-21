
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, Mail, Users } from "lucide-react";
import { useState } from "react";

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
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (memberName: string) => {
    console.log(`Image loading failed for: ${memberName}`);
    setImageErrors(prev => ({ ...prev, [memberName]: true }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
        </div>
        <p className="text-lg text-muted-foreground">The experts who keep our systems running smoothly</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {teamMembers.map((member) => (
          <Card key={member.name} className="w-full max-w-sm min-h-[380px] overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader className="pb-4 flex-shrink-0">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={member.image} 
                    alt={`${member.name} profile photo`}
                    className="object-cover"
                    onError={() => handleImageError(member.name)}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                    {imageErrors[member.name] ? getInitials(member.name) : <User className="h-12 w-12" />}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="text-center pt-0 flex-1 flex flex-col justify-between px-4 pb-6">
              <div className="mb-4">
                <CardTitle className="text-lg mb-2 text-foreground leading-tight">{member.name}</CardTitle>
                <p className="text-muted-foreground text-sm mb-4 min-h-[2.5rem] flex items-center justify-center">{member.role}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-center">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1"
                    aria-label={`Contact ${member.name} by email`}
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Contact</span>
                  </a>
                </div>
                
                <Link
                  to={member.bio}
                  className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Bio →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/" className="text-primary hover:text-primary/80 transition-colors duration-200">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
};

export default TeamSection;
