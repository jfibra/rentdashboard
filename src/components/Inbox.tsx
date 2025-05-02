"use client"

import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export const Inbox = () => {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft size={20} /> Back to Dashboard
      </button>
      <h1>Inbox</h1>
      <p>This page is under construction.</p>
    </div>
  )
}
