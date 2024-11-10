"use client";
import React, { ReactNode, useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { create } from "zustand";

// Define the store type with additional activeStep
type Store = {
  count: number;
  activeStep: number | null;
  inc: () => void;
  setActiveStep: (step: number | null) => void;
};

// Enhanced store with activeStep management
export const useAccStore = create<Store>()((set) => ({
  count: 1,
  activeStep: 1, // Initially active step matches initial count
  inc: () =>
    set((state) => {
      const newCount = state.count + 1;
      return {
        count: newCount,
        activeStep: newCount, // Automatically set activeStep to new count
      };
    }),
  setActiveStep: (step: number | null) => set({ activeStep: step }),
}));

const CartAccordions = ({
  title,
  step = 1,
  children,
}: {
  title: string;
  step: number;
  children: ReactNode;
}) => {
  const { count, activeStep, setActiveStep } = useAccStore();

  // Determine if this accordion should be open based on activeStep
  const isOpen = activeStep === step;

  // Handle expanding/collapsing accordion
  const handleClick = () => {
    if (step <= count) {
      // If clicking the currently open accordion, do nothing
      // If clicking a different accessible accordion, make it active
      if (isOpen) {
        // If clicking currently open accordion, collapse it
        setActiveStep(null);
      } else {
        // If clicking a different accordion, expand it
        setActiveStep(step);
      }
    }
  };

  // Auto-expand when count increases to match this step
  useEffect(() => {
    if (count === step) {
      setActiveStep(step);
    }
  }, [count, step, setActiveStep]);

  return (
    <div className="tw-mb-5">
      <h3
        className={`tw-m-0 tw-py-2.5 tw-px-5 tw-text-base/5 tw-capitalize tw-relative tw-font-normal tw-bg-secondaryHover tw-text-primary tw-flex tw-justify-between tw-items-center ${
          step <= count ? "tw-cursor-pointer" : ""
        }`}
        onClick={handleClick}
      >
        {title}
        {step <= count && (
          <svg
            className={`tw-w-4 tw-h-4 tw-transform tw-transition-transform tw-duration-200 ${
              isOpen ? "tw-rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </h3>

      <AnimateHeight duration={500} height={isOpen ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
};

export default CartAccordions;
