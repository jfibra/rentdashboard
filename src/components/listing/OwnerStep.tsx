"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

export function OwnerStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()

  const countryOptions = [
    "Philippines",
    "United States",
    "Canada",
    "Australia",
    "Singapore",
    "Japan",
    "South Korea",
    "Malaysia",
    "Thailand",
    "Vietnam",
    "Indonesia",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    updateFormData({ [id]: value })
  }

  const handleNext = () => {
    navigate("/create-listing/step/7")
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/5")
  }

  return (
    <StepLayout title="Lessor / Property Owner Information" onNext={handleNext} onPrevious={handlePrevious}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ownerFirstName">First Name</label>
          <input
            type="text"
            id="ownerFirstName"
            placeholder="Enter First Name"
            value={formData.ownerFirstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerLastName">Last Name</label>
          <input
            type="text"
            id="ownerLastName"
            placeholder="Enter Last Name"
            value={formData.ownerLastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ownerPhone">Phone</label>
          <div className="phone-input">
            <select className="country-code">
              <option value="+63">(+63) Philippines</option>
              <option value="+1">(+1) USA/Canada</option>
              <option value="+44">(+44) UK</option>
              <option value="+61">(+61) Australia</option>
            </select>
            <input
              type="tel"
              id="ownerPhone"
              placeholder="Enter Phone Number"
              value={formData.ownerPhone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ownerEmail">Email</label>
          <input
            type="email"
            id="ownerEmail"
            placeholder="Enter Email"
            value={formData.ownerEmail}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ownerAddress">Address</label>
          <input
            type="text"
            id="ownerAddress"
            placeholder="Enter Address"
            value={formData.ownerAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerCountry">Country</label>
          <select id="ownerCountry" className="form-control" value={formData.ownerCountry} onChange={handleInputChange}>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </StepLayout>
  )
}
