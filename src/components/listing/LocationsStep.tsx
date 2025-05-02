"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Navigation } from "lucide-react"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

// Leaflet Map Component
const LeafletMap = ({
  position,
  setPosition,
  zoom,
  setZoom,
}: {
  position: [number, number]
  setPosition: Function
  zoom: string
  setZoom: Function
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [isMapInitialized, setIsMapInitialized] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const mapInstanceId = useRef(`map-${Math.random().toString(36).substring(2, 9)}`)

  // Load Leaflet scripts and CSS only once
  useEffect(() => {
    if (window.L) {
      setIsScriptLoaded(true)
      return
    }

    // Check if scripts are already being loaded
    if (document.getElementById("leaflet-css") && document.getElementById("leaflet-js")) {
      const checkIfLoaded = setInterval(() => {
        if (window.L) {
          setIsScriptLoaded(true)
          clearInterval(checkIfLoaded)
        }
      }, 100)
      return () => clearInterval(checkIfLoaded)
    }

    // Load Leaflet CSS
    const linkEl = document.createElement("link")
    linkEl.rel = "stylesheet"
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    linkEl.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    linkEl.crossOrigin = ""
    linkEl.id = "leaflet-css"
    document.head.appendChild(linkEl)

    // Load Leaflet JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    script.crossOrigin = ""
    script.id = "leaflet-js"
    script.onload = () => setIsScriptLoaded(true)
    document.head.appendChild(script)

    return () => {
      // We don't remove the script and CSS as they might be used by other components
    }
  }, [])

  // Initialize map after Leaflet is loaded
  useEffect(() => {
    // Skip if scripts not loaded, container not ready, or map already initialized
    if (!isScriptLoaded || !mapContainerRef.current || !window.L) return

    // Clean up any existing map instance
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
      markerRef.current = null
    }

    // Ensure the container has a unique ID
    if (mapContainerRef.current) {
      mapContainerRef.current.id = mapInstanceId.current
    }

    const L = window.L
    const numericZoom = Number.parseInt(zoom, 10) || 14

    try {
      // Create map
      mapRef.current = L.map(mapContainerRef.current).setView(position, numericZoom)

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Add marker with custom icon
      const icon = L.icon({
        iconUrl: "/RentPhPinMap.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
        className: "custom-map-marker",
      })

      markerRef.current = L.marker(position, { icon }).addTo(mapRef.current)

      // Handle map click
      mapRef.current.on("click", (e: any) => {
        const { lat, lng } = e.latlng
        setPosition([lat, lng])
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng])
        }
      })

      // Handle zoom change
      mapRef.current.on("zoomend", () => {
        if (mapRef.current) {
          const currentZoom = mapRef.current.getZoom()
          setZoom(currentZoom.toString())
        }
      })

      setIsMapInitialized(true)
    } catch (error) {
      console.error("Error initializing map:", error)
    }

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
        setIsMapInitialized(false)
      }
    }
  }, [isScriptLoaded, position, zoom, setPosition, setZoom])

  // Update marker position when position changes
  const updateMarkerPosition = useCallback(() => {
    if (!markerRef.current || !mapRef.current || !isMapInitialized) return

    try {
      markerRef.current.setLatLng(position)
      mapRef.current.panTo(position)
    } catch (error) {
      console.error("Error updating marker position:", error)
    }
  }, [position, isMapInitialized])

  useEffect(() => {
    updateMarkerPosition()
  }, [updateMarkerPosition])

  // Update zoom when zoom changes
  useEffect(() => {
    if (!mapRef.current || !isMapInitialized) return

    try {
      const numericZoom = Number.parseInt(zoom, 10) || 14
      mapRef.current.setZoom(numericZoom)
    } catch (error) {
      console.error("Error updating zoom:", error)
    }
  }, [zoom, isMapInitialized])

  return (
    <div className="leaflet-map-container">
      <div
        ref={mapContainerRef}
        className="leaflet-map"
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {(!isScriptLoaded || !isMapInitialized) && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
              zIndex: 1000,
            }}
          >
            <div className="loading-spinner"></div>
            <p style={{ marginTop: "16px", color: "#6b7280" }}>Loading map...</p>
          </div>
        )}
      </div>
      <div className="map-controls">
        <button
          type="button"
          className="map-control-button"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords
                  setPosition([latitude, longitude])
                },
                (error) => {
                  console.error("Error getting location:", error)
                  alert("Could not get your location. Please try again or set it manually.")
                },
              )
            } else {
              alert("Geolocation is not supported by your browser")
            }
          }}
          title="Use my current location"
        >
          <Navigation size={18} />
          <span>My Location</span>
        </button>
      </div>
    </div>
  )
}

