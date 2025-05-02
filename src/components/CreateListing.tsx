"use client"

import { useEffect } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { ListingFormProvider } from "../context/ListingFormContext"
import { ListingPageLayout } from "./listing/StepLayout"
import { Stepper } from "./listing/Stepper"
import { DetailsStep } from "./listing/DetailsStep"
import { ImagesStep } from "./listing/ImagesStep"
import { DescriptionStep } from "./listing/DescriptionStep"
import { FeaturesStep } from "./listing/FeaturesStep"
import { PricingStep } from "./listing/PricingStep"
import { OwnerStep } from "./listing/OwnerStep"
import { LocationsStep } from "./listing/LocationsStep"
import { ReviewStep } from "./listing/ReviewStep"
import "./CreateListing.css"

export const CreateListing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const steps = ["Details", "Images", "Description", "Features", "Pricing", "Property Owner", "Locations", "Review"]

  // Extract current step from URL
  const pathParts = location.pathname.split("/")
  const currentStepNumber = Number.parseInt(pathParts[pathParts.length - 1]) || 1
  const currentStep = currentStepNumber - 1

  // Redirect to first step if on base path
  useEffect(() => {
    if (location.pathname === "/create-listing") {
      navigate("/create-listing/step/1")
    }
  }, [location.pathname, navigate])

  return (
    <ListingFormProvider>
      <ListingPageLayout>
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="form-container">
          <Routes>
            <Route path="/step/1" element={<DetailsStep />} />
            <Route path="/step/2" element={<ImagesStep />} />
            <Route path="/step/3" element={<DescriptionStep />} />
            <Route path="/step/4" element={<FeaturesStep />} />
            <Route path="/step/5" element={<PricingStep />} />
            <Route path="/step/6" element={<OwnerStep />} />
            <Route path="/step/7" element={<LocationsStep />} />
            <Route path="/step/8" element={<ReviewStep />} />
            <Route path="*" element={<DetailsStep />} />
          </Routes>
        </div>
      </ListingPageLayout>
    </ListingFormProvider>
  )
}
