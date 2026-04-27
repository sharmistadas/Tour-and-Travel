import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/coupons.css";
import api from "../utils/api";

const ROWS_PER_PAGE = 8;

function formatDateInput(d) {
  if (!d) return "";
  const dt = new Date(d);
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isExpired(validTo) {
  if (!validTo) return false;
  const today = new Date();
  const end = new Date(validTo);
  end.setHours(23, 59, 59, 999);
  return end < today;
}

export default function CouponsOffers() {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tableKey, setTableKey] = useState(0); // forces table re-render + fade-in

  // -----------------------------
  // AUTHENTICATION
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // -----------------------------
  // FORM STATE
  // -----------------------------
  const [editingId, setEditingId] = useState(null);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("fixed");
  const [currency, setCurrency] = useState("AED");
  const [value, setValue] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [perUser, setPerUser] = useState("");
  const [validFrom, setValidFrom] = useState(formatDateInput(new Date()));
  const [validTo, setValidTo] = useState("");
  const [scope, setScope] = useState("All");

  // -----------------------------
  // RIGHT SIDE
  // -----------------------------
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // -----------------------------
  // PAGINATION
  // -----------------------------
  const [page, setPage] = useState(1);

  // -----------------------------
  // FILTER DROPDOWN
  // -----------------------------
  const [openFilter, setOpenFilter] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // -----------------------------
  // FETCH COUPONS FROM API
  // -----------------------------
  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/coupons");
      const items = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.coupons || [];
      setCoupons(
        items.map((c) => ({
          id: c._id || c.id,
          code: c.code || "",
          description: c.description || "",
          type: c.discount_type === "percentage" ? "percent" : "fixed",
          value: c.discountValue || 0,
          minPurchase: c.minPurchaseAmount || 0,
          maxDiscount: c.maxDiscountAmount || 0,
          usageLimit: c.usageLimit || 0,
          perUser: c.perUserLimit || 1,
          validFrom: formatDateInput(c.startDate),
          validTo: formatDateInput(c.endDate),
          scope: c.scope || "All",
          usage: c.usedCount || 0,
          active: typeof c.isActive === "boolean" ? c.isActive : true,
        }))
      );
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  // -----------------------------
  // REFRESH HANDLER
  // -----------------------------
  const handleRefresh = async (e) => {
    e.preventDefault();
    setIsRefreshing(true);
    // Reset all filters and form state
    setSearch("");
    setFilterStatus("all");
    setPage(1);
    setOpenFilter(false);
    resetForm();
    try {
      await fetchCoupons();
    } finally {
      // Increment tableKey to force table re-render with fade-in animation
      setTableKey((prev) => prev + 1);
      setTimeout(() => setIsRefreshing(false), 800);
    }
  };

  // -----------------------------
  // COUNTS
  // -----------------------------
  const counts = useMemo(() => {
    const total = coupons.length;
    const expired = coupons.filter((c) => isExpired(c.validTo)).length;
    const active = coupons.filter((c) => c.active && !isExpired(c.validTo)).length;
    const inactive = coupons.filter((c) => !c.active && !isExpired(c.validTo)).length;
    return { total, active, inactive, expired };
  }, [coupons]);

  // -----------------------------
  // FILTER + SEARCH
  // -----------------------------
  const filteredCoupons = useMemo(() => {
    let list = [...coupons];
    if (filterStatus === "active") list = list.filter((c) => c.active && !isExpired(c.validTo));
    if (filterStatus === "inactive") list = list.filter((c) => !c.active && !isExpired(c.validTo));
    if (filterStatus === "expired") list = list.filter((c) => isExpired(c.validTo));
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [coupons, search, filterStatus]);

  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredCoupons.length / ROWS_PER_PAGE));

  const pageRows = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredCoupons.slice(start, start + ROWS_PER_PAGE);
  }, [filteredCoupons, page]);

  // -----------------------------
  // HELPERS
  // -----------------------------
  const resetForm = () => {
    setEditingId(null);
    setCode("");
    setDescription("");
    setType("fixed");
    setCurrency("AED");
    setValue("");
    setMinPurchase("");
    setMaxDiscount("");
    setUsageLimit("");
    setPerUser("");
    setValidFrom(formatDateInput(new Date()));
    setValidTo("");
    setScope("All");
  };

  const validateForm = () => {
    if (!code.trim()) return false;
    if (!description.trim()) return false;
    if (!type) return false;
    if (value === "" || Number(value) < 0) return false;
    if (minPurchase === "" || Number(minPurchase) < 0) return false;
    if (maxDiscount === "" || Number(maxDiscount) < 0) return false;
    if (usageLimit === "" || Number(usageLimit) < 0) return false;
    if (perUser === "" || Number(perUser) < 0) return false;
    if (!validFrom) return false;
    if (!validTo) return false;
    if (!scope.trim()) return false;
    return true;
  };

  // -----------------------------
  // ADD / UPDATE
  // -----------------------------
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }
    const payload = {
      code: code.trim().toUpperCase(),
      description: description.trim(),
      discount_type: type === "percent" ? "percentage" : "fixed_amount",
      discountValue: Number(value),
      minPurchaseAmount: Number(minPurchase),
      maxDiscountAmount: Number(maxDiscount),
      usageLimit: Number(usageLimit),
      perUserLimit: Number(perUser),
      startDate: validFrom,
      endDate: validTo,
      scope,
      isActive: true,
    };
    try {
      if (editingId) {
        await api.put(`/coupons/${editingId}`, payload);
      } else {
        await api.post("/coupons", payload);
      }
      resetForm();
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save coupon.");
    }
  };

  // -----------------------------
  // EDIT
  // -----------------------------
  const onEdit = (c) => {
    setEditingId(c.id);
    setCode(c.code);
    setDescription(c.description);
    setType(c.type);
    setCurrency("AED");
    setValue(String(c.value));
    setMinPurchase(String(c.minPurchase));
    setMaxDiscount(String(c.maxDiscount));
    setUsageLimit(String(c.usageLimit));
    setPerUser(String(c.perUser));
    setValidFrom(c.validFrom);
    setValidTo(c.validTo);
    setScope(c.scope);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // -----------------------------
  // DELETE
  // -----------------------------
  const onDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await api.delete(`/coupons/${id}`);
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete coupon.");
    }
  };

  // -----------------------------
  // POWER TOGGLE
  // -----------------------------
  const togglePower = async (id) => {
    const coupon = coupons.find((c) => c.id === id);
    if (!coupon) return;
    try {
      await api.patch(`/coupons/status/${id}`, { isActive: !coupon.active });
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle coupon status.");
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px", boxSizing: "border-box" }}>

      {/* Inline keyframe animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes tableFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .table-refresh-animate {
          animation: tableFadeIn 0.5s ease forwards;
        }
      `}</style>

      {/* GLOBAL REFRESH BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button
          type="button"
          className="admin-refresh-btn"
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh page"
          style={{
            position: "relative",
            top: "auto",
            right: "auto",
            zIndex: 1,
            padding: "8px 16px",
            height: "auto",
            borderRadius: "12px",
            fontSize: "14px",
            margin: 0,
          }}
        >
          <span
            className="rfr-icon"
            style={{
              marginRight: "6px",
              display: "inline-block",
              animation: isRefreshing ? "spin 0.8s linear infinite" : "none",
            }}
          >
            &#x21BB;
          </span>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="coupon-page" style={{ flex: 1, margin: 0, padding: 0, height: "auto" }}>
        <div className="container-fluid py-4" style={{ paddingTop: "0 !important" }}>

          {/* HEADER */}
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
            <div>
              <div className="coupon-title">Coupons & Offers</div>
              <div className="coupon-sub">Create and manage discount codes</div>
            </div>
            <div className="d-flex gap-2 flex-wrap justify-content-md-end">
              <div className="stat-pill stat-green">
                <div className="stat-label">Active</div>
                <div className="stat-value">{counts.active}</div>
              </div>
              <div className="stat-pill">
                <div className="stat-label">Total</div>
                <div className="stat-value">{counts.total}</div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            {/* LEFT FORM */}
            <div className="col-12 col-lg-4">
              <div className="coupon-card">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="form-title">
                    <i className="bi bi-plus-lg me-2" />
                    {editingId ? "Update Coupon" : "Create Coupon"}
                  </div>
                  {editingId ? (
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={resetForm}>
                      Cancel Edit
                    </button>
                  ) : null}
                </div>

                <form onSubmit={onSubmit}>
                  {/* Code */}
                  <div className="mb-3">
                    <label className="form-label fw-bold" htmlFor="couponCode">
                      Code <span className="text-danger">*</span>
                    </label>
                    <input
                      id="couponCode"
                      className="form-control coupon-input"
                      placeholder="E.G. SAVE20"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control coupon-input"
                      placeholder="Brief description..."
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Type + Value */}
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select coupon-input"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                      >
                        <option value="fixed">Fixed Amount</option>
                        <option value="percent">Percentage</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Value <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        {type === "fixed" ? (
                          <span className="input-group-text">{currency}</span>
                        ) : (
                          <span className="input-group-text">%</span>
                        )}
                        <input
                          type="number"
                          className="form-control coupon-input"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          required
                          min={1}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Min Purchase + Max Discount */}
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Min Purchase (AED) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control coupon-input"
                        value={minPurchase}
                        onChange={(e) => setMinPurchase(e.target.value)}
                        required
                        min={0}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Max Discount (AED) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control coupon-input"
                        value={maxDiscount}
                        onChange={(e) => setMaxDiscount(e.target.value)}
                        required
                        min={0}
                      />
                    </div>
                  </div>

                  {/* Usage Limit + Per User */}
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Usage Limit <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control coupon-input"
                        value={usageLimit}
                        onChange={(e) => setUsageLimit(e.target.value)}
                        required
                        min={0}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Per User <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control coupon-input"
                        value={perUser}
                        onChange={(e) => setPerUser(e.target.value)}
                        required
                        min={0}
                      />
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="row g-2 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Valid From <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control coupon-input"
                        value={validFrom}
                        onChange={(e) => setValidFrom(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">
                        Valid To <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control coupon-input"
                        value={validTo}
                        onChange={(e) => setValidTo(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Scope */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Scope <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select coupon-input"
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      required
                    >
                      <option value="All">All</option>
                      <option value="1 cat">1 cat</option>
                      <option value="3 prod">3 prod</option>
                      <option value="1 cat / 3 prod">1 cat / 3 prod</option>
                    </select>
                  </div>

                  {/* SUBMIT */}
                  <button className="btn coupon-btn w-100" type="submit">
                    <i className="bi bi-plus-circle me-2" />
                    {editingId ? "Update Coupon" : "Create Coupon"}
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT TABLE */}
            <div className="col-12 col-lg-8">
              <div className="coupon-card">
                {/* TOOLBAR */}
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-3">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* SEARCH */}
                    <div className="search-box">
                      <i className="bi bi-search" />
                      <input
                        className="form-control"
                        placeholder="Search coupons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>

                    {/* FILTER */}
                    <div className="position-relative" ref={filterRef}>
                      <button
                        className="btn filter-btn d-flex align-items-center gap-2"
                        type="button"
                        onClick={() => setOpenFilter((s) => !s)}
                      >
                        <i className="bi bi-funnel" />
                        {filterStatus === "all"
                          ? `All (${counts.total})`
                          : filterStatus === "active"
                          ? `Active (${counts.active})`
                          : filterStatus === "inactive"
                          ? `Inactive (${counts.inactive})`
                          : `Expired (${counts.expired})`}
                        <i className="bi bi-caret-down-fill ms-1" />
                      </button>

                      {openFilter && (
                        <div className="filter-menu">
                          <button
                            className={`filter-item ${filterStatus === "all" ? "active" : ""}`}
                            onClick={() => { setFilterStatus("all"); setOpenFilter(false); }}
                          >
                            <span className="filter-text">All</span>
                            <span className="filter-count">{counts.total}</span>
                          </button>
                          <button
                            className={`filter-item ${filterStatus === "active" ? "active" : ""}`}
                            onClick={() => { setFilterStatus("active"); setOpenFilter(false); }}
                          >
                            <span className="filter-text">Active</span>
                            <span className="filter-count">{counts.active}</span>
                          </button>
                          <button
                            className={`filter-item ${filterStatus === "inactive" ? "active" : ""}`}
                            onClick={() => { setFilterStatus("inactive"); setOpenFilter(false); }}
                          >
                            <span className="filter-text">Inactive</span>
                            <span className="filter-count">{counts.inactive}</span>
                          </button>
                          <button
                            className={`filter-item ${filterStatus === "expired" ? "active" : ""}`}
                            onClick={() => { setFilterStatus("expired"); setOpenFilter(false); }}
                          >
                            <span className="filter-text">Expired</span>
                            <span className="filter-count">{counts.expired}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TABLE — key forces re-mount + fade-in on refresh */}
                <div
                  key={tableKey}
                  className="table-responsive coupon-table-wrap table-refresh-animate"
                >
                  <table className="table align-middle coupon-table">
                    <thead className="thead">
                      <tr>
                        <th>Code</th>
                        <th>Discount</th>
                        <th>Validity</th>
                        <th>Scope</th>
                        <th>Usage</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading && (
                        <tr>
                          <td colSpan={7}>
                            <div className="empty-state">Loading coupons...</div>
                          </td>
                        </tr>
                      )}

                      {pageRows.map((c) => {
                        const expired = isExpired(c.validTo);
                        const status = expired
                          ? "Expired"
                          : c.active
                          ? "Active"
                          : "Inactive";

                        return (
                          <tr key={c.id}>
                            <td>
                              <div className="code-cell">
                                <span className="code-text">{c.code}</span>
                                <button
                                  className="btn btn-sm copy-btn"
                                  type="button"
                                  onClick={() => navigator.clipboard.writeText(c.code)}
                                  title="Copy code"
                                >
                                  <i className="bi bi-copy" />
                                </button>
                              </div>
                              <div className="small text-muted mt-1">{c.description}</div>
                            </td>

                            <td>
                              <div className="fw-bold">
                                {c.type === "percent" ? `${c.value}%` : `${currency} ${c.value}`}
                              </div>
                              <div className="small text-muted">
                                {c.type === "percent" ? "OFF" : "FLAT"}
                              </div>
                            </td>

                            <td>
                              <div className="small">
                                {new Date(c.validFrom).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                              </div>
                              <div className="small text-muted">
                                {new Date(c.validTo).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                              </div>
                            </td>

                            <td>
                              <span className="scope-pill">{c.scope}</span>
                            </td>

                            <td className="fw-bold">
                              {c.usage}/{c.usageLimit || "∞"}
                            </td>

                            <td>
                              <span
                                className={`status-pill ${
                                  status === "Active"
                                    ? "s-active"
                                    : status === "Inactive"
                                    ? "s-inactive"
                                    : "s-expired"
                                }`}
                              >
                                {status}
                              </span>
                            </td>

                            <td className="text-end">
                              <div className="d-flex justify-content-end gap-2 flex-wrap">
                                <button
                                  className="btn action-btn power"
                                  type="button"
                                  onClick={() => togglePower(c.id)}
                                  title="Power On/Off"
                                  disabled={expired}
                                >
                                  <i className="bi bi-power" />
                                </button>
                                <button
                                  className="btn action-btn edit"
                                  type="button"
                                  onClick={() => onEdit(c)}
                                  title="Edit"
                                >
                                  <i className="bi bi-pencil" />
                                </button>
                                <button
                                  className="btn action-btn del"
                                  type="button"
                                  onClick={() => onDelete(c.id)}
                                  title="Delete"
                                >
                                  <i className="bi bi-trash3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {!loading && pageRows.length === 0 && (
                        <tr>
                          <td colSpan={7}>
                            <div className="empty-state">No coupons found.</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 mt-3">
                  <div className="small text-muted">
                    Showing {pageRows.length} of {filteredCoupons.length} coupons
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                    <button
                      className="btn page-btn"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      Prev
                    </button>
                    <span className="page-pill">
                      Page <b>{page}</b> / {totalPages}
                    </span>
                    <button
                      className="btn page-btn"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}