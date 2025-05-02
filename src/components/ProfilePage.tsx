"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Phone, Mail, ArrowLeft } from "lucide-react"
import "./ProfilePage.css"

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("listings")
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-lg-12">
                <div className="profile-card">
                  <div className="profile-thumb">
                    <img className="profile-img" src="https://rent.ph/uploads/0000/736/2022/11/23/family-guy-peter-griffin-started-an-instagram-account-and-its-exactly-what-youd-expect-from-him.jpg" alt="Profile" />
                  </div>
                  <div className="profile-details">
                    <div className="profile-content">
                      <h3>John Doe</h3>
                      <p className="profile-role">Rent Manager</p>
                      <ul className="profile-contact">
                        <li>
                          <a href="tel:+1234567890">
                            <Phone size={16} /> +1 (234) 567-890
                          </a>
                        </li>
                        <li>
                          <a href="mailto:johndoe@example.com">
                            <Mail size={16} /> johndoe@example.com
                          </a>
                        </li>
                      </ul>
                      <div className="qr-code">
                        <img src="/qr-code.png" alt="QR Code" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-tabs">
                  <ul className="tabs-nav">
                    <li className={activeTab === "listings" ? "active" : ""} onClick={() => setActiveTab("listings")}>
                      <a>Listings (0)</a>
                    </li>
                    <li className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>
                      <a>About Me</a>
                    </li>
                    <li className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
                      <a>Reviews</a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    {activeTab === "listings" && (
                      <div className="tab-pane">
                        <p>You don't have any listings yet.</p>
                      </div>
                    )}

                    {activeTab === "about" && (
                      <div className="tab-pane">
                        <div className="about-content">
                          <p>No information provided yet.</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "reviews" && (
                      <div className="tab-pane">
                        <div className="reviews-content">
                          <ul className="review-summary">
                            <li>0 Reviews</li>
                            <li>
                              <div className="star-rating">
                                <span className="empty-star">★</span>
                                <span className="empty-star">★</span>
                                <span className="empty-star">★</span>
                                <span className="empty-star">★</span>
                                <span className="empty-star">★</span>
                              </div>
                            </li>
                            <li>(0 out of 5)</li>
                          </ul>

                          <div className="review-form">
                            <h4>Write a review</h4>
                            <form>
                              <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                  type="text"
                                  id="first_name"
                                  className="form-input"
                                  placeholder="Enter your first name"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                  type="text"
                                  id="last_name"
                                  className="form-input"
                                  placeholder="Enter your last name"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  className="form-input"
                                  placeholder="Enter your email"
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label>Your Rating</label>
                                <div className="rating-select">
                                  <span className="star">★</span>
                                  <span className="star">★</span>
                                  <span className="star">★</span>
                                  <span className="star">★</span>
                                  <span className="star">★</span>
                                </div>
                              </div>

                              <div className="form-group">
                                <label htmlFor="review_content">Your Review</label>
                                <textarea
                                  id="review_content"
                                  className="form-textarea"
                                  rows={6}
                                  placeholder="Your Review"
                                  required
                                ></textarea>
                              </div>

                              <button type="submit" className="btn-submit">
                                Submit Review
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="sidebar">
              <div className="contact-widget">
                <h4>Contact John Doe</h4>
                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="First Name" />
                  </div>

                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="Last Name" />
                  </div>

                  <div className="form-group phone-group">
                    <select className="country-select">
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+63">🇵🇭 +63</option>
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input type="tel" className="form-input" placeholder="Phone" />
                  </div>

                  <div className="form-group">
                    <input type="email" className="form-input" placeholder="Email" />
                  </div>

                  <div className="form-group">
                    <textarea className="form-textarea" rows={5} placeholder="Your Message"></textarea>
                  </div>

                  <button type="submit" className="btn-contact">
                    Contact
                  </button>
                </form>
              </div>

              <div className="categories-widget">
                <h4>Categories</h4>
                <ul className="categories-list">
                  <li>
                    <a href="#">
                      <i className="category-icon">›</i>
                      Condominium
                      <span>2000 properties</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="category-icon">›</i>
                      Studio
                      <span>136 properties</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="category-icon">›</i>1 Bedroom
                      <span>92 properties</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="category-icon">›</i>2 Bedroom
                      <span>88 properties</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="category-icon">›</i>
                      House and Lot
                      <span>1016 properties</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="category-icon">›</i>
                      Apartment
                      <span>217 properties</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="recent-widget">
                <h4>Recently Viewed</h4>
                <div className="recent-item">
                  <img src="/diverse-property-showcase.png" alt="Property" />
                  <div className="recent-details">
                    <h5>Bohol Vantage</h5>
                    <a href="#">₱50,000.00</a>
                    <ul>
                      <li>Beds: 2</li>
                      <li>Baths: 2</li>
                      <li>Sq Ft: 172 sqft</li>
                    </ul>
                  </div>
                </div>

                <div className="recent-item">
                  <img src="/modern-city-apartment.png" alt="Property" />
                  <div className="recent-details">
                    <h5>Sundance Banawa for Rent</h5>
                    <a href="#">₱25,000.00</a>
                    <ul>
                      <li>Beds: 1</li>
                      <li>Baths: 1</li>
                      <li>Sq Ft: 34 sqft</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
