"use client"

import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

interface StepLayoutProps {
  title: string
  children: ReactNode
  onNext?: () => void
  onPrevious?: () => void
  isLastStep?: boolean
  isFirstStep?: boolean
}

export function StepLayout({
  title,
  children,
  onNext,
  onPrevious,
  isLastStep = false,
  isFirstStep = false,
}: StepLayoutProps) {
  return (
    <div className="step-content">
      <h2 className="section-title">{title}</h2>
      {children}
      <div className="form-actions">
        {!isFirstStep && (
          <button type="button" className="secondary-button" onClick={onPrevious}>
            Back
          </button>
        )}
        {!isLastStep ? (
          <button type="button" className="primary-button" onClick={onNext}>
            Save & Continue
          </button>
        ) : (
          <button type="submit" className="submit-button">
            Publish Listing
          </button>
        )}
      </div>
    </div>
  )
}

export function ListingPageLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <div className="create-listing-container">
      <div className="listing-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h1 className="page-title">Create New Listing</h1>
      </div>
      {children}
    </div>
  )
}
