"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

export function DetailsStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()
  const [projectOptions, setProjectOptions] = useState<Array<{ value: string; name: string; location: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProjectOptions = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/dropdown.txt")
        const html = await response.text()

        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")
        const options = doc.querySelectorAll("option")

        const parsedOptions = Array.from(options).map((option) => ({
          value: option.getAttribute("value") || "",
          name: option.getAttribute("data-name") || "",
          location: option.getAttribute("data-location") || "",
          text: option.textContent?.trim() || "",
        }))

        // Filter out the first option which is usually "-- Select Project --"
        setProjectOptions(parsedOptions.filter((option) => option.value !== ""))
      } catch (error) {
        console.error("Error fetching project options:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (formData.category_id === "1") {
      fetchProjectOptions()
    }
  }, [formData.category_id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, name, value } = e.target
    const fieldName = id || name
    updateFormData({ [fieldName]: value })
  }

  const handleNext = () => {
    navigate("/create-listing/step/2")
  }

  return (
    <StepLayout title="Property Details" onNext={handleNext} isFirstStep>
      <div className="form-group">
        <label htmlFor="category_id">Category</label>
        <select
          name="category_id"
          id="category_id"
          className="form-control"
          value={formData.category_id}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Please Select --</option>
          <option value="1">Condominium</option>
          <option value="12">- Studio</option>
          <option value="13">- 1 Bedroom</option>
          <option value="14">- 2 Bedroom</option>
          <option value="15">- 3 Bedroom</option>
          <option value="2">House and Lot</option>
          <option value="3">Apartment</option>
          <option value="5">Bed Space</option>
          <option value="6">Commercial Spaces</option>
          <option value="7">Lot only</option>
          <option value="8">Office Spaces</option>
          <option value="9">Warehouse</option>
          <option value="10">Dormitory</option>
          <option value="11">Others</option>
          <option value="17">Parking Space</option>
          <option value="18">Function Hall</option>
          <option value="19">Co-Working Spaces</option>
          <option value="20">Conference Hall</option>
          <option value="21">Training Hall</option>
          <option value="22">Billboards</option>
          <option value="23">Industrial</option>
          <option value="24">Beach House</option>
          <option value="25">Townhouse</option>
          <option value="26">Farm Land</option>
        </select>
      </div>

      {formData.category_id === "1" && (
        <div className="form-group">
          <label htmlFor="proj_id">Select Project</label>
          <select
            name="proj_id"
            id="proj_id"
            className="form-control"
            value={formData.proj_id}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">-- Select Project --</option>
            {isLoading ? (
              <option value="" disabled>
                Loading projects...
              </option>
            ) : (
              projectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text || `${option.name} - ${option.location}`}
                </option>
              ))
            )}
          </select>
        </div>
      )}

      <h3 className="subsection-title">Property Content</h3>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          placeholder="Name of the property"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          className="content-textarea"
          placeholder="Describe your property in detail..."
          value={formData.content}
          onChange={handleInputChange}
          required
        />
      </div>
    </StepLayout>
  )
}
