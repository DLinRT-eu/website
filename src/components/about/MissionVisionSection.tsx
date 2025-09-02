
import { Heart, Globe } from "lucide-react";

const MissionVisionSection = () => {
  return (
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
            radiation oncology professionals worldwide while maintaining the highest standards of security and privacy.
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
  );
};

export default MissionVisionSection;
