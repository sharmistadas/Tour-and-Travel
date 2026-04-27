import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Star,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Filter,
  CheckCircle2,
  Plus,
  X,
  Trash2,
  Upload,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "../styles/Packages.css";
import api from "../utils/api";

const emptyForm = {
  title: "",
  destination: "",
  durationDays: "",
  durationNights: "",
  price: "",
  maxPerson: "",
  thumbnailImage: "",
  description: "",
  includes: "",
  excludes: "",
  category: "Adventure",
};

const Packages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // -----------------------------
  // AUTHENTICATION
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  /* ----- API DATA ----- */
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ─── Handle global search navigation ───
  const searchIdHandled = useRef(false);
  useEffect(() => {
    const searchId = searchParams.get("searchId");
    const searchQuery = searchParams.get("searchQuery");
    if (searchId && !searchIdHandled.current) {
      searchIdHandled.current = true;
      if (searchQuery) setSearchTerm(searchQuery);
      const fetchSearchedPackage = async () => {
        try {
          const res = await api.get("/packages");
          if (res.data.success) {
            const allPkgs = res.data.data || [];
            setPackages(allPkgs);
            const found = allPkgs.find((p) => p._id === searchId);
            if (found) {
              setSelectedPackage(found);
            } else if (allPkgs.length > 0) {
              setSelectedPackage(allPkgs[0]);
            }
          }
        } catch (err) {
          console.error("Failed to fetch searched package:", err);
        }
      };
      fetchSearchedPackage();
      searchParams.delete("searchId");
      searchParams.delete("searchQuery");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(emptyForm);
  const [schedule, setSchedule] = useState([{ dayNumber: 1, title: "", description: "" }]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [flash, setFlash] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const showFlash = (msg) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 3000);
  };

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all");

  // --- FETCHING ---
  const selectedPkgRef = useRef(null);
  selectedPkgRef.current = selectedPackage;

  const fetchPackages = useCallback(
    async (s = searchTerm) => {
      setLoading(true);
      try {
        let res;
        if (s) {
          res = await api.get(`/search?keyword=${s}`);
        } else {
          res = await api.get("/packages");
        }
        if (res.data.success) {
          const pkgs = res.data.data || [];
          setPackages(pkgs);
          if (!selectedPkgRef.current && pkgs.length > 0) {
            setSelectedPackage(pkgs[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        showFlash("Failed to load packages");
      } finally {
        setLoading(false);
      }
    },
    [searchTerm],
  );

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // ✅ FIXED handleRefresh — clears data and re-fetches, no page reload
  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Clear all current data immediately so UI shows loading state
    setPackages([]);
    setSelectedPackage(null);
    setSearchTerm("");
    setPriceFilter("all");
    setShowFilters(false);

    try {
      // Re-fetch all packages fresh from API with empty search
      const res = await api.get("/packages");
      if (res.data.success) {
        const pkgs = res.data.data || [];
        setPackages(pkgs);
        if (pkgs.length > 0) setSelectedPackage(pkgs[0]);
      }
    } catch (err) {
      console.error("Refresh failed:", err);
      showFlash("Refresh failed");
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchCheapest = async () => {
    setLoading(true);
    try {
      const res = await api.get("/search/cheapest");
      if (res.data.success) {
        setPackages(res.data.data || []);
        showFlash("Showing top 5 cheapest packages");
      }
    } catch (err) {
      showFlash("Failed to fetch cheapest packages");
    } finally {
      setLoading(false);
    }
  };

  // --- FILTERING (Local for Price) ---
  const filtered = packages.filter((p) => {
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "budget" && p.price < 1500) ||
      (priceFilter === "mid" && p.price >= 1500 && p.price < 2500) ||
      (priceFilter === "luxury" && p.price >= 2500);
    return matchesPrice;
  });

  // --- MODAL HELPERS ---
  const openAddModal = () => {
    setModalMode("add");
    setFormData(emptyForm);
    setSchedule([{ dayNumber: 1, title: "", description: "" }]);
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = () => {
    setModalMode("edit");
    setFormData({
      title: selectedPackage.title,
      destination: selectedPackage.destination,
      durationDays: selectedPackage.durationDays,
      durationNights: selectedPackage.durationNights,
      price: selectedPackage.price,
      maxPerson: selectedPackage.maxPerson,
      thumbnailImage: selectedPackage.thumbnailImage,
      description: selectedPackage.description,
      category: selectedPackage.category || "Adventure",
      includes: (selectedPackage.includes || []).join("\n"),
      excludes: (selectedPackage.excludes || []).join("\n"),
    });
    setSchedule(
      selectedPackage.travelPlans?.length > 0
        ? selectedPackage.travelPlans
        : selectedPackage.tripSchedule?.length > 0
          ? selectedPackage.tripSchedule
          : [{ dayNumber: 1, title: "", description: "" }],
    );
    setImagePreview(selectedPackage.thumbnailImage);
    setShowModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, thumbnailImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], [field]: value };
    setSchedule(updated);
  };

  const addScheduleItem = () => {
    const nextDay = schedule.length > 0 ? Math.max(...schedule.map((s) => s.dayNumber)) + 1 : 1;
    setSchedule([...schedule, { dayNumber: nextDay, title: "", description: "" }]);
  };

  const removeScheduleItem = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      alert("Please fill in at least Title and Destination");
      return;
    }

    const includesArr = (formData.includes || "").split("\n").map((s) => s.trim()).filter(Boolean);
    const excludesArr = (formData.excludes || "").split("\n").map((s) => s.trim()).filter(Boolean);
    const cleanSchedule = schedule.filter((s) => s.title.trim() || s.description.trim());

    const payload = {
      title: formData.title,
      destination: formData.destination,
      durationDays: parseInt(formData.durationDays, 10) || 1,
      durationNights: parseInt(formData.durationNights, 10) || 0,
      price: parseInt(formData.price, 10) || 0,
      maxPerson: parseInt(formData.maxPerson, 10) || 1,
      thumbnailImage: formData.thumbnailImage || imagePreview,
      description: formData.description,
      category: formData.category,
      includes: includesArr,
      excludes: excludesArr,
      travelPlans: cleanSchedule,
    };

    try {
      if (modalMode === "add") {
        const res = await api.post("/packages/create", payload);
        if (res.data.success) {
          showFlash("Package created!");
          fetchPackages();
          setShowModal(false);
        }
      } else {
        const res = await api.put(`/packages/${selectedPackage._id}`, payload);
        if (res.data.success) {
          showFlash("Package updated!");
          const updatedPkg = res.data.data;
          setPackages((prev) => prev.map((p) => (p._id === updatedPkg._id ? updatedPkg : p)));
          setSelectedPackage(updatedPkg);
          setShowModal(false);
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save package");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${selectedPackage.title}"?`)) return;
    try {
      const res = await api.delete(`/packages/${selectedPackage._id}`);
      if (res.data.success) {
        showFlash("Package deleted");
        const updated = packages.filter((p) => p._id !== selectedPackage._id);
        setPackages(updated);
        setSelectedPackage(updated.length > 0 ? updated[0] : null);
        setShowModal(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete package");
    }
  };

  return (
    <div
      className="packages-main-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
        background: "#F4F7FE",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* ✅ Refresh Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button
          type="button"
          className={`admin-refresh-btn ${isRefreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh packages"
          style={{ position: "relative", top: "auto", right: "auto", zIndex: 1 }}
        >
          <span className={`rfr-icon ${isRefreshing ? "spin" : ""}`}>&#x21BB;</span>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {flash && <div className="svc-flash">{flash}</div>}

      <div
        className="packages-page-container"
        style={{ flex: 1, minHeight: 0, height: "100%", padding: 0 }}
      >
        {/* --- COLUMN 1: SIDEBAR LIST --- */}
        <div className="packages-sidebar">
          <div className="sidebar-search">
            <input
              type="text"
              placeholder="Search package..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} />
            </button>
          </div>

          {showFilters && (
            <div className="filter-dropdown">
              <div className="filter-group">
                <label>Price Range</label>
                <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (&lt; $1,500)</option>
                  <option value="mid">Mid ($1,500 – $2,500)</option>
                  <option value="luxury">Luxury (&gt; $2,500)</option>
                </select>
              </div>
              <button className="cheapest-btn" onClick={fetchCheapest}>Top 5 Cheapest</button>
            </div>
          )}

          <div className="packages-list">
            {loading ? (
              <div className="sidebar-loading">Loading...</div>
            ) : (
              filtered.map((pkg) => (
                <div
                  key={pkg._id}
                  className={`package-list-item ${selectedPackage?._id === pkg._id ? "active" : ""}`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <img src={pkg.thumbnailImage} alt={pkg.title} />
                  <div className="pkg-info">
                    <h4>{pkg.title}</h4>
                    <div className="pkg-meta">
                      <span><MapPin size={10} /> {pkg.destination}</span>
                      <span><Clock size={10} /> {pkg.durationDays}D / {pkg.durationNights}N</span>
                    </div>
                    <div className="pkg-footer">
                      <div className="rating">
                        <Star size={12} fill="#FACC15" stroke="none" /> <span>{pkg.rating || "0.0"}</span>
                      </div>
                      <div className="price">
                        <span>${pkg.price?.toLocaleString()}</span>/pp
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {!loading && filtered.length === 0 && (
              <div className="empty-sidebar">No packages found</div>
            )}
          </div>

          <button className="add-package-btn" onClick={openAddModal}>
            <Plus size={18} /> Add Package
          </button>
        </div>

        {/* --- COLUMN 2: DETAILS VIEW --- */}
        <div className="package-details">
          {selectedPackage ? (
            <>
              <div className="hero-image-wrapper">
                <img src={selectedPackage.thumbnailImage} alt={selectedPackage.title} className="hero-image" />
              </div>
              <div className="details-header">
                <div>
                  <h2>{selectedPackage.title}</h2>
                  <div className="rating-row">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(selectedPackage.rating || 0) ? "#FACC15" : "#E5E7EB"} stroke="none" />
                    ))}
                    <span className="rating-val">{selectedPackage.rating || "0.0"}</span>
                    <span className="category-tag">{selectedPackage.category}</span>
                  </div>
                </div>
                <button className="edit-btn" onClick={openEditModal}>Edit Package</button>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="icon"><MapPin size={16} /></span>
                  <span className="label">Destination</span>
                  <span className="val">{selectedPackage.destination}</span>
                </div>
                <div className="info-item">
                  <span className="icon"><Clock size={16} /></span>
                  <span className="label">Duration</span>
                  <span className="val">{selectedPackage.durationDays}D / {selectedPackage.durationNights}N</span>
                </div>
                <div className="info-item">
                  <span className="icon"><Users size={16} /></span>
                  <span className="label">Quota</span>
                  <span className="val">{selectedPackage.maxPerson} pax</span>
                </div>
                <div className="info-item">
                  <span className="icon"><DollarSign size={16} /></span>
                  <span className="label">Price</span>
                  <span className="val price-val text-blue">${selectedPackage.price} <span className="text-gray">per person</span></span>
                </div>
              </div>
              <div className="section">
                <h5>ABOUT</h5>
                <p className="description-text">{selectedPackage.description}</p>
              </div>
              <div className="inclusion-row">
                <div className="section half">
                  <h5>INCLUDES</h5>
                  <div className="includes-grid">
                    {(selectedPackage.includes || []).map((inc, i) => (
                      <div key={i} className="include-item">
                        <CheckCircle2 size={16} className="check-icon green" /><span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="section half">
                  <h5>EXCLUDES</h5>
                  <div className="includes-grid">
                    {(selectedPackage.excludes || []).map((exc, i) => (
                      <div key={i} className="include-item">
                        <X size={16} className="check-icon red" /><span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection-state">
              {loading ? "Loading details..." : "Select a package to view details"}
            </div>
          )}
        </div>

        {/* --- COLUMN 3: TRIP SCHEDULE --- */}
        <div className="trip-schedule">
          <h3>Trip Schedule</h3>
          <div className="timeline">
            {selectedPackage &&
              (selectedPackage.travelPlans || selectedPackage.tripSchedule || []).map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="day-header">
                      <span className="day-num">Day {item.dayNumber || item.day || i + 1}</span>
                      <span className="separator">-</span>
                      <span className="day-title">{item.title}</span>
                    </div>
                    <div className="day-body"><p>{item.description}</p></div>
                  </div>
                </div>
              ))}
            {(!selectedPackage || (!selectedPackage.travelPlans?.length && !selectedPackage.tripSchedule?.length)) && (
              <div className="empty-schedule">No schedule added</div>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL (ADD / EDIT) --- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === "add" ? "Add New Package" : `Edit: ${formData.title}`}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-sections-wrapper">
                <div className="modal-section-main">
                  <div className="form-grid">
                    <div className="form-group span-2">
                      <label>Package Title*</label>
                      <input name="title" value={formData.title} onChange={handleFormChange} placeholder="e.g. Alpine Escape" required />
                    </div>
                    <div className="form-group span-2">
                      <label>Destination*</label>
                      <input name="destination" value={formData.destination} onChange={handleFormChange} placeholder="e.g. Swiss Alps" required />
                    </div>
                    <div className="form-group">
                      <label>Days</label>
                      <input name="durationDays" type="number" value={formData.durationDays} onChange={handleFormChange} placeholder="6" />
                    </div>
                    <div className="form-group">
                      <label>Nights</label>
                      <input name="durationNights" type="number" value={formData.durationNights} onChange={handleFormChange} placeholder="5" />
                    </div>
                    <div className="form-group">
                      <label>Price ($)</label>
                      <input name="price" type="number" value={formData.price} onChange={handleFormChange} placeholder="1500" />
                    </div>
                    <div className="form-group">
                      <label>Capacity</label>
                      <input name="maxPerson" type="number" value={formData.maxPerson} onChange={handleFormChange} placeholder="12" />
                    </div>
                    <div className="form-group span-2">
                      <label>Category</label>
                      <select name="category" value={formData.category} onChange={handleFormChange}>
                        <option>Adventure</option>
                        <option>Family</option>
                        <option>Honeymoon</option>
                        <option>Luxury</option>
                        <option>Budget</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Thumbnail Image</label>
                    <div className="image-dropzone" onClick={() => fileInputRef.current.click()}>
                      {imagePreview ? (
                        <img src={imagePreview} className="dropzone-preview" alt="Preview" />
                      ) : (
                        <div className="dropzone-placeholder">
                          <Upload size={24} /><span>Click to upload thumbnail</span>
                        </div>
                      )}
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleFormChange} rows={3} placeholder="Describe the trip experience..." />
                  </div>

                  <div className="form-row">
                    <div className="form-group half">
                      <label>Includes (one per line)</label>
                      <textarea name="includes" value={formData.includes} onChange={handleFormChange} rows={4} placeholder={"Hotel\nMeals"} />
                    </div>
                    <div className="form-group half">
                      <label>Excludes (one per line)</label>
                      <textarea name="excludes" value={formData.excludes} onChange={handleFormChange} rows={4} placeholder={"Flight\nInsurance"} />
                    </div>
                  </div>
                </div>

                <div className="modal-section-schedule">
                  <div className="schedule-header-row">
                    <h4>Trip Schedule</h4>
                    <button type="button" className="add-day-btn" onClick={addScheduleItem}>+ Add Day</button>
                  </div>
                  <div className="schedule-list-edit">
                    {schedule.map((item, index) => (
                      <div key={index} className="schedule-edit-card">
                        <div className="card-header">
                          <div className="day-pill">Day {item.dayNumber}</div>
                          <button type="button" className="remove-day-btn" onClick={() => removeScheduleItem(index)}><X size={14} /></button>
                        </div>
                        <div className="card-body">
                          <input className="schedule-title-input" value={item.title} onChange={(e) => handleScheduleChange(index, "title", e.target.value)} placeholder="Title (e.g. Arrival)" />
                          <textarea className="schedule-desc-textarea" value={item.description} onChange={(e) => handleScheduleChange(index, "description", e.target.value)} placeholder="Details..." rows={2} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {modalMode === "edit" && (
                  <button type="button" className="delete-pkg-btn" onClick={handleDelete}>
                    <Trash2 size={16} /> Delete
                  </button>
                )}
                <div className="footer-right">
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="save-btn">
                    {modalMode === "add" ? "Create Package" : "Update Package"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;