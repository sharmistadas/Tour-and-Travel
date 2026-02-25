import React, { useState } from "react";
import "../styles/Booking.css";

import {
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiSearch,
  FiPlus,
  FiMoreHorizontal,
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
  plugins: {
    legend: {
      position: "top",
      align: "start",
      labels: { usePointStyle: true, padding: 25, boxWidth: 8 },
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

const AdminBooking = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [dateFilter, setDateFilter] = useState("Today");
  const [chartFilter, setChartFilter] = useState("Last 12 Months");
  
  // State for mocked dropdowns
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showChartDropdown, setShowChartDropdown] = useState(false);

  const rowsPerPage = 8;

  const [bookings, setBookings] = useState([
    {
      name: "Camellia Swan",
      code: "BKG12345",
      pkg: "Venice Dreams",
      duration: "6 Days / 5 Nights",
      date: "June 25 - June 30",
      price: "$1,500",
      status: "confirmed",
    },
    {
      name: "Raphael Goodman",
      code: "BKG12346",
      pkg: "Safari Adventure",
      duration: "8 Days / 7 Nights",
      date: "Jun 25 - Jul 2",
      price: "$3,200",
      status: "pending",
    },
    {
      name: "Ludwig Contessa",
      code: "BKG12347",
      pkg: "Alpine Escape",
      duration: "7 Days / 6 Nights",
      date: "Jun 26 - Jul 2",
      price: "$2,100",
      status: "confirmed",
    },
    {
      name: "Armina Raul Reyes",
      code: "BKG12348",
      pkg: "Caribbean Cruise",
      duration: "10 Days / 9 Nights",
      date: "Jun 26 - Jul 5",
      price: "$2,800",
      status: "cancelled",
    },
    {
      name: "James Dunn",
      code: "BKG12349",
      pkg: "Parisian Romance",
      duration: "5 Days / 4 Nights",
      date: "Jun 26 - Jun 30",
      price: "$1,200",
      status: "confirmed",
    },
    {
      name: "Hillary Grey",
      code: "BKG12350",
      pkg: "Tokyo Cultural Adventure",
      duration: "7 Days / 6 Nights",
      date: "Jun 27 - Jul 3",
      price: "$1,800",
      status: "confirmed",
    },
    {
      name: "Lucas O’connor",
      code: "BKG12351",
      pkg: "Greek Island Hopping",
      duration: "10 Days / 9 Nights",
      date: "Jun 28 - Jul 7",
      price: "$2,500",
      status: "pending",
    },
    {
      name: "Layla Linch",
      code: "BKG12352",
      pkg: "Bali Beach Escape",
      duration: "8 Days / 7 Nights",
      date: "Jun 29 - Jul 6",
      price: "$1,600",
      status: "confirmed",
    },
    /* Page 2 Data */
    {
      name: "Oliver Smith",
      code: "BKG12353",
      pkg: "Swiss Escape",
      duration: "6 Days / 5 Nights",
      date: "Jul 2 - Jul 7",
      price: "$2,200",
      status: "confirmed",
    },
    {
      name: "Sophia Lee",
      code: "BKG12354",
      pkg: "Maldives Retreat",
      duration: "5 Days / 4 Nights",
      date: "Jul 4 - Jul 8",
      price: "$4,500",
      status: "pending",
    },
    {
      name: "Daniel Craig",
      code: "BKG12355",
      pkg: "London Explorer",
      duration: "7 Days / 6 Nights",
      date: "Jul 6 - Jul 13",
      price: "$3,000",
      status: "confirmed",
    },
    {
      name: "Emma Watson",
      code: "BKG12356",
      pkg: "Paris Delight",
      duration: "4 Days / 3 Nights",
      date: "Jul 8 - Jul 11",
      price: "$1,900",
      status: "cancelled",
    },
    {
      name: "Noah Brown",
      code: "BKG12357",
      pkg: "Dubai Luxury",
      duration: "6 Days / 5 Nights",
      date: "Jul 10 - Jul 15",
      price: "$3,800",
      status: "confirmed",
    },
    {
      name: "Ava Martinez",
      code: "BKG12358",
      pkg: "Rome Adventure",
      duration: "5 Days / 4 Nights",
      date: "Jul 12 - Jul 17",
      price: "$2,100",
      status: "pending",
    },
    {
      name: "William King",
      code: "BKG12359",
      pkg: "Thailand Tour",
      duration: "8 Days / 7 Nights",
      date: "Jul 14 - Jul 22",
      price: "$2,700",
      status: "confirmed",
    },
    {
      name: "Mia Taylor",
      code: "BKG12360",
      pkg: "Bali Escape",
      duration: "6 Days / 5 Nights",
      date: "Jul 18 - Jul 24",
      price: "$1,750",
      status: "confirmed",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    pkg: "",
    duration: "",
    date: "",
    price: "",
    status: "confirmed",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddBooking = () => {
    if (!formData.name || !formData.pkg) {
      alert("Please fill in at least Name and Package");
      return;
    }
    const newBooking = {
      ...formData,
      code: formData.code || `BKG${Math.floor(Math.random() * 10000)}`, // Auto-generate code if empty
      date: formData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // Default to today
    };
    setBookings([newBooking, ...bookings]);
    setFormData({
      name: "",
      code: "",
      pkg: "",
      duration: "",
      date: "",
      price: "",
      status: "confirmed",
    });
    setShowForm(false);
  };

  const filtered = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.pkg.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const lineChart = {
    labels: [
      "Aug 12",
      "Sep 15",
      "Oct 20",
      "Nov 5",
      "Dec 10",
      "Jan 15",
      "Feb 20",
      "Mar 25",
      "Apr 30",
      "May 15",
      "Jun 20",
      "Jul 25",
    ],
    datasets: [
      {
        label: "Done",
        data: [
          600, 1200, 1350, 1100, 1400, 1780, 1500, 1300, 1600, 1950, 1650, 1300,
        ],
        borderColor: "#3b82f6",
        borderWidth: 3,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "rgba(59,130,246,0.25)");
          gradient.addColorStop(1, "rgba(59,130,246,0.02)");
          return gradient;
        },
        tension: 0.5,
        pointRadius: 0,
      },
      {
        label: "Cancelled",
        data: [400, 200, 600, 700, 500, 650, 550, 900, 650, 900, 750, 900],
        borderColor: "#9ca3af",
        borderWidth: 2,
        borderDash: [6, 6],
        tension: 0.5,
        pointRadius: 0,
      },
    ],
  };

  const barChart = {
    labels: ["Tokyo", "Bali", "Safari", "Greek"],
    datasets: [
      {
        label: "Participants",
        data: [650, 520, 408, 278],
        backgroundColor: ["#2563eb", "#60a5fa", "#93c5fd", "#bfdbfe"],
        borderRadius: 4,
      },
    ],
  };

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
              <h2 className="card-value">1,200</h2>
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
              <h2 className="card-value">2,845</h2>
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
              <h2 className="card-value">$14,795</h2>
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
                  setPage(1);
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
          <div className="booking-form" style={{ 
            marginBottom: '20px', padding: '16px', background: '#f9f9f9', 
            borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' 
          }}>
            <input 
              name="name" value={formData.name} onChange={handleInputChange} 
              placeholder="Customer Name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
            <input 
              name="code" value={formData.code} onChange={handleInputChange} 
              placeholder="Booking Code (Auto)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
            <input 
              name="pkg" value={formData.pkg} onChange={handleInputChange} 
              placeholder="Package" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
            <input 
              name="duration" value={formData.duration} onChange={handleInputChange} 
              placeholder="Duration" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
            <input 
              name="date" value={formData.date} onChange={handleInputChange} 
              placeholder="Date (e.g. Jun 25)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
            <input 
              name="price" value={formData.price} onChange={handleInputChange} 
              placeholder="Price (e.g. $1,500)" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} 
            />
            <select 
              name="status" value={formData.status} onChange={handleInputChange} 
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
              <option value="confirmed">confirmed</option>
              <option value="pending">pending</option>
              <option value="cancelled">cancelled</option>
            </select>
            <button 
              onClick={handleAddBooking}
              style={{ padding: '8px', borderRadius: '4px', border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: 500 }}
            >
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
            </tr>
          </thead>
          <tbody>
            {paginated.map((b, i) => (
              <tr key={i}>
                <td>{b.name}</td>
                <td>{b.code}</td>
                <td>{b.pkg}</td>
                <td>{b.duration}</td>
                <td>{b.date}</td>
                <td>{b.price}</td>
                <td>
                  <span className={`status ${b.status}`}>{b.status === 'confirmed' ? 'Confirmed' : b.status === 'pending' ? 'Pending' : 'Cancelled'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION LOGIC REMAINS IDENTICAL */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing <b>{rowsPerPage}</b> out of <b>{filtered.length}</b>
          </div>
          <div className="admin-booking-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <button
              className={page === 1 ? "active" : ""}
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button
              className={page === 2 ? "active" : ""}
              onClick={() => setPage(2)}
            >
              2
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;
