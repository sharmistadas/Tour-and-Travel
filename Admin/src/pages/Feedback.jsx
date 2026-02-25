import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../styles/feedback.css";

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

const PACKAGES = [
  "All Packages",
  "Venice Dreams",
  "Safari Adventure",
  "Alpine Escape",
  "Caribbean Cruise",
  "Parisian Romance",
  "Tokyo Cultural Adventure",
  "Greek Island Hopping",
  "Bali Beach Escape",
];

const ROWS_PER_PAGE = 8;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatShort(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

function starFillWidth(rating) {
  const pct = clamp((rating / 5) * 100, 0, 100);
  return `${pct}%`;
}

export default function FeedbackPage() {
  // -----------------------------
  // GRAPH CONTROLS
  // -----------------------------
  const [graphRange, setGraphRange] = useState("month");

  // -----------------------------
  // GRAPH DATA
  // -----------------------------
  const graphData = useMemo(() => {
    if (graphRange === "week") {
      return [
        { label: "Mon", Positive: 92, Negative: 62 },
        { label: "Tue", Positive: 88, Negative: 55 },
        { label: "Wed", Positive: 101, Negative: 72 },
        { label: "Thu", Positive: 96, Negative: 61 },
        { label: "Fri", Positive: 110, Negative: 80 },
        { label: "Sat", Positive: 98, Negative: 64 },
        { label: "Sun", Positive: 104, Negative: 70 },
      ];
    }

    return [
      { label: "Aug 27", Positive: 930, Negative: 680 },
      { label: "Sep 27", Positive: 880, Negative: 760 },
      { label: "Oct 27", Positive: 1060, Negative: 640 },
      { label: "Nov 27", Positive: 990, Negative: 560 },
      { label: "Dec 27", Positive: 870, Negative: 650 },
      { label: "Jan 28", Positive: 780, Negative: 900 },
      { label: "Feb 28", Positive: 920, Negative: 720 },
      { label: "Mar 28", Positive: 1040, Negative: 650 },
      { label: "Apr 28", Positive: 1150, Negative: 790 },
      { label: "May 28", Positive: 1030, Negative: 620 },
      { label: "Jun 28", Positive: 900, Negative: 510 },
      { label: "Jul 28", Positive: 1000, Negative: 660 },
    ];
  }, [graphRange]);

  // -----------------------------
  // RATINGS DATA
  // -----------------------------
  const ratings = useMemo(() => {
    return {
      overall: 4.5,
      label: "Excellent",
      from: 1250,
      items: [
        { name: "Accommodation", rating: 4.6 },
        { name: "Tour Guides", rating: 4.8 },
        { name: "Itinerary", rating: 4.4 },
        { name: "Customer Service", rating: 4.7 },
        { name: "Value for Money", rating: 4.3 },
        { name: "Safety", rating: 4.5 },
        { name: "Transportation", rating: 4.5 },
        { name: "Food", rating: 4.2 },
      ],
    };
  }, []);

  // -----------------------------
  // FEEDBACK DATA
  // -----------------------------
  const [feedbacks, setFeedbacks] = useState([
    {
      id: uid(),
      name: "Camellia Swan",
      packageName: "Venice Dreams",
      rating: 4.5,
      text:
        "The Venice Dreams package was fantastic! The gondola ride was magical, and the guided tours were very informative.",
      date: "2026-07-01",
      initials: "CS",
    },
    {
      id: uid(),
      name: "Raphael Goodman",
      packageName: "Safari Adventure",
      rating: 5,
      text:
        "A well-organized Safari Adventure with knowledgeable guides, unforgettable close encounters with the Big Five.",
      date: "2026-07-03",
      initials: "RG",
    },
    {
      id: uid(),
      name: "Ludwig Contessa",
      packageName: "Alpine Escape",
      rating: 4,
      text:
        "The Alpine Escape tour offered stunning Swiss Alps views, top-notch accommodations, and a perfect mix.",
      date: "2026-07-04",
      initials: "LC",
    },
    {
      id: uid(),
      name: "Armina Raul Meyes",
      packageName: "Caribbean Cruise",
      rating: 3.5,
      text:
        "The Caribbean Cruise featured beautiful destinations, excellent food, friendly staff, and luxury amenities.",
      date: "2026-07-05",
      initials: "AR",
    },
    {
      id: uid(),
      name: "James Dunn",
      packageName: "Parisian Romance",
      rating: 5,
      text:
        "The Parisian Romance package exceeded expectations with fantastic Eiffel Tower views and a charming hotel.",
      date: "2026-07-06",
      initials: "JD",
    },
    {
      id: uid(),
      name: "Sophia Lee",
      packageName: "Tokyo Cultural Adventure",
      rating: 4.5,
      text:
        "Tokyo Cultural Adventure offered deep insights into Japanese culture with great temple visits.",
      date: "2026-07-07",
      initials: "SL",
    },
    {
      id: uid(),
      name: "Michael Smith",
      packageName: "Greek Island Hopping",
      rating: 4,
      text:
        "Greek Island Hopping tour was wonderful with unique island experiences and excellent accommodations.",
      date: "2026-07-09",
      initials: "MS",
    },
    {
      id: uid(),
      name: "Emily Davis",
      packageName: "Bali Beach Escape",
      rating: 5,
      text:
        "Bali Beach Escape was a dream with stunning beachfront villa, relaxing spa treatments, and yoga sessions.",
      date: "2026-07-10",
      initials: "ED",
    },
    {
      id: uid(),
      name: "Lucas O'connor",
      packageName: "Greek Island Hopping",
      rating: 4.5,
      text:
        "Very smooth tour and the planning was excellent. Hotels were clean and guides were friendly.",
      date: "2026-06-28",
      initials: "LO",
    },
    {
      id: uid(),
      name: "Zaïre Dorwart",
      packageName: "Bali Beach Escape",
      rating: 4,
      text:
        "Nice experience. Beaches were amazing and overall the service was professional.",
      date: "2026-06-29",
      initials: "ZD",
    },
    {
      id: uid(),
      name: "Hilory Grey",
      packageName: "Tokyo Cultural Adventure",
      rating: 4.2,
      text:
        "Great city experience, the itinerary was balanced. Would recommend for first time visitors.",
      date: "2026-06-30",
      initials: "HG",
    },
  ]);

  // -----------------------------
  // DELETE CONFIRM STATE
  // -----------------------------
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = () => {
    if (!deleteId) return;
    setFeedbacks((prev) => prev.filter((f) => f.id !== deleteId));
    setDeleteId(null);
  };

  // -----------------------------
  // FILTERS
  // -----------------------------
  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("All Packages");
  const [dateRange] = useState("June 28 - 15 July 28");
  const [page, setPage] = useState(1);

  const filteredFeedbacks = useMemo(() => {
    let list = [...feedbacks];

    if (packageFilter !== "All Packages") {
      list = list.filter((f) => f.packageName === packageFilter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.packageName.toLowerCase().includes(q) ||
          f.text.toLowerCase().includes(q)
      );
    }

    return list;
  }, [feedbacks, packageFilter, search]);

  useMemo(() => setPage(1), [search, packageFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeedbacks.length / ROWS_PER_PAGE)
  );

  const pageCards = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredFeedbacks.slice(start, start + ROWS_PER_PAGE);
  }, [filteredFeedbacks, page]);

  return (
    <div className="fb-page">
      <div className="container-fluid py-4">
        {/* TOP HEADER */}
        <div className="fb-topbar">
          <div className="fb-title">Feedback</div>

          <div className="fb-right">
            <button className="fb-icon-btn" type="button" title="Notifications">
              <i className="bi bi-bell" />
              <span className="fb-dot" />
            </button>

            <button className="fb-profile" type="button">
              <div className="fb-avatar" />
              <div className="fb-profile-info d-none d-sm-block">
                <div className="fb-name">Ruben Herwitz</div>
                <div className="fb-role">Admin</div>
              </div>
              <i className="bi bi-chevron-down d-none d-sm-inline" />
            </button>
          </div>
        </div>

        {/* TOP GRID */}
        <div className="row g-3 mt-2">
          {/* GRAPH */}
          <div className="col-12 col-lg-9">
            <div className="fb-card">
              <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                <div>
                  <div className="fb-card-title">Review Statistics</div>
                  <div className="fb-legend">
                    <span className="fb-dot-blue" /> Positive
                    <span className="fb-dot-gray ms-3" /> Negative
                  </div>
                </div>

                <div className="dropdown">
                  <button
                    className="btn fb-range-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {graphRange === "month" ? "Last 12 Months" : "Last 7 Days"}
                  </button>

                  <ul className="dropdown-menu shadow-sm">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setGraphRange("week")}
                      >
                        Week
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setGraphRange("month")}
                      >
                        Month
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="fb-recharts mt-3">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={graphData} barGap={8}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="Positive"
                      fill="#3b82f6"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="Negative"
                      fill="#cbd5e1"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* RATINGS */}
          <div className="col-12 col-lg-3">
            <div className="fb-card h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div className="fb-card-title">Ratings</div>
                <button className="btn fb-more-btn" type="button">
                  <i className="bi bi-three-dots" />
                </button>
              </div>

              <div className="fb-rating-top mt-3">
                <div className="fb-score-box">
                  <i className="bi bi-star-fill fb-score-star" />
                  <span className="fb-score-num">{ratings.overall}</span>
                  <span className="fb-score-out">/5</span>
                </div>

                <div>
                  <div className="fb-overall-label">{ratings.label}</div>
                  <div className="fb-overall-from">
                    <i className="bi bi-info-circle me-2" />
                    From {ratings.from.toLocaleString()} Reviews
                  </div>
                </div>
              </div>

              <div className="fb-rating-list mt-4">
                {ratings.items.map((r) => (
                  <div className="fb-rating-row" key={r.name}>
                    <div className="fb-rating-name">{r.name}</div>

                    <div className="fb-stars fb-stars-sm">
                      <div className="fb-stars-bg">★★★★★</div>
                      <div
                        className="fb-stars-fill"
                        style={{ width: starFillWidth(r.rating) }}
                      >
                        ★★★★★
                      </div>
                    </div>

                    <div className="fb-rating-num">{r.rating.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TRAVELER FEEDBACK */}
        <div className="fb-card mt-3">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
            <div>
              <div className="fb-card-title">Traveler Feedback</div>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-md-end">
              <div className="fb-search">
                <i className="bi bi-search" />
                <input
                  className="form-control"
                  placeholder="Search name, package, etc"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="form-select fb-select"
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
              >
                {PACKAGES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <button className="btn fb-date-btn" type="button">
                <i className="bi bi-calendar3 me-2" />
                {dateRange}
                <i className="bi bi-chevron-down ms-2" />
              </button>
            </div>
          </div>

          {/* FEEDBACK GRID */}
          <div className="row g-3 mt-1">
            {pageCards.map((f) => (
              <div className="col-12 col-md-6 col-lg-3" key={f.id}>
                <div className="fb-feedback-card">
                  {/* DELETE BUTTON (OPEN MODAL) */}
                  <button
                    className="fb-delete-btn"
                    type="button"
                    title="Delete feedback"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setDeleteId(f.id)}
                  >
                    <i className="bi bi-trash3" />
                  </button>

                  <div className="fb-card-head">
                    <div className="fb-user">
                      <div className="fb-user-avatar">{f.initials}</div>
                      <div>
                        <div className="fb-user-name">{f.name}</div>
                        <div className="fb-user-pack">{f.packageName}</div>
                      </div>
                    </div>
                  </div>

                  <div className="fb-card-rating">
                    <div className="fb-stars big">
                      <div className="fb-stars-bg">★★★★★</div>
                      <div
                        className="fb-stars-fill"
                        style={{ width: starFillWidth(f.rating) }}
                      >
                        ★★★★★
                      </div>
                    </div>
                    <div className="fb-card-rating-num">{f.rating}</div>
                  </div>

                  <div className="fb-feedback-text">{f.text}</div>

                  <div className="fb-feedback-footer">
                    <div className="fb-date">{formatShort(f.date)}</div>
                  </div>
                </div>
              </div>
            ))}

            {pageCards.length === 0 ? (
              <div className="col-12">
                <div className="fb-empty">No feedback found.</div>
              </div>
            ) : null}
          </div>

          {/* FOOTER PAGINATION */}
          <div className="fb-footer mt-3">
            <div className="fb-showing">
              Showing <span className="fb-show-pill">{pageCards.length}</span>{" "}
              out of {filteredFeedbacks.length}
            </div>

            <div className="fb-pagination">
              <button
                className="btn fb-page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`btn fb-page-num ${page === n ? "active" : ""}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                className="btn fb-page-btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ DELETE CONFIRM MODAL */}
      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content fb-modal">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Delete Feedback</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setDeleteId(null)}
              ></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete this feedback? <br />
              <span className="text-danger fw-bold">This action cannot be undone.</span>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn fb-cancel-btn"
                data-bs-dismiss="modal"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn fb-confirm-btn"
                data-bs-dismiss="modal"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
