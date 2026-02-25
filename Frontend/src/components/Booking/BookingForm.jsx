import { useState } from "react";
import "./BookingForm.css";

export default function BookingForm({ destination, onBookingComplete }) {
    const [bookingData, setBookingData] = useState({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        travelers: 1,
        specialRequests: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log("Booking submitted:", bookingData);
        onBookingComplete(bookingData);
    };

    const basePrice = parseInt(destination.content?.price?.replace('$', '') || "1299");
    const taxesFees = 129;
    const totalAmount = basePrice + taxesFees;
    const totalWithTravelers = totalAmount * bookingData.travelers;

    return (
        <div className="booking-form-container">
            <div className="booking-form-card">
                {/* Price Header */}
                <div className="booking-price-header">
                    <div className="price-from">From</div>
                    <div className="price-main">
                        <span className="currency">$</span>
                        <span className="amount">{basePrice}</span>
                    </div>
                    <div className="price-per">per person</div>
                    <div className="price-subtext">All taxes and fees included</div>
                </div>

                {/* Booking Form */}
                <form className="booking-form" onSubmit={handleBookingSubmit}>
                    {/* Date Selection */}
                    <div className="form-field">
                        <label className="field-label">
                            <span className="label-icon">📅</span>
                            Travel Date
                        </label>
                        <input
                            type="date"
                            name="travelDate"
                            className="field-input"
                            value={bookingData.travelDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Travelers Selection */}
                    <div className="form-field">
                        <label className="field-label">
                            <span className="label-icon">👥</span>
                            Number of Travelers
                        </label>
                        <select
                            name="travelers"
                            className="field-input field-select"
                            value={bookingData.travelers}
                            onChange={handleInputChange}
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? 'Traveler' : 'Travelers'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price Summary */}
                    <div className="price-summary">
                        <div className="summary-title">Price Summary</div>
                        <div className="summary-line">
                            <span>Base Price × {bookingData.travelers}</span>
                            <span>${basePrice * bookingData.travelers}</span>
                        </div>
                        <div className="summary-line">
                            <span>Taxes & Service Fees</span>
                            <span>${taxesFees * bookingData.travelers}</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-total">
                            <span>Total Amount</span>
                            <span>${totalWithTravelers}</span>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <button
                        type="button"
                        className="btn-book-now"
                        onClick={() => document.getElementById('bookingModal').showModal()}
                    >
                        <span className="btn-icon">🔒</span>
                        Reserve Your Spot
                    </button>

                    {/* Trust Signals */}
                    <div className="trust-signals">
                        <div className="trust-item">
                            <span className="trust-icon">✓</span>
                            <span>Instant Confirmation</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">✓</span>
                            <span>Free Cancellation</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">✓</span>
                            <span>24/7 Support</span>
                        </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="cancellation-notice">
                        <div className="notice-icon">🛡️</div>
                        <div className="notice-text">
                            Free cancellation up to 30 days before departure
                        </div>
                    </div>
                </form>
            </div>

            {/* Booking Modal */}
            <dialog id="bookingModal" className="classic-modal">
                <div className="modal-wrapper">
                    <div className="modal-header-classic">
                        <h2 className="modal-title-classic">Complete Your Reservation</h2>
                        <button
                            className="modal-close-classic"
                            onClick={() => document.getElementById('bookingModal').close()}
                            type="button"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleBookingSubmit}>
                        <div className="modal-body-classic">
                            <div className="form-section">
                                <h3 className="section-heading">Personal Information</h3>

                                <div className="form-grid">
                                    <div className="form-field">
                                        <label className="field-label-classic">
                                            Full Name <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="field-input-classic"
                                            value={bookingData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label-classic">
                                            Email Address <span className="required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="field-input-classic"
                                            value={bookingData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label className="field-label-classic">
                                            Phone Number <span className="required">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="field-input-classic"
                                            value={bookingData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+1 (234) 567-8900"
                                        />
                                    </div>

                                    <div className="form-field form-field-full">
                                        <label className="field-label-classic">
                                            Special Requests
                                        </label>
                                        <textarea
                                            name="specialRequests"
                                            className="field-textarea-classic"
                                            value={bookingData.specialRequests}
                                            onChange={handleInputChange}
                                            placeholder="Any dietary requirements, accessibility needs, or special requests..."
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-summary-section">
                                <h3 className="section-heading">Booking Summary</h3>
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span className="summary-label">Destination:</span>
                                        <span className="summary-value">{destination.title}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label">Travel Date:</span>
                                        <span className="summary-value">
                                            {bookingData.travelDate || 'Not selected'}
                                        </span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label">Travelers:</span>
                                        <span className="summary-value">{bookingData.travelers}</span>
                                    </div>
                                    <div className="summary-divider-modal"></div>
                                    <div className="summary-row summary-row-total">
                                        <span className="summary-label">Total Amount:</span>
                                        <span className="summary-value-total">${totalWithTravelers}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer-classic">
                            <button
                                type="button"
                                className="btn-secondary-classic"
                                onClick={() => document.getElementById('bookingModal').close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-primary-classic">
                                Confirm & Pay Deposit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}