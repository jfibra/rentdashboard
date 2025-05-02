"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { Plus, Minus } from "lucide-react"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

export function DescriptionStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    updateFormData({ [id]: value })
  }

  const handleIncrement = (field: "bedrooms" | "bathrooms" | "garages") => {
    updateFormData({ [field]: formData[field] + 1 })
  }

  const handleDecrement = (field: "bedrooms" | "bathrooms" | "garages") => {
    if (formData[field] > 0) {
      updateFormData({ [field]: formData[field] - 1 })
    }
  }

  const handleNext = () => {
    navigate("/create-listing/step/4")
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/2")
  }

  return (
    <StepLayout title="Description" onNext={handleNext} onPrevious={handlePrevious}>
      <div className="description-grid">
        <div className="counter-item">
          <label>No. of Bed</label>
          <div className="counter">
            <button
              type="button"
              className="counter-button"
              onClick={() => handleDecrement("bedrooms")}
              disabled={formData.bedrooms === 0}
            >
              <Minus size={16} />
            </button>
            <span className="counter-value">{formData.bedrooms}</span>
            <button type="button" className="counter-button" onClick={() => handleIncrement("bedrooms")}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="counter-item">
          <label>No. of Bathroom</label>
          <div className="counter">
            <button
              type="button"
              className="counter-button"
              onClick={() => handleDecrement("bathrooms")}
              disabled={formData.bathrooms === 0}
            >
              <Minus size={16} />
            </button>
            <span className="counter-value">{formData.bathrooms}</span>
            <button type="button" className="counter-button" onClick={() => handleIncrement("bathrooms")}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="counter-item">
          <label>No. of Garages</label>
          <div className="counter">
            <button
              type="button"
              className="counter-button"
              onClick={() => handleDecrement("garages")}
              disabled={formData.garages === 0}
            >
              <Minus size={16} />
            </button>
            <span className="counter-value">{formData.garages}</span>
            <button type="button" className="counter-button" onClick={() => handleIncrement("garages")}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="lotArea">Lot Area (Optional)</label>
          <input
            type="number"
            id="lotArea"
            placeholder="e.g. 250"
            value={formData.lotArea}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="floorArea">Floor Area</label>
          <div className="input-group">
            <input
              type="number"
              id="floorArea"
              placeholder="e.g. 100"
              value={formData.floorArea}
              onChange={handleInputChange}
            />
            <select id="areaUnit" className="input-group-append" value={formData.areaUnit} onChange={handleInputChange}>
              <option value="sqft">sqft</option>
              <option value="sqm">sqm</option>
            </select>
          </div>
        </div>
      </div>
    </StepLayout>
  )
}
