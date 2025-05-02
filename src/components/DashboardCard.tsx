"use client"

import type { ReactNode } from "react"
import "./Dashboard.css"

interface DashboardCardProps {
  icon: ReactNode
  title: string
  description: string
  onClick: () => void
}

export const DashboardCard = ({ icon, title, description, onClick }: DashboardCardProps) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  )
}
