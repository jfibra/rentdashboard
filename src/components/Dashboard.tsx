"use client"

import { useNavigate } from "react-router-dom"
import { DashboardCard } from "./DashboardCard"
import { ExternalSvgIcon } from "./icons/ExternalSvgIcon"
import "./Dashboard.css"
import { LogoutIcon } from "./icons/DashboardIcons"

export const Dashboard = () => {
  const navigate = useNavigate()

  const handleCardClick = (path: string) => {
    navigate(path)
  }

  // Profile section cards
  const profileCards = [
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/track-property-7129fdcb02993d5c8f29.svg"
          alt="Track your property"
        />
      ),
      title: "Track your property",
      description: "Stay up to date with your home or properties you own.",
      path: "/track-property",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/my-saved-properties-17cb33442c8a823d8ed4.svg"
          alt="My saved properties"
        />
      ),
      title: "My saved properties",
      description: "View open times and auctions for properties you've saved.",
      path: "/saved-properties",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/saved-searches-bcd8bbbb459aac291031.svg"
          alt="Saved searches & alerts"
        />
      ),
      title: "Saved searches & alerts",
      description: "View your saved searches and configure their alerts.",
      path: "/saved-searches",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/renter-profile-a57cf99925fc818f5634.svg"
          alt="Renter Profile"
        />
      ),
      title: "Renter Profile",
      description: "Create or update your Renter Profile.",
      path: "/renter-profile",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/rental-applications-662c29ce786270508556.svg"
          alt="Rental applications"
        />
      ),
      title: "Rental applications",
      description: "Track the status and view your rental applications.",
      path: "/rental-applications",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/my-profile-a838b483e65c127e54bd.svg"
          alt="My finances"
        />
      ),
      title: "My finances",
      description: "Financial tools to help you make better property decisions.",
      path: "/finances",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/account-settings-6c69225a00019dcfa35a.svg"
          alt="Settings"
        />
      ),
      title: "Settings",
      description: "Manage your login details, notifications and privacy settings.",
      path: "/settings",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/my-profile-a838b483e65c127e54bd.svg"
          alt="My profile"
        />
      ),
      title: "My profile",
      description: "Manage your personal details and property needs.",
      path: "/profile",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/private-landlord-31fca422a6f744faca86.svg"
          alt="My rental listings"
        />
      ),
      title: "My rental listings",
      description: "Create and manage your rental property listings.",
      path: "/my-listings",
    },
  ]

  // Real Estate Agent Tools cards
  const agentToolsCards = [
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/my-saved-properties-17cb33442c8a823d8ed4.svg"
          alt="Create Listing"
        />
      ),
      title: "Create Listing",
      description: "Create a new real estate listing with our form.",
      path: "/create-listing",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/private-landlord-31fca422a6f744faca86.svg"
          alt="Property Management"
        />
      ),
      title: "Property Management",
      description: "Manage your existing properties.",
      path: "/property-management",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/renter-profile-a57cf99925fc818f5634.svg"
          alt="Client Database"
        />
      ),
      title: "Client Database",
      description: "Manage your client relationships.",
      path: "/client-database",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/account-settings-6c69225a00019dcfa35a.svg"
          alt="Scheduled Viewings"
        />
      ),
      title: "Scheduled Viewings",
      description: "Manage property inspections.",
      path: "/scheduled-viewings",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/rental-applications-662c29ce786270508556.svg"
          alt="Client Messages"
        />
      ),
      title: "Client Messages",
      description: "View and respond to inquiries.",
      path: "/client-messages",
    },
    {
      icon: (
        <ExternalSvgIcon
          url="https://argonaut.au.reastatic.net/resi-myrea/prod/me-web/track-property-7129fdcb02993d5c8f29.svg"
          alt="Build a Landing Page"
        />
      ),
      title: "Build a Landing Page",
      description: "Create custom property landing pages.",
      path: "/landing-page-builder",
    },
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Profile</h1>
        <button className="logout-button">
          <LogoutIcon /> Log out
        </button>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-grid">
          {profileCards.map((card, index) => (
            <DashboardCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              onClick={() => handleCardClick(card.path)}
            />
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2 className="section-title">Real Estate Agent Tools</h2>
        <div className="dashboard-grid">
          {agentToolsCards.map((card, index) => (
            <DashboardCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              onClick={() => handleCardClick(card.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
