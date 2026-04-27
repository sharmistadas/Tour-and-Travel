import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Enquiry.css";

const INITIAL_ENQUIRIES = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    subject: "Travel Inquiry",
    contactNumber: "+1 234 567 890",
    message:
      "I would like to know more about your travel packages for Europe. Can you provide details about the 2-week tour?",
    date: "2026-02-13",
    time: "10:30 AM",
    status: "pending",
    replied: false,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    subject: "Booking Information",
    contactNumber: "+1 345 678 901",
    message:
      "Hi, I need assistance with booking a flight to Tokyo. What are the available dates in March?",
    date: "2026-02-12",
    time: "3:15 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "mchen@email.com",
    subject: "Hotel Reservation",
    contactNumber: "+1 456 789 012",
    message:
      "Looking for hotel recommendations in Paris for a 5-day stay. Budget-friendly options preferred.",
    date: "2026-02-12",
    time: "11:20 AM",
    status: "resolved",
    replied: true,
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    subject: "Tour Package Details",
    contactNumber: "+1 567 890 123",
    message:
      "Can you send me the complete itinerary for the Southeast Asia tour package? Also, what is included in the price?",
    date: "2026-02-11",
    time: "2:45 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 5,
    name: "Hakim Smith",
    email: "hakim.smith@email.com",
    subject: "Travel Inquiry",
    contactNumber: "+1 239 567 890",
    message:
      "I would like to know more about your travel packages for Europe. Can you provide details about the 2-week tour?",
    date: "2026-02-13",
    time: "10:30 AM",
    status: "pending",
    replied: false,
  },
  {
    id: 6,
    name: "Olivia Brown",
    email: "olivia.b@email.com",
    subject: "Visa Assistance",
    contactNumber: "+1 678 123 456",
    message:
      "Do you provide visa processing assistance for Canada tourist visas?",
    date: "2026-02-10",
    time: "9:10 AM",
    status: "resolved",
    replied: true,
  },
  {
    id: 7,
    name: "Daniel Martinez",
    email: "daniel.m@email.com",
    subject: "Flight Cancellation",
    contactNumber: "+1 789 234 567",
    message:
      "I need help cancelling my flight ticket and understanding the refund policy.",
    date: "2026-02-09",
    time: "4:50 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 8,
    name: "Sophia Lee",
    email: "sophia.lee@email.com",
    subject: "Cruise Package",
    contactNumber: "+1 890 345 678",
    message: "Please share details about your Mediterranean cruise packages.",
    date: "2026-02-08",
    time: "1:30 PM",
    status: "resolved",
    replied: true,
  },
  {
    id: 9,
    name: "James Anderson",
    email: "j.anderson@email.com",
    subject: "Group Discount",
    contactNumber: "+1 901 456 789",
    message:
      "We are a group of 10 people planning a Bali trip. Do you offer group discounts?",
    date: "2026-02-07",
    time: "12:40 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 10,
    name: "Isabella Thomas",
    email: "isabella.t@email.com",
    subject: "Travel Insurance",
    contactNumber: "+1 123 654 789",
    message:
      "What travel insurance plans do you recommend for international trips?",
    date: "2026-02-06",
    time: "5:25 PM",
    status: "resolved",
    replied: true,
  },
  {
    id: 11,
    name: "Liam Harris",
    email: "liam.h@email.com",
    subject: "Refund Status",
    contactNumber: "+1 234 765 890",
    message:
      "I would like to know the status of my refund request submitted last week.",
    date: "2026-02-05",
    time: "10:15 AM",
    status: "pending",
    replied: false,
  },
  {
    id: 12,
    name: "Mia Clark",
    email: "mia.clark@email.com",
    subject: "Holiday Package",
    contactNumber: "+1 345 876 901",
    message: "Can you suggest a honeymoon package for Maldives?",
    date: "2026-02-04",
    time: "3:05 PM",
    status: "resolved",
    replied: true,
  },
  {
    id: 13,
    name: "Noah Lewis",
    email: "noah.lewis@email.com",
    subject: "Hotel Upgrade",
    contactNumber: "+1 456 987 012",
    message: "Is it possible to upgrade my hotel room to a deluxe category?",
    date: "2026-02-03",
    time: "2:00 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 14,
    name: "Ava Walker",
    email: "ava.walker@email.com",
    subject: "Travel Dates Change",
    contactNumber: "+1 567 098 123",
    message:
      "I need to change my travel dates from April to May. Please advise.",
    date: "2026-02-02",
    time: "11:45 AM",
    status: "resolved",
    replied: true,
  },
  {
    id: 15,
    name: "William Hall",
    email: "william.h@email.com",
    subject: "Passport Requirement",
    contactNumber: "+1 678 109 234",
    message:
      "What are the passport validity requirements for traveling to Thailand?",
    date: "2026-02-01",
    time: "9:35 AM",
    status: "pending",
    replied: false,
  },
  {
    id: 16,
    name: "Charlotte Allen",
    email: "charlotte.a@email.com",
    subject: "Adventure Tour",
    contactNumber: "+1 789 210 345",
    message: "Do you offer adventure tour packages for New Zealand?",
    date: "2026-01-31",
    time: "4:15 PM",
    status: "resolved",
    replied: true,
  },
  {
    id: 17,
    name: "Benjamin Young",
    email: "ben.young@email.com",
    subject: "Payment Issue",
    contactNumber: "+1 890 321 456",
    message: "My payment failed during checkout. Can you help resolve this?",
    date: "2026-01-30",
    time: "1:20 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 18,
    name: "Amelia King",
    email: "amelia.king@email.com",
    subject: "Family Package",
    contactNumber: "+1 901 432 567",
    message: "Looking for a family-friendly holiday package for Singapore.",
    date: "2026-01-29",
    time: "12:10 PM",
    status: "resolved",
    replied: true,
  },
  {
    id: 19,
    name: "Elijah Scott",
    email: "elijah.scott@email.com",
    subject: "Airport Pickup",
    contactNumber: "+1 123 543 678",
    message: "Is airport pickup included in your Dubai tour package?",
    date: "2026-01-28",
    time: "3:50 PM",
    status: "pending",
    replied: false,
  },
  {
    id: 20,
    name: "Harper Green",
    email: "harper.green@email.com",
    subject: "Custom Tour Plan",
    contactNumber: "+1 234 654 789",
    message: "Can you create a customized Europe itinerary for 10 days?",
    date: "2026-01-27",
    time: "10:05 AM",
    status: "resolved",
    replied: true,
  },
];

