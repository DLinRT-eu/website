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
      id: "auto-contouring",
      title: "Automatic Segmentation / Contouring",
      definition: "AI-driven delineation of organs at risk and target volumes from medical images. This technology automatically identifies and outlines anatomical structures, reducing manual contouring time and improving consistency."
    },
    {
      id: "synthetic-ct",
      title: "Synthetic CT Generation", 
      definition: "Creation of artificial CT images from MRI scans for treatment planning. This enables MRI-only workflows by generating electron density information needed for dose calculations."
    },
    {
      id: "dose-prediction",
      title: "Dose Prediction",
      definition: "AI-assisted prediction of radiation dose distributions before formal treatment planning. This helps optimize treatment parameters and estimate achievable dose-volume metrics."
    },
    {
      id: "treatment-planning",
      title: "Treatment Planning",
      definition: "Automated optimization of radiation therapy plans using AI algorithms. This includes beam angle selection, fluence optimization, and plan quality prediction to improve treatment efficiency."
    },
    {
      id: "image-guidance",
      title: "Image Guidance (e.g., CBCT Enhancement)",
      definition: "Enhancement of cone-beam CT and positioning images for improved accuracy during treatment delivery. AI reduces noise, corrects artifacts, and improves image quality for better patient setup verification."
    },
    {
      id: "quality-assurance",
      title: "Quality Assurance (QA)",
      definition: "Automated verification and monitoring of treatment delivery accuracy and safety. AI systems can detect potential errors, verify plan integrity, and ensure treatments meet quality standards."
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