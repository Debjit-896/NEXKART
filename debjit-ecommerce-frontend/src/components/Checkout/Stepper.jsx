import React from 'react';

const steps = [
  { id: 1, label: 'Address' },
  { id: 2, label: 'Order Summary' },
  { id: 3, label: 'Payment' }
];

export default function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold z-10 transition-colors
                  ${isActive 
                    ? 'bg-[#3366FF] text-white ring-4 ring-[#3366FF]/20' 
                    : isCompleted
                      ? 'bg-[#EBF1FF] text-[#3366FF] border-2 border-[#3366FF]'
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span 
                className={`absolute top-12 text-sm font-medium whitespace-nowrap
                  ${isActive ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-500' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
            
            {!isLast && (
              <div 
                className={`flex-grow h-0.5 mx-4
                  ${isCompleted ? 'bg-[#3366FF]' : 'bg-gray-200'}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
