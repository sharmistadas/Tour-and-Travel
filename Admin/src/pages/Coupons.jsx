import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/coupons.css";

const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

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
  const [coupons, setCoupons] = useState([
    {
      id: uid(),
      code: "HELLO",
      description: "New user discount",
      type: "percent",
      value: 4,
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 0,
      perUser: 0,
      validFrom: "2026-01-30",
      validTo: "2026-02-06",
      scope: "1 cat / 3 prod",
      usage: 0,
      active: false,
    },
    {
      id: uid(),
      code: "FLASH50",
      description: "Flash sale - 50% off",
      type: "percent",
      value: 50,
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 20,
      perUser: 1,
      validFrom: "2026-02-03",
      validTo: "2026-02-23",
      scope: "All",
      usage: 0,
      active: true,
    },
    {
      id: uid(),
      code: "LUXURY30",
      description: "30% off on luxury perfumes",
      type: "percent",
      value: 30,
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 25,
      perUser: 1,
      validFrom: "2026-01-22",
      validTo: "2026-02-15",
      scope: "1 cat",
      usage: 0,
      active: false,
    },
    {
      id: uid(),
      code: "WELCOME100",
      description: "Welcome offer - 100 AED off",
      type: "fixed",
      value: 100,
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 1000,
      perUser: 1,
      validFrom: "2026-01-01",
      validTo: "2026-01-22",
      scope: "All",
      usage: 0,
      active: true,
    },
    {
      id: uid(),
      code: "PERFUME20",
      description: "20% off on perfumes",
      type: "percent",
      value: 20,
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 100,
      perUser: 1,
      validFrom: "2026-01-22",
      validTo: "2026-04-01",
      scope: "1 cat",
      usage: 0,
      active: true,
    },
  ]);

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
  const [filterStatus, setFilterStatus] = useState("all"); // all | active | inactive | expired

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
  // COUNTS
  // -----------------------------
  const counts = useMemo(() => {
    const total = coupons.length;
    const expired = coupons.filter((c) => isExpired(c.validTo)).length;
    const active = coupons.filter((c) => c.active && !isExpired(c.validTo))
      .length;
    const inactive = coupons.filter((c) => !c.active && !isExpired(c.validTo))
      .length;
    return { total, active, inactive, expired };
  }, [coupons]);

  // -----------------------------
  // FILTER + SEARCH
  // -----------------------------
  const filteredCoupons = useMemo(() => {
    let list = [...coupons];

    if (filterStatus === "active") {
      list = list.filter((c) => c.active && !isExpired(c.validTo));
    }
    if (filterStatus === "inactive") {
      list = list.filter((c) => !c.active && !isExpired(c.validTo));
    }
    if (filterStatus === "expired") {
      list = list.filter((c) => isExpired(c.validTo));
    }

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

  // reset pagination when filter/search changes
  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  // total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCoupons.length / ROWS_PER_PAGE)
  );

  // page rows
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
    if (!value || Number(value) <= 0) return false;
    if (minPurchase === "") return false;
    if (maxDiscount === "") return false;
    if (usageLimit === "") return false;
    if (perUser === "") return false;
    if (!validFrom) return false;
    if (!validTo) return false;
    if (!scope.trim()) return false;
    return true;
  };

  // -----------------------------
  // ADD / UPDATE
  // -----------------------------
  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      id: editingId || uid(),
      code: code.trim().toUpperCase(),
      description: description.trim(),
      type,
      value: Number(value),
      minPurchase: Number(minPurchase),
      maxDiscount: Number(maxDiscount),
      usageLimit: Number(usageLimit),
      perUser: Number(perUser),
      validFrom,
      validTo,
      scope,
      usage: 0,
      active: true,
    };

    setCoupons((prev) => {
      if (!editingId) return [payload, ...prev];
      return prev.map((c) => (c.id === editingId ? { ...c, ...payload } : c));
    });

    resetForm();
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
  const onDelete = (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  // -----------------------------
  // POWER TOGGLE
  // -----------------------------
  const togglePower = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="coupon-page">
      <div className="container-fluid py-4">
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
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                ) : null}
              </div>

              <form onSubmit={onSubmit}>
                {/* Code */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Code <span className="text-danger">*</span>
                  </label>
                  <input
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
                          className={`filter-item ${
                            filterStatus === "all" ? "active" : ""
                          }`}
                          onClick={() => {
                            setFilterStatus("all");
                            setOpenFilter(false);
                          }}
                        >
                          <span className="filter-text">All</span>
                          <span className="filter-count">{counts.total}</span>
                        </button>

                        <button
                          className={`filter-item ${
                            filterStatus === "active" ? "active" : ""
                          }`}
                          onClick={() => {
                            setFilterStatus("active");
                            setOpenFilter(false);
                          }}
                        >
                          <span className="filter-text">Active</span>
                          <span className="filter-count">{counts.active}</span>
                        </button>

                        <button
                          className={`filter-item ${
                            filterStatus === "inactive" ? "active" : ""
                          }`}
                          onClick={() => {
                            setFilterStatus("inactive");
                            setOpenFilter(false);
                          }}
                        >
                          <span className="filter-text">Inactive</span>
                          <span className="filter-count">{counts.inactive}</span>
                        </button>

                        <button
                          className={`filter-item ${
                            filterStatus === "expired" ? "active" : ""
                          }`}
                          onClick={() => {
                            setFilterStatus("expired");
                            setOpenFilter(false);
                          }}
                        >
                          <span className="filter-text">Expired</span>
                          <span className="filter-count">{counts.expired}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="btn refresh-btn"
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setFilterStatus("all");
                  }}
                >
                  <i className="bi bi-arrow-clockwise me-2" />
                  Refresh
                </button>
              </div>

              {/* TABLE */}
              <div className="table-responsive coupon-table-wrap">
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
                                onClick={() =>
                                  navigator.clipboard.writeText(c.code)
                                }
                                title="Copy code"
                              >
                                <i className="bi bi-copy" />
                              </button>
                            </div>

                            <div className="small text-muted mt-1">
                              {c.description}
                            </div>
                          </td>

                          <td>
                            <div className="fw-bold">
                              {c.type === "percent"
                                ? `${c.value}%`
                                : `${currency} ${c.value}`}
                            </div>
                            <div className="small text-muted">
                              {c.type === "percent" ? "OFF" : "FLAT"}
                            </div>
                          </td>

                          <td>
                            <div className="small">
                              {new Date(c.validFrom).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "2-digit",
                                }
                              )}
                            </div>
                            <div className="small text-muted">
                              {new Date(c.validTo).toLocaleDateString("en-US", {
                                month: "short",
                                day: "2-digit",
                              })}
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

                    {pageRows.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <div className="empty-state">No coupons found.</div>
                        </td>
                      </tr>
                    ) : null}
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
  );
}
