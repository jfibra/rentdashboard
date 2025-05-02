"use client"

import type React from "react"

import { useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, Plus, X } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, useSortable, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { StepLayout } from "./StepLayout"
import { useListingForm } from "../../context/ListingFormContext"

// Sortable Image Component
function SortableImage({ file, index, onRemove }: { file: File; index: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.name + index })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="image-preview-item" {...attributes} {...listeners}>
      <img src={URL.createObjectURL(file) || "/placeholder.svg"} alt={`Preview ${index + 1}`} />
      <button
        type="button"
        className="remove-image-button"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
      >
        <X size={16} />
      </button>
      <div className="image-drag-indicator"></div>
      {index === 0 && <div className="cover-badge">Cover photo</div>}
    </div>
  )
}

export function ImagesStep() {
  const navigate = useNavigate()
  const { formData, updateFormData } = useListingForm()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before activating
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ videoLink: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      updateFormData({ gallery: [...formData.gallery, ...filesArray] })
    }
  }

  const handleRemoveImage = (index: number) => {
    updateFormData({
      gallery: formData.gallery.filter((_, i) => i !== index),
    })
  }

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event

      if (active.id !== over.id) {
        const oldIndex = formData.gallery.findIndex((file, i) => file.name + i === active.id)
        const newIndex = formData.gallery.findIndex((file, i) => file.name + i === over.id)

        updateFormData({
          gallery: arrayMove(formData.gallery, oldIndex, newIndex),
        })
      }
    },
    [formData.gallery, updateFormData],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files)
        updateFormData({ gallery: [...formData.gallery, ...newFiles] })
      }
    },
    [formData.gallery, updateFormData],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleNext = () => {
    navigate("/create-listing/step/3")
  }

  const handlePrevious = () => {
    navigate("/create-listing/step/1")
  }

  return (
    <StepLayout title="Images" onNext={handleNext} onPrevious={handlePrevious}>
      <div className="form-group">
        <label htmlFor="videoLink">Video Link (Optional)</label>
        <input
          type="url"
          id="videoLink"
          placeholder="Video Link"
          value={formData.videoLink}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Photo gallery</label>
        <p className="gallery-description">
          Your photos will appear on your listing in the order you choose. Drag and drop uploaded images to re-order
          them.
        </p>

        <div className="file-upload-container">
          <div
            className="file-upload-area"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="gallery-upload"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className="file-upload-placeholder">
              <Camera size={48} className="upload-icon" />
              <p>Maximum 20 images & 10MB file size - PNG, JPG, JPEG, HEIC (landscape)</p>
              <button type="button" className="upload-button">
                Select Files
              </button>
              <p className="drag-text">or drag and drop files here</p>
            </div>
          </div>

          {formData.gallery.length > 0 && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={formData.gallery.map((file, i) => file.name + i)}>
                <div className="image-preview-grid">
                  {formData.gallery.map((file, index) => (
                    <SortableImage
                      key={file.name + index}
                      file={file}
                      index={index}
                      onRemove={() => handleRemoveImage(index)}
                    />
                  ))}
                  {formData.gallery.length < 20 && (
                    <div className="add-more-photos" onClick={() => fileInputRef.current?.click()}>
                      <Plus size={24} />
                      <span>Add more</span>
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </StepLayout>
  )
}
