import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import BlackPaperSection from "@/components/about/BlackPaperSection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import TeamSection from "@/components/about/TeamSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Building2, User } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Matteo Maspero",
    role: "Website creator, Lead Developer & Reviewer",
    image: "/people/matteo-maspero.jpg",
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
    image: "/people/PDoolan_portrait.jpg",
    bio: "https://www.linkedin.com/in/pjdoolan1/",
    email: "paul.doolan@dlinrt.eu",
  },
  {
    name: "Ana Maria Barragan Montero",
    role: "Advisor & Reviewer", 
    image: "/people/Ana.png",
    bio: "https://be.linkedin.com/in/ana-maria-barragan-montero-93090266",
    email: "ana.barragan@dlinrt.eu",
  },
  {
    name: "Federico Mastroleo",
    role: "Advisor & Reviewer", 
    image: "/people/Federico.jpg",
    bio: "https://www.linkedin.com/in/federico-mastroleo/",
    email: "federico.mastroleo@dlinrt.eu",
  },
  {
    name: "Viktor Rogowski",
    role: "Advisor & Reviewer", 
    image: "/people/Viktor.png",
    bio: "https://www.linkedin.com/in/viktor-rogowski/",
    email: "viktor.rogowski@dlinrt.eu",
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
      
      {/* What Happens After You Log In Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Happens After You Log In?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DLinRT.eu offers different experiences based on your role. Here's what you can expect after logging in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Regular User Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Regular User</CardTitle>
                <CardDescription>
                  Explore and track AI/ML products in radiotherapy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browse comprehensive product database</li>
                  <li>• Track products you've adopted</li>
                  <li>• Share your product experiences</li>
                  <li>• Access regulatory resources</li>
                  <li>• View market insights and analytics</li>
                  <li>• Request reviewer or company roles</li>
                </ul>
              </CardContent>
            </Card>

            {/* Reviewer Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                  <Eye className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Reviewer</CardTitle>
                <CardDescription>
                  Validate AI/ML products for regulatory compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access dedicated review dashboard</li>
                  <li>• Review assigned AI/ML products</li>
                  <li>• Validate regulatory compliance</li>
                  <li>• View user product experiences</li>
                  <li>• Provide detailed feedback</li>
                  <li>• Track review assignments and deadlines</li>
                </ul>
              </CardContent>
            </Card>

            {/* Company Representative Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                  <Building2 className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Company Representative</CardTitle>
                <CardDescription>
                  Manage your company's product portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Access company-specific dashboard</li>
                  <li>• Update product information</li>
                  <li>• View user adoption statistics</li>
                  <li>• Submit product revisions</li>
                  <li>• Respond to user feedback</li>
                  <li>• Track verification status</li>
                </ul>
              </CardContent>
            </Card>

            {/* Administrator Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Administrator</CardTitle>
                <CardDescription>
                  Full platform access and user management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Full system access and control</li>
                  <li>• Manage user roles and permissions</li>
                  <li>• Oversee product reviews</li>
                  <li>• Assign review tasks</li>
                  <li>• Monitor security and compliance</li>
                  <li>• Access analytics and audit logs</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Users with multiple roles can switch between them at any time using the role selector in the header menu.
            </p>
            <a 
              href="/roles" 
              className="text-primary hover:underline font-medium"
            >
              Learn more about roles and permissions →
            </a>
          </div>
        </div>
      </section>
      
      <TeamSection teamMembers={shuffledTeamMembers} />
      <Footer />
    </div>
  );
};

export default About;
