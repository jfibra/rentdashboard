import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"
import { ProfilePage } from "./components/ProfilePage"
import { Inbox } from "./components/Inbox"
import { CreateListing } from "./components/CreateListing"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/track-property" element={<UnderConstructionPage title="Track your property" />} />
            <Route path="/saved-properties" element={<UnderConstructionPage title="My saved properties" />} />
            <Route path="/saved-searches" element={<UnderConstructionPage title="Saved searches & alerts" />} />
            <Route path="/renter-profile" element={<UnderConstructionPage title="Renter Profile" />} />
            <Route path="/rental-applications" element={<UnderConstructionPage title="Rental applications" />} />
            <Route path="/finances" element={<UnderConstructionPage title="My finances" />} />
            <Route path="/settings" element={<UnderConstructionPage title="Settings" />} />
            <Route path="/my-listings" element={<UnderConstructionPage title="My rental listings" />} />
            <Route path="/property-management" element={<UnderConstructionPage title="Property Management" />} />
            <Route path="/client-database" element={<UnderConstructionPage title="Client Database" />} />
            <Route path="/scheduled-viewings" element={<UnderConstructionPage title="Scheduled Viewings" />} />
            <Route path="/client-messages" element={<UnderConstructionPage title="Client Messages" />} />
            <Route path="/landing-page-builder" element={<UnderConstructionPage title="Build a Landing Page" />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/create-listing/*" element={<CreateListing />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

// Simple component for pages under construction
function UnderConstructionPage({ title }: { title: string }) {
  return (
    <div className="page-container">
      <h1>{title}</h1>
      <p>This page is under construction.</p>
    </div>
  )
}

export default App
