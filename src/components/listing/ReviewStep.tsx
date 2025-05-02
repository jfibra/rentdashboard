"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

export function ReviewStep() {
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ hideFromProfile: e.target.checked })
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/7")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted with data:", formData)
    alert("Listing created successfully!")
    navigate("/")
  }

  return (
    <StepLayout title="Review & Publish" onPrevious={handlePrevious} isLastStep>
      <div className="review-summary">
        <div className="review-column">
          <div className="review-section">
            <h3>Property Details</h3>
            <div className="review-item">
              <span className="review-label">Category:</span>
              <span className="review-value">{formData.category_id}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Title:</span>
              <span className="review-value">{formData.title}</span>
            </div>
          </div>

          <div className="review-section">
            <h3>Description</h3>
            <div className="review-item">
              <span className="review-label">Bedrooms:</span>
              <span className="review-value">{formData.bedrooms}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Bathrooms:</span>
              <span className="review-value">{formData.bathrooms}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Garages:</span>
              <span className="review-value">{formData.garages}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Floor Area:</span>
              <span className="review-value">
                {formData.floorArea} {formData.areaUnit}
              </span>
            </div>
          </div>

          <div className="review-section">
            <h3>Features</h3>
            <div className="review-item">
              <span className="review-label">Amenities:</span>
              <span className="review-value">
                {formData.amenities.length > 0
                  ? amenitiesOptions
                      .filter((option) => formData.amenities.includes(option.value))
                      .map((option) => option.label)
                      .join(", ")
                  : "None selected"}
              </span>
            </div>
            <div className="review-item">
              <span className="review-label">Furnishing:</span>
              <span className="review-value">
                {formData.furnishing.length > 0
                  ? furnishingOptions
                      .filter((option) => formData.furnishing.includes(option.value))
                      .map((option) => option.label)
                      .join(", ")
                  : "None selected"}
              </span>
            </div>
          </div>
        </div>

        <div className="review-column">
          <div className="review-section">
            <h3>Pricing</h3>
            <div className="review-item">
              <span className="review-label">Price:</span>
              <span className="review-value">₱{formData.propertyPrice}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Payment Terms:</span>
              <span className="review-value">{formData.paymentTerms}</span>
            </div>
          </div>

          <div className="review-section">
            <h3>Owner Information</h3>
            <div className="review-item">
              <span className="review-label">Name:</span>
              <span className="review-value">
                {formData.ownerFirstName} {formData.ownerLastName}
              </span>
            </div>
            <div className="review-item">
              <span className="review-label">Email:</span>
              <span className="review-value">{formData.ownerEmail}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Phone:</span>
              <span className="review-value">{formData.ownerPhone}</span>
            </div>
          </div>

          <div className="review-section">
            <h3>Location</h3>
            <div className="review-item">
              <span className="review-label">Street:</span>
              <span className="review-value">{formData.street}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Province:</span>
              <span className="review-value">{formData.province}</span>
            </div>
            <div className="review-item">
              <span className="review-label">Coordinates:</span>
              <span className="review-value">
                {formData.mapLatitude}, {formData.mapLongitude}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="review-gallery">
        <h3>Gallery</h3>
        <div className="review-images">
          {formData.gallery.length > 0 ? (
            <div className="review-image-grid">
              {formData.gallery.map((file, index) => (
                <div key={file.name + index} className="review-image-item">
                  <img src={URL.createObjectURL(file) || "/placeholder.svg"} alt={`Image ${index + 1}`} />
                  {index === 0 && <div className="cover-badge">Cover photo</div>}
                </div>
              ))}
            </div>
          ) : (
            <p>No images uploaded</p>
          )}
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            id="hideFromProfile"
            checked={formData.hideFromProfile}
            onChange={handleCheckboxChange}
          />
          <span>Check this if you don't want it to be visible on your profile page.</span>
        </label>
      </div>
    </StepLayout>
  )
}
