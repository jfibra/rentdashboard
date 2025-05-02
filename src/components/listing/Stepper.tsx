"use client"

import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"

interface StepperProps {
  steps: string[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const navigate = useNavigate()

  const handleStepClick = (index: number) => {
    navigate(`/create-listing/step/${index + 1}`)
  }

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? "active" : ""} ${index < currentStep ? "completed" : ""}`}
          onClick={() => handleStepClick(index)}
        >
          <div className="step-number">
            {index < currentStep ? <Check size={16} className="check-icon" /> : index + 1}
          </div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  )
}
