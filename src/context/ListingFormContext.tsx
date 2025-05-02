"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the form data type
export interface ListingFormData {
    // Step 1: Details
    category_id: string
    proj_id: string
    title: string
    content: string

    // Step 2: Images
    videoLink: string
    gallery: File[]

    // Step 3: Description
    bedrooms: number
    bathrooms: number
    garages: number
    lotArea: string
    floorArea: string
    areaUnit: string

    // Step 4: Features
    amenities: string[]
    furnishing: string[]

    // Step 5: Pricing
    propertyPrice: string
    paymentTerms: string

    // Step 6: Property Owner
    ownerFirstName: string
    ownerLastName: string
    ownerPhone: string
    ownerEmail: string
    ownerAddress: string
    ownerCountry: string

    // Step 7: Locations
    street: string
    province: string
    mapLatitude: string
    mapLongitude: string
    mapZoom: string

    // Step 8: Review
    hideFromProfile: boolean
}

// Define the context type
interface ListingFormContextType {
    formData: ListingFormData
    updateFormData: (data: Partial<ListingFormData>) => void
    resetForm: () => void
}

// Create the initial form data
const initialFormData: ListingFormData = {
    // Step 1: Details
    category_id: "",
    proj_id: "",
    title: "",
    content: "",

    // Step 2: Images
    videoLink: "",
    gallery: [],

    // Step 3: Description
    bedrooms: 0,
    bathrooms: 0,
    garages: 0,
    lotArea: "",
    floorArea: "",
    areaUnit: "sqft",

    // Step 4: Features
    amenities: [],
    furnishing: [],

    // Step 5: Pricing
    propertyPrice: "",
    paymentTerms: "Monthly",

    // Step 6: Property Owner
    ownerFirstName: "",
    ownerLastName: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerAddress: "",
    ownerCountry: "Philippines",

    // Step 7: Locations
    street: "",
    province: "",
    mapLatitude: "14.5995",
    mapLongitude: "120.9842",
    mapZoom: "14",

    // Step 8: Review
    hideFromProfile: false,
}

// Create the context
const ListingFormContext = createContext<ListingFormContextType | undefined>(undefined)

// Create the provider component
export function ListingFormProvider({ children }: { children: ReactNode }) {
    const [formData, setFormData] = useState<ListingFormData>(initialFormData)

    const updateFormData = (data: Partial<ListingFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }))
    }

    const resetForm = () => {
        setFormData(initialFormData)
    }

    return (
        <ListingFormContext.Provider value={{ formData, updateFormData, resetForm }}>
            {children}
        </ListingFormContext.Provider>
    )
}

// Create a custom hook to use the context
export function useListingForm() {
    const context = useContext(ListingFormContext)
    if (context === undefined) {
        throw new Error("useListingForm must be used within a ListingFormProvider")
    }
    return context
}
