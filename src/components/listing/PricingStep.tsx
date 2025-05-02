"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { NumericFormat } from "react-number-format"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

export function PricingStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ paymentTerms: e.target.value })
  }

  const handleNext = () => {
    navigate("/create-listing/step/6")
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/4")
  }

  return (
    <StepLayout title="Pricing Information" onNext={handleNext} onPrevious={handlePrevious}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="propertyPrice">Property Price</label>
          <NumericFormat
            id="propertyPrice"
            placeholder="Property Price"
            value={formData.propertyPrice}
            onValueChange={(values) => {
              updateFormData({ propertyPrice: values.value })
            }}
            thousandSeparator={true}
            prefix="₱"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentTerms">Payment Terms</label>
          <select id="paymentTerms" className="form-control" value={formData.paymentTerms} onChange={handleInputChange}>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
      </div>
    </StepLayout>
  )
}