const EnquiryAdminPage = () => {
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isEditing, setIsEditing] = useState(false);
  const [editedEnquiry, setEditedEnquiry] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [filterStatus, searchQuery]);

  // ✅ FIXED handleRefresh — clears all data and resets to original state, no page reload
  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Clear all data immediately so UI shows reset state
    setEnquiries([]);
    setSearchQuery("");
    setFilterStatus("all");
    setCurrentPage(1);
    setSelectedIds(new Set());
    setShowReplyModal(false);
    setSelectedEnquiry(null);
    setReplyMessage("");
    setIsEditing(false);
    setEditedEnquiry(null);

    // Brief loading delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Re-populate with original data (replace with API call if data comes from backend)
    setEnquiries(INITIAL_ENQUIRIES);

    setIsRefreshing(false);
  };

  const handleReplyClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsEditing(false);
    setEditedEnquiry({ ...enquiry });
    setReplyMessage("");
    setShowReplyModal(true);
  };

  const handleSendReply = () => {
    if (replyMessage.trim() === "") {
      alert("Please write a reply message");
      return;
    }
    const updatedEnquiries = enquiries.map((enq) =>
      enq.id === selectedEnquiry.id
        ? { ...enq, replied: true, status: "resolved" }
        : enq,
    );
    setEnquiries(updatedEnquiries);
    alert(`Email sent successfully to ${selectedEnquiry.email}`);
    setShowReplyModal(false);
    setSelectedEnquiry(null);
    setReplyMessage("");
  };

  const handleStatusChange = (id, newStatus) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq)),
    );
  };

  const handleSaveEdit = () => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === editedEnquiry.id ? editedEnquiry : enq)),
    );
    setIsEditing(false);
    setSelectedEnquiry(editedEnquiry);
  };

  const handleSingleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
      setSelectedIds((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.size} enquiry(s)?`,
      )
    ) {
      setEnquiries((prev) => prev.filter((enq) => !selectedIds.has(enq.id)));
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === currentItems.length) {
      setSelectedIds((prev) => {
        const s = new Set(prev);
        currentItems.forEach((item) => s.delete(item.id));
        return s;
      });
    } else {
      setSelectedIds((prev) => {
        const s = new Set(prev);
        currentItems.forEach((item) => s.add(item.id));
        return s;
      });
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = filterStatus === "all" || enq.status === filterStatus;
    const matchesSearch =
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.contactNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const pendingCount = enquiries.filter((e) => e.status === "pending").length;
  const resolvedCount = enquiries.filter((e) => e.status === "resolved").length;

  const truncate = (str, n = 60) =>
    str.length > n ? str.slice(0, n) + "…" : str;

  return (
    <div
      className="admin-container-main-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
        background: "#F8F9FA",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* ✅ Fixed Refresh Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          type="button"
          className={`admin-refresh-btn ${isRefreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh page"
          style={{
            position: "relative",
            top: "auto",
            right: "auto",
            zIndex: 1,
          }}
        >
          <span className={`rfr-icon ${isRefreshing ? "spin" : ""}`}>
            &#x21BB;
          </span>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div
        className="admin-container"
        style={{ flex: 1, minHeight: 0, padding: 0, overflowY: "auto" }}
      >
        {/* Header */}
        <header className="admin-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="admin-title">Enquiry Dashboard</h1>
              <p className="admin-subtitle">
                Manage and respond to customer enquiries
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-card stat-pending">
                <div className="stat-number">{pendingCount}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card stat-resolved">
                <div className="stat-number">{resolvedCount}</div>
                <div className="stat-label">Resolved</div>
              </div>
              <div className="stat-card stat-total">
                <div className="stat-number">{enquiries.length}</div>
                <div className="stat-label">Total</div>
              </div>
            </div>
          </div>
        </header>

        {/* Search & Filter Controls */}
        <div className="controls-section">
          <div className="search-input-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, email, subject or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filterStatus === "resolved" ? "active" : ""}`}
              onClick={() => setFilterStatus("resolved")}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Bulk Delete Bar */}
        {selectedIds.size > 0 && (
          <div className="bulk-delete-bar">
            <span className="selected-count">
              {selectedIds.size} enquiry(s) selected
            </span>
            <button className="btn-bulk-delete" onClick={handleBulkDelete}>
              <i className="bi bi-trash"></i> Delete Selected
            </button>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="enquiries-table">
            <thead>
              <tr>
                <th style={{ width: "30px" }}>
                  <input
                    type="checkbox"
                    className="select-checkbox"
                    checked={
                      selectedIds.size === currentItems.length &&
                      currentItems.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Customer</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isRefreshing ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "#94a3b8",
                    }}
                  >
                    Refreshing enquiries...
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((enquiry) => (
                  <tr key={enquiry.id} className={`status-${enquiry.status}`}>
                    <td data-label="Select" style={{ width: "20px" }}>
                      <input
                        type="checkbox"
                        className="select-checkbox"
                        checked={selectedIds.has(enquiry.id)}
                        onChange={() => toggleSelect(enquiry.id)}
                      />
                    </td>
                    <td data-label="Customer">
                      <div className="customer-info">
                        <div className="user-avatar">
                          {enquiry.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="customer-details">
                          <div className="customer-name">{enquiry.name}</div>
                          <div className="customer-email">{enquiry.email}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Contact">{enquiry.contactNumber}</td>
                    <td data-label="Subject">{enquiry.subject}</td>
                    <td data-label="Message" title={enquiry.message}>
                      {truncate(enquiry.message)}
                    </td>
                    <td data-label="Date & Time">
                      <div>{enquiry.date}</div>
                      <div className="time">{enquiry.time}</div>
                    </td>
                    <td
                      data-label="Status"
                      className="d-flex align-items-center"
                    >
                      <span className={`status-badge ${enquiry.status}`}>
                        {enquiry.status === "pending"
                          ? "⏳ Pending"
                          : "✓ Resolved"}
                      </span>
                      {enquiry.replied && (
                        <span className="replied-indicator-small">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                      )}
                    </td>
                    <td data-label="Actions">
                      <div className="action-cell">
                        <button
                          className="btn-delete-small"
                          onClick={() => handleSingleDelete(enquiry.id)}
                          title="Delete enquiry"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button
                          className="btn-reply-small"
                          onClick={() => handleReplyClick(enquiry)}
                          title="Reply via Email"
                        >
                          <i className="bi bi-envelope"></i>
                        </button>
                        <select
                          className="status-select-small"
                          value={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(enquiry.id, e.target.value)
                          }
                          title="Change status"
                        >
                          <option value="pending">Pending</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "#94a3b8",
                    }}
                  >
                    No enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredEnquiries.length > 0 && (
          <div className="pagination-wrapper">
            <div className="results-summary">
              Showing {indexOfFirstItem + 1}–
              {Math.min(indexOfLastItem, filteredEnquiries.length)} of{" "}
              {filteredEnquiries.length} enquiries
            </div>
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i> Previous
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="pagination-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}

        {filteredEnquiries.length === 0 && !isRefreshing && (
          <div className="no-results">
            <i className="bi bi-inbox"></i>
            <p>No enquiries found</p>
          </div>
        )}

        {/* Reply / Edit Modal */}
        {showReplyModal && selectedEnquiry && (
          <div
            className="modal-overlay"
            onClick={() => setShowReplyModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{isEditing ? "Edit Enquiry" : "Reply to Enquiry"}</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowReplyModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {!isEditing ? (
                  <>
                    <div className="recipient-info">
                      <div className="recipient-row">
                        <strong>To:</strong>
                        <span>{selectedEnquiry.email}</span>
                      </div>
                      <div className="recipient-row">
                        <strong>Name:</strong>
                        <span>{selectedEnquiry.name}</span>
                      </div>
                      <div className="recipient-row">
                        <strong>Subject:</strong>
                        <span>Re: {selectedEnquiry.subject}</span>
                      </div>
                      <div className="recipient-row">
                        <strong>Contact:</strong>
                        <span>{selectedEnquiry.contactNumber}</span>
                      </div>
                    </div>
                    <div className="original-message">
                      <h4>Original Message:</h4>
                      <p>{selectedEnquiry.message}</p>
                    </div>
                  </>
                ) : (
                  <div className="edit-enquiry-form">
                    <h4>Edit Enquiry Details</h4>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editedEnquiry.name}
                        onChange={(e) =>
                          setEditedEnquiry({
                            ...editedEnquiry,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={editedEnquiry.email}
                        onChange={(e) =>
                          setEditedEnquiry({
                            ...editedEnquiry,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editedEnquiry.contactNumber}
                        onChange={(e) =>
                          setEditedEnquiry({
                            ...editedEnquiry,
                            contactNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editedEnquiry.subject}
                        onChange={(e) =>
                          setEditedEnquiry({
                            ...editedEnquiry,
                            subject: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={editedEnquiry.message}
                        onChange={(e) =>
                          setEditedEnquiry({
                            ...editedEnquiry,
                            message: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {!isEditing && (
                  <div className="reply-section">
                    <label htmlFor="replyMessage">Your Reply:</label>
                    <textarea
                      id="replyMessage"
                      className="reply-textarea"
                      placeholder="Type your reply here..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows="6"
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {!isEditing ? (
                  <>
                    <button
                      className="btn-cancel"
                      onClick={() => setShowReplyModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button className="btn-send" onClick={handleSendReply}>
                      <i className="bi bi-send"></i> Send Email
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-cancel"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedEnquiry({ ...selectedEnquiry });
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn-save" onClick={handleSaveEdit}>
                      <i className="bi bi-check-circle"></i> Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryAdminPage;
