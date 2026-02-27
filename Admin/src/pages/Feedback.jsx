import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import api from "../utils/api";

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
  const navigate = useNavigate();
  // -----------------------------
  // LOADING STATE
  // -----------------------------
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // ADMIN USER INFO
  // -----------------------------
  const [adminUser, setAdminUser] = useState(() => {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : { name: "Admin User", role: "Administrator" };
  });

  // -----------------------------
  // GRAPH CONTROLS
  // -----------------------------
  const [graphRange, setGraphRange] = useState("month");

  // -----------------------------
  // FEEDBACK DATA (from API) — declared early so graphData can reference it
  // -----------------------------
  const [feedbacks, setFeedbacks] = useState([]);

  // -----------------------------
  // GRAPH DATA (computed from fetched reviews)
  // -----------------------------
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const graphData = useMemo(() => {
    if (feedbacks.length === 0) return [];

    if (graphRange === "week") {
      // Group reviews by day of week (last 7 days)
      const buckets = DAY_NAMES.map((label) => ({ label, Positive: 0, Negative: 0 }));
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);

      feedbacks.forEach((f) => {
        if (!f.date) return;
        const d = new Date(f.date);
        if (d >= weekAgo && d <= now) {
          const dayIdx = d.getDay(); // 0=Sun
          if (f.rating >= 3.5) buckets[dayIdx].Positive++;
          else buckets[dayIdx].Negative++;
        }
      });

      // Reorder so Monday comes first
      return [...buckets.slice(1), buckets[0]];
    }

    // "month" — Group reviews by month (last 12 months)
    const now = new Date();
    const buckets = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const label = `${MONTH_NAMES[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
      buckets.push({ key, label, Positive: 0, Negative: 0 });
    }

    feedbacks.forEach((f) => {
      if (!f.date) return;
      const d = new Date(f.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = buckets.find((b) => b.key === key);
      if (bucket) {
        if (f.rating >= 3.5) bucket.Positive++;
        else bucket.Negative++;
      }
    });

    return buckets.map(({ label, Positive, Negative }) => ({ label, Positive, Negative }));
  }, [graphRange, feedbacks]);

  // -----------------------------
  // RATINGS DATA (from API)
  // -----------------------------
  const [ratings, setRatings] = useState({
    overall: 0,
    label: "",
    from: 0,
    items: [],
  });

  const fetchRatingsSummary = useCallback(async () => {
    try {
      const res = await api.get("/reviews/ratings-summary");
      const data = res.data?.data || res.data || {};
      const overall = data.overall || data.averageRating || 0;
      const totalReviews = data.totalReviews || data.from || data.count || 0;
      let label = "";
      if (overall >= 4.5) label = "Excellent";
      else if (overall >= 4) label = "Very Good";
      else if (overall >= 3.5) label = "Good";
      else if (overall >= 3) label = "Average";
      else label = "Below Average";

      const items = Array.isArray(data.items || data.categories)
        ? (data.items || data.categories).map((r) => ({
          name: r.name || r.category || "",
          rating: r.rating || r.average || 0,
        }))
        : [
          { name: "Accommodation", rating: data.accommodation || 0 },
          { name: "Tour Guides", rating: data.tourGuides || 0 },
          { name: "Itinerary", rating: data.itinerary || 0 },
          { name: "Customer Service", rating: data.customerService || 0 },
          { name: "Value for Money", rating: data.valueForMoney || 0 },
          { name: "Safety", rating: data.safety || 0 },
          { name: "Transportation", rating: data.transportation || 0 },
          { name: "Food", rating: data.food || 0 },
        ].filter((r) => r.rating > 0);

      setRatings({ overall, label, from: totalReviews, items });
    } catch (err) {
      console.error("Failed to fetch ratings summary:", err);
    }
  }, []);



  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews");
      const items = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.reviews || [];
      setFeedbacks(
        items.map((r) => ({
          id: r._id || r.id,
          name: r.userName || r.user?.name || r.name || "Anonymous",
          packageName: r.packageName || r.package?.title || r.packageTitle || "",
          rating: r.rating || 0,
          text: r.comment || r.text || r.review || r.feedback || "",
          date: r.createdAt || r.date || "",
          initials: getInitials(r.userName || r.user?.name || r.name || ""),
          status: r.status || "pending",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchReviews();
    fetchRatingsSummary();
  }, [fetchReviews, fetchRatingsSummary]);

  // -----------------------------
  // DELETE CONFIRM STATE
  // -----------------------------
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/reviews/${deleteId}`);
      setDeleteId(null);
      fetchReviews();
      fetchRatingsSummary();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete feedback.");
      setDeleteId(null);
    }
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
          <div className="fb-title">Feedback Management</div>
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

            {loading && pageCards.length === 0 ? (
              <div className="col-12">
                <div className="fb-empty">Loading reviews...</div>
              </div>
            ) : null}

            {!loading && pageCards.length === 0 ? (
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
