import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ClinicalTasksGlossary = () => {
  const tasks = [
    {
      id: "reconstruction",
      title: "Reconstruction",
      definition: "AI-enhanced reconstruction of medical images from raw scan data. This includes advanced algorithms that improve image quality, reduce noise, and accelerate acquisition times in CT, MRI, and other imaging modalities."
    },
    {
      id: "image-enhancement",
      title: "Image Enhancement", 
      definition: "AI-powered improvement of medical image quality through noise reduction, artifact correction, and resolution enhancement. These solutions optimize existing images to improve diagnostic confidence and treatment planning accuracy."
    },
    {
      id: "image-synthesis",
      title: "Image Synthesis",
      definition: "Generation of synthetic medical images from existing scans or other data sources. This includes synthetic CT generation from MRI for treatment planning, enabling MRI-only workflows by providing electron density information needed for dose calculations."
    },
    {
      id: "auto-contouring",
      title: "Auto-Contouring",
      definition: "AI-driven automatic segmentation and delineation of organs at risk and target volumes from medical images. This technology automatically identifies and outlines anatomical structures, reducing manual contouring time and improving consistency across users."
    },
    {
      id: "tracking",
      title: "Tracking",
      definition: "Real-time monitoring and tracking of patient positioning and organ motion during treatment delivery. AI systems can detect and compensate for patient movement and anatomical changes to ensure accurate radiation delivery."
    },
    {
      id: "treatment-planning",
      title: "Treatment Planning",
      definition: "AI-assisted optimization of radiation therapy treatment plans using advanced algorithms. This includes beam angle selection, fluence optimization, dose prediction, and plan quality assessment to improve treatment efficiency and outcomes."
    },
    {
      id: "registration",
      title: "Registration",
      definition: "Automated alignment and registration of medical images from different time points, modalities, or coordinate systems. AI algorithms ensure accurate spatial correspondence between planning and treatment images for precise dose delivery."
    },
    {
      id: "performance-monitor",
      title: "Performance Monitor",
      definition: "AI-based quality assurance and performance monitoring systems for treatment delivery equipment. These solutions automatically verify treatment accuracy, detect potential errors, and ensure treatments meet established quality standards."
    },
    {
      id: "clinical-prediction",
      title: "Clinical Prediction",
      definition: "AI models for predicting clinical outcomes, treatment response, and toxicity risk based on patient data and imaging features. This emerging field aims to personalize treatment decisions and improve patient outcomes through predictive analytics."
    },
    {
      id: "reporting",
      title: "Reporting",
      definition: "Automated generation of clinical reports, treatment summaries, and documentation using natural language processing and AI. This emerging technology promises to reduce administrative burden while ensuring comprehensive and standardized reporting."
    }
  ];

  return (
    <div className="bg-card rounded-lg border p-6">
      <Accordion type="single" collapsible className="w-full">
        {tasks.map((task) => (
          <AccordionItem key={task.id} value={task.id}>
            <AccordionTrigger className="text-left">
              <span className="font-semibold text-foreground">{task.title}</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground leading-relaxed">
                {task.definition}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ClinicalTasksGlossary;