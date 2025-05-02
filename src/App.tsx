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
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/create-listing/*" element={<CreateListing />} />
            <Route
              path="/my-listings"
              element={
                <div className="page-container">
                  <h1>My Listings</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/business-card"
              element={
                <div className="page-container">
                  <h1>Digital Business Card</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/rental-tracker"
              element={
                <div className="page-container">
                  <h1>Rental Tracker</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <div className="page-container">
                  <h1>Edit Profile</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/change-password"
              element={
                <div className="page-container">
                  <h1>Change Password</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/track-property"
              element={
                <div className="page-container">
                  <h1>Track your property</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />

            {/* Real Estate Agent Tools Routes */}
            <Route
              path="/property-management"
              element={
                <div className="page-container">
                  <h1>Property Management</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/client-database"
              element={
                <div className="page-container">
                  <h1>Client Database</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/scheduled-viewings"
              element={
                <div className="page-container">
                  <h1>Scheduled Viewings</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/client-messages"
              element={
                <div className="page-container">
                  <h1>Client Messages</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
            <Route
              path="/landing-page-builder"
              element={
                <div className="page-container">
                  <h1>Build a Landing Page</h1>
                  <p>This page is under construction.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
