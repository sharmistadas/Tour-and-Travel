import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/Booking.css";
import axios from "axios";

import {
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiSearch,
  FiPlus,
  FiMoreHorizontal,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler,
);

const API_BASE = "http://localhost:5000/api/bookings";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

/* ✅ SPARK OPTIONS */
const sparkOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 0 }, line: { tension: 0.45, borderWidth: 3 } },
};

/* ✅ OVERVIEW OPTIONS */
const overviewOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: { top: 10 },
  },
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: { usePointStyle: true, padding: 40, boxWidth: 8, font: { size: 12 } },
    },
    tooltip: { backgroundColor: "#111827", padding: 12, displayColors: false },
  },
  interaction: { intersect: false, mode: "index" },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#9ca3af", font: { size: 12 } },
    },
    y: {
      grid: { color: "rgba(0,0,0,0.06)" },
      ticks: { color: "#9ca3af", font: { size: 12 } },
    },
  },
};

/* ✅ MONTH LABELS */
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AdminBooking = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [dateFilter, setDateFilter] = useState("Today");
  const [chartFilter, setChartFilter] = useState("Last 12 Months");

  // State for mocked dropdowns
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showChartDropdown, setShowChartDropdown] = useState(false);

  const rowsPerPage = 8;

  // API State
  const [bookings, setBookings] = useState([]);
  const [totalBookingsCount, setTotalBookingsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalParticipants: 0,
    totalEarnings: 0,
    topPackages: [],
    tripsOverview: [],
  });

  const searchTimerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    travelerName: "",
    packageId: "",
    startDate: "",
    endDate: "",
    participants: 1,
    pricePerDay: "",
    userId: "",
  });

  // ─── Debounce search ───
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(searchTimerRef.current);
  }, [search]);

  // ─── Fetch bookings (server-side pagination + search) ───
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/", {
        params: {
          page,
          limit: rowsPerPage,
          search: debouncedSearch,
        },
      });
      if (res.data.success) {
        setBookings(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalBookingsCount(res.data.totalBookings || 0);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  // ─── Fetch stats ───
  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get("/stats");
      if (res.data.success) {
        setStats({
          totalBookings: res.data.totalBookings || 0,
          totalParticipants: res.data.totalParticipants || 0,
          totalEarnings: res.data.totalEarnings || 0,
          topPackages: res.data.topPackages || [],
          tripsOverview: res.data.tripsOverview || [],
        });
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ─── Handle form input ───
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ─── Create booking via API ───
  const handleAddBooking = async () => {
    if (!formData.travelerName || !formData.packageId) {
      alert("Please fill in at least Traveler Name and Package ID");
      return;
    }
    try {
      const res = await api.post("/", {
        travelerName: formData.travelerName,
        packageId: formData.packageId,
        userId: formData.userId || undefined,
        startDate: formData.startDate,
        endDate: formData.endDate,
        participants: Number(formData.participants) || 1,
        pricePerDay: Number(formData.pricePerDay) || 0,
      });
      if (res.data.success) {
        setFormData({
          travelerName: "",
          packageId: "",
          startDate: "",
          endDate: "",
          participants: 1,
          pricePerDay: "",
          userId: "",
        });
        setShowForm(false);
        fetchBookings();
        fetchStats();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  // ─── Update booking status ───
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/status/${id}`, { status: newStatus });
      if (res.data.success) {
        fetchBookings();
        fetchStats();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // ─── Delete booking ───
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await api.delete(`/${id}`);
      if (res.data.success) {
        fetchBookings();
        fetchStats();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete booking");
    }
  };

  // ─── Format helpers ───
  const formatCurrency = (num) => {
    if (!num && num !== 0) return "$0";
    return "$" + Number(num).toLocaleString("en-US");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    return Number(num).toLocaleString("en-US");
  };

  // ─── Build chart data from stats ───
  const buildTripsOverviewChart = () => {
    const doneByMonth = {};
    const cancelledByMonth = {};

    (stats.tripsOverview || []).forEach((item) => {
      const month = item._id?.month;
      const status = item._id?.status;
      if (!month) return;
      if (status === "confirmed" || status === "completed") {
        doneByMonth[month] = (doneByMonth[month] || 0) + item.count;
      } else if (status === "cancelled") {
        cancelledByMonth[month] = (cancelledByMonth[month] || 0) + item.count;
      }
    });

    const labels = MONTH_NAMES;
    const doneData = labels.map((_, i) => doneByMonth[i + 1] || 0);
    const cancelledData = labels.map((_, i) => cancelledByMonth[i + 1] || 0);

    return {
      labels,
      datasets: [
        {
          label: "Done",
          data: doneData,
          borderColor: "#3b82f6",
          borderWidth: 3,
          fill: true,
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, "rgba(59,130,246,0.25)");
            gradient.addColorStop(1, "rgba(59,130,246,0.02)");
            return gradient;
          },
          tension: 0.5,
          pointRadius: 0,
        },
        {
          label: "Cancelled",
          data: cancelledData,
          borderColor: "#9ca3af",
          borderWidth: 2,
          borderDash: [6, 6],
          tension: 0.5,
          pointRadius: 0,
        },
      ],
    };
  };

  const buildBarChart = () => {
    const pkgs = stats.topPackages || [];
    return {
      labels: pkgs.map((p) => p._id || "Unknown"),
      datasets: [
        {
          label: "Participants",
          data: pkgs.map((p) => p.totalParticipants || 0),
          backgroundColor: ["#2563eb", "#60a5fa", "#93c5fd", "#bfdbfe"],
          borderRadius: 4,
        },
      ],
    };
  };

  const lineChart = buildTripsOverviewChart();
  const barChart = buildBarChart();

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.04)" },
        ticks: { font: { size: 10 } }
      }
    }
  };

  // ─── Status display helper ───
  const getStatusLabel = (status) => {
    switch (status) {
      case "confirmed": return "Confirmed";
      case "pending": return "Pending";
      case "cancelled": return "Cancelled";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <div className="admin-booking">
      {/* <h1 className="page-heading">Booking</h1> */}

      <div className="admin-booking-layout">
        <div className="admin-left-section">
          <div className="admin-booking-top">
            <div className="admin-booking-top-card">
              <div className="card-header-row">
                <div className="icon blue">
                  <FiCalendar />
                </div>
                <span className="card-title">Total Booking</span>
                <FiMoreHorizontal className="more-icon" />
              </div>
              <h2 className="card-value">{formatNumber(stats.totalBookings)}</h2>
              <div className="card-footer-row">
                <div className="trend-container">
                  <span className="positive">↗ +2.98%</span>
                  <span className="trend-label">from last week</span>
                </div>
                <div className="spark">
                  <Line
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7],
                      datasets: [
                        {
                          data: [20, 30, 25, 40, 35, 45, 60],
                          borderColor: "#2563eb",
                          backgroundColor: "rgba(37,99,235,0.1)",
                          fill: true,
                        },
                      ],
                    }}
                    options={sparkOptions}
                  />
                </div>
              </div>
            </div>

            <div className="admin-booking-top-card">
              <div className="card-header-row">
                <div className="icon sky">
                  <FiUsers />
                </div>
                <span className="card-title">Total Participants</span>
                <FiMoreHorizontal className="more-icon" />
              </div>
              <h2 className="card-value">{formatNumber(stats.totalParticipants)}</h2>
              <div className="card-footer-row">
                <div className="trend-container">
                  <span className="negative">↘ -1.45%</span>
                  <span className="trend-label">from last week</span>
                </div>
                <div className="spark">
                  <Line
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7],
                      datasets: [
                        {
                          data: [60, 55, 50, 48, 45, 40, 38],
                          borderColor: "#ef4444",
                          backgroundColor: "rgba(239,68,68,0.1)",
                          fill: true,
                        },
                      ],
                    }}
                    options={sparkOptions}
                  />
                </div>
              </div>
            </div>

            <div className="admin-booking-top-card">
              <div className="card-header-row">
                <div className="icon blue">
                  <FiDollarSign />
                </div>
                <span className="card-title">Total Earnings</span>
                <FiMoreHorizontal className="more-icon" />
              </div>
              <h2 className="card-value">{formatCurrency(stats.totalEarnings)}</h2>
              <div className="card-footer-row">
                <div className="trend-container">
                  <span className="positive">↗ +3.75%</span>
                  <span className="trend-label">from last week</span>
                </div>
                <div className="spark">
                  <Line
                    data={{
                      labels: [1, 2, 3, 4, 5, 6, 7],
                      datasets: [
                        {
                          data: [30, 35, 32, 40, 42, 50, 55],
                          borderColor: "#2563eb",
                          backgroundColor: "rgba(37,99,235,0.1)",
                          fill: true,
                        },
                      ],
                    }}
                    options={sparkOptions}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="admin-booking-line">
            <div className="admin-booking-line-header">
              <h4>Trips Overview</h4>
              <div className="chart-filter-wrapper-blue">
                <div
                  className="blue-btn-mock"
                  onClick={() => setShowChartDropdown(!showChartDropdown)}
                  style={{ position: 'relative' }}
                >
                  {chartFilter} <span className="arrow">∨</span>
                  {showChartDropdown && (
                    <div style={{
                      position: 'absolute', top: '100%', right: 0, background: 'white',
                      color: 'black', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      borderRadius: '8px', overflow: 'hidden', zIndex: 10, minWidth: '120px'
                    }}>
                      {['Last 12 Months', 'Last 6 Months', 'Last 30 Days'].map(opt => (
                        <div
                          key={opt}
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setChartFilter(opt);
                            setShowChartDropdown(false);
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="overview-chart">
              <Line data={lineChart} options={overviewOptions} />
            </div>
          </div>

          <div className="admin-booking-donut">
            <div className="donut-header-row">
              <h4>Top Packages</h4>
              <FiMoreHorizontal className="more-icon" />
            </div>
            {/* Switched to Bar Chart */}
            <div className="donut-chart" style={{ width: '100%', height: '220px', margin: 0 }}>
              <Bar data={barChart} options={barOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING FORM & TABLE */}
      <div className="admin-booking-table">
        <div className="admin-booking-table-header">
          <h4>Bookings</h4>
          <div className="booking-actions">
            <div className="admin-booking-search">
              <FiSearch />
              <input
                placeholder="Search name, package, etc"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div
              className="date-filter-btn"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              style={{ position: 'relative' }}
            >
              <FiCalendar className="cal-icon" /> {dateFilter} <span className="arrow">∨</span>
              {showDateDropdown && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, background: 'white',
                  color: 'black', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px', overflow: 'hidden', zIndex: 10, minWidth: '120px'
                }}>
                  {['Today', 'This Week', 'This Month'].map(opt => (
                    <div
                      key={opt}
                      style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '12px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDateFilter(opt);
                        setShowDateDropdown(false);
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="add-btn" onClick={() => setShowForm(!showForm)}>
              <FiPlus /> Add Booking
            </button>
          </div>
        </div>

        {showForm && (
          <div className="booking-form">
            <input
              name="travelerName" value={formData.travelerName} onChange={handleInputChange}
              placeholder="Traveler Name"
            />
            <input
              name="userId" value={formData.userId} onChange={handleInputChange}
              placeholder="User ID"
            />
            <input
              name="packageId" value={formData.packageId} onChange={handleInputChange}
              placeholder="Package ID"
            />
            <input
              name="startDate" value={formData.startDate} onChange={handleInputChange}
              placeholder="Start Date (YYYY-MM-DD)" type="date"
            />
            <input
              name="endDate" value={formData.endDate} onChange={handleInputChange}
              placeholder="End Date (YYYY-MM-DD)" type="date"
            />
            <input
              name="participants" value={formData.participants} onChange={handleInputChange}
              placeholder="Participants" type="number" min="1"
            />
            <input
              name="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange}
              placeholder="Price Per Day" type="number"
            />
            <button onClick={handleAddBooking}>
              Save Booking
            </button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name ↕</th>
              <th>Booking Code ↕</th>
              <th>Package ↕</th>
              <th>Duration ↕</th>
              <th>Date ↕</th>
              <th>Price ↕</th>
              <th>Status ↕</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#9ca3af" }}>
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#9ca3af" }}>
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.travelerName}</td>
                  <td>{b.bookingCode}</td>
                  <td>{b.packageName || b.package?.title || "-"}</td>
                  <td>{b.duration || "-"}</td>
                  <td>{formatDate(b.startDate)} - {formatDate(b.endDate)}</td>
                  <td>{formatCurrency(b.finalPrice || b.price)}</td>
                  <td>
                    <span className={`status ${b.status}`}>{getStatusLabel(b.status)}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {b.status === "pending" && (
                        <button
                          onClick={() => handleStatusChange(b._id, "confirmed")}
                          style={{
                            padding: "3px 8px", fontSize: "11px", border: "none",
                            borderRadius: "6px", cursor: "pointer", fontWeight: 600,
                            background: "#d1fae5", color: "#059669"
                          }}
                        >
                          Confirm
                        </button>
                      )}
                      {(b.status === "pending" || b.status === "confirmed") && (
                        <button
                          onClick={() => handleStatusChange(b._id, "cancelled")}
                          style={{
                            padding: "3px 8px", fontSize: "11px", border: "none",
                            borderRadius: "6px", cursor: "pointer", fontWeight: 600,
                            background: "#fee2e2", color: "#dc2626"
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => handleStatusChange(b._id, "completed")}
                          style={{
                            padding: "3px 8px", fontSize: "11px", border: "none",
                            borderRadius: "6px", cursor: "pointer", fontWeight: 600,
                            background: "#dbeafe", color: "#2563eb"
                          }}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b._id)}
                        style={{
                          padding: "3px 8px", fontSize: "11px", border: "none",
                          borderRadius: "6px", cursor: "pointer", fontWeight: 600,
                          background: "#f3f4f6", color: "#6b7280"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing <b>{bookings.length}</b> out of <b>{totalBookingsCount}</b>
          </div>
          <div className="admin-booking-pagination">
            <button
              className="prev-btn"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <FiChevronLeft /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={page === p ? "active" : ""}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="next-btn"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;
