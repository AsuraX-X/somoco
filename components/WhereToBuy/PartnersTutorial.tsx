import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";

interface Step {
  title: string;
  description: string;
  target?: string;
}

const steps: Step[] = [
  {
    title: "Welcome to Our Partners!",
    description:
      "Let's show you how to find dealers and service partners near you.",
  },
  {
    title: "Step 1: Select Your Region",
    description:
      "Start by selecting your region from the dropdown. This will show all available locations in that area.",
    target: "region",
  },
  {
    title: "Step 2: Choose a Specific Location (Optional)",
    description:
      "Narrow down your search by selecting a specific town or city within your region.",
    target: "location",
  },
  {
    title: "Step 3: Browse Results",
    description:
      "Scroll down to see categorized results: Vehicle Dealers, Tyres & Batteries, Spares Dealers, Service Partners, and Warranty Touch Points.",
  },
];

export function WhereToBuyTutorial() {
  const [isOpen, setIsOpen] = useState(() => {
    // Initialize based on localStorage
    const hasSeenTutorial = localStorage.getItem("whereToBuyTutorialSeen");
    return !hasSeenTutorial;
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("whereToBuyTutorialSeen", "true");
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-40 text-sm font-medium"
      >
        Need help?
      </button>
    );
  }

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />

      {/* Tutorial Card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 z-50">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 pr-8">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index === currentStep
                  ? "bg-primary"
                  : index < currentStep
                    ? "bg-primary/50"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-0"
          >
            Previous
          </button>

          <div className="text-sm text-gray-500">
            {currentStep + 1} of {steps.length}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            {currentStep === steps.length - 1 ? "Got it!" : "Next"}
            {currentStep < steps.length - 1 && (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
