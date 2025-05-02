"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

export function FeaturesStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()

  const amenitiesOptions = [
    { value: "12", label: "Air Conditioning" },
    { value: "13", label: "Alarm system" },
    { value: "14", label: "Balcony" },
    { value: "15", label: "Broadband internet available" },
    { value: "16", label: "Built-in wardrobes" },
    { value: "17", label: "Dishwasher" },
    { value: "18", label: "Furnished" },
    { value: "19", label: "Garage" },
    { value: "20", label: "Garden" },
    { value: "21", label: "Gym" },
    { value: "22", label: "Outdoor entertainment area" },
    { value: "23", label: "Pets considered" },
    { value: "24", label: "Solar panels" },
    { value: "25", label: "Study" },
    { value: "26", label: "Swimming pool (in-ground)" },
    { value: "27", label: "Wi-Fi Internet" },
  ]

  const furnishingOptions = [
    { value: "28", label: "Fully Furnished" },
    { value: "29", label: "Semi Furnished" },
    { value: "30", label: "Unfurnished" },
  ]

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, group: "amenities" | "furnishing") => {
    const { value, checked } = e.target

    if (checked) {
      updateFormData({ [group]: [...formData[group], value] })
    } else {
      updateFormData({ [group]: formData[group].filter((item) => item !== value) })
    }
  }

  const handleNext = () => {
    navigate("/create-listing/step/5")
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/3")
  }

  return (
    <StepLayout title="Property features (optional)" onNext={handleNext} onPrevious={handlePrevious}>
      <p className="features-description">
        Make your property easier to find by selecting all the features below that apply.
      </p>

      <div className="features-grid">
        {amenitiesOptions.map((option) => (
          <label key={option.value} className="feature-checkbox">
            <input
              type="checkbox"
              name="amenities"
              value={option.value}
              checked={formData.amenities.includes(option.value)}
              onChange={(e) => handleCheckboxChange(e, "amenities")}
            />
            <span className="feature-label">{option.label}</span>
          </label>
        ))}
      </div>

      <h3 className="subsection-title">Furnishing</h3>
      <div className="features-grid furnishing-grid">
        {furnishingOptions.map((option) => (
          <label key={option.value} className="feature-checkbox">
            <input
              type="checkbox"
              name="furnishing"
              value={option.value}
              checked={formData.furnishing.includes(option.value)}
              onChange={(e) => handleCheckboxChange(e, "furnishing")}
            />
            <span className="feature-label">{option.label}</span>
          </label>
        ))}
      </div>

      <p className="features-note">
        Can't find a feature here that's key to your property? You can add it in the 'Description' step.
      </p>
    </StepLayout>
  )
}