// Add this to the global window object for TypeScript
declare global {
  interface Window {
    L: any
  }
}

export function LocationsStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()
  const [provinces, setProvinces] = useState<Array<{ id: number; name: string; state_code: string }>>([])

  // Use refs to track previous values to prevent unnecessary updates
  const prevLatRef = useRef(formData.mapLatitude)
  const prevLngRef = useRef(formData.mapLongitude)
  const prevZoomRef = useRef(formData.mapZoom)

  const [mapPosition, setMapPosition] = useState<[number, number]>([
    Number.parseFloat(formData.mapLatitude) || 14.5995,
    Number.parseFloat(formData.mapLongitude) || 120.9842,
  ])
  const [mapZoom, setMapZoom] = useState(formData.mapZoom || "14")
  const [addressPreview, setAddressPreview] = useState<string | null>(null)

  // Flag to prevent initial update
  const initialRenderRef = useRef(true)

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("/countries.json")
        const data = await response.json()

        // Find the country named Philippines
        const philippines = data.find((country) => country.name === "Philippines")

        // Set provinces from the states of Philippines
        setProvinces(philippines?.states || [])
      } catch (error) {
        console.error("Error fetching provinces:", error)
      }
    }

    fetchProvinces()
  }, [])

  // Update form data when map position changes, with safeguards
  useEffect(() => {
    // Skip the first render to avoid initial update loop
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      return
    }

    const lat = mapPosition[0].toString()
    const lng = mapPosition[1].toString()

    // Only update if values have actually changed
    if (lat !== prevLatRef.current || lng !== prevLngRef.current || mapZoom !== prevZoomRef.current) {
      prevLatRef.current = lat
      prevLngRef.current = lng
      prevZoomRef.current = mapZoom

      updateFormData({
        mapLatitude: lat,
        mapLongitude: lng,
        mapZoom: mapZoom,
      })
    }
  }, [mapPosition, mapZoom, updateFormData])

  useEffect(() => {
    // Update address preview when street or province changes
    if (formData.street && formData.province) {
      setAddressPreview(`${formData.street}, ${formData.province}, Philippines`)
    } else if (formData.street) {
      setAddressPreview(`${formData.street}, Philippines`)
    } else if (formData.province) {
      setAddressPreview(`${formData.province}, Philippines`)
    } else {
      setAddressPreview(null)
    }
  }, [formData.street, formData.province])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    updateFormData({ [id]: value })

    // Update map position if latitude or longitude is changed manually
    if (id === "mapLatitude" || id === "mapLongitude") {
      const lat = id === "mapLatitude" ? Number.parseFloat(value) : mapPosition[0]
      const lng = id === "mapLongitude" ? Number.parseFloat(value) : mapPosition[1]
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapPosition([lat, lng])
      }
    }

    // Update map zoom if zoom is changed
    if (id === "mapZoom") {
      setMapZoom(value)
    }
  }

  const handleNext = () => {
    navigate("/create-listing/step/8")
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/6")
  }

  return (
    <StepLayout title="Locations" onNext={handleNext} onPrevious={handlePrevious}>
      <div className="location-container">
        <div className="location-inputs">
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              placeholder="Enter street address"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              className="form-control"
              value={formData.province}
              onChange={handleInputChange}
              required
            >
              <option value="">-- Select Province --</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {addressPreview && (
          <div className="address-preview">
            <div className="address-preview-header">
              <span>Address Preview</span>
            </div>
            <div className="address-preview-content">{addressPreview}</div>
          </div>
        )}

        <div className="map-container">
          <div className="map-wrapper">
            <LeafletMap position={mapPosition} setPosition={setMapPosition} zoom={mapZoom} setZoom={setMapZoom} />
          </div>

          <div className="map-coordinates">
            <div className="form-group">
              <label htmlFor="mapLatitude">Map Latitude</label>
              <input type="text" id="mapLatitude" value={formData.mapLatitude} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="mapLongitude">Map Longitude</label>
              <input type="text" id="mapLongitude" value={formData.mapLongitude} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label htmlFor="mapZoom">Map Zoom</label>
              <select id="mapZoom" className="form-control" value={formData.mapZoom} onChange={handleInputChange}>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  )
}
