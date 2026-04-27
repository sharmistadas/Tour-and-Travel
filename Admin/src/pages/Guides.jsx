import { useState, useEffect, useCallback } from "react";
import {
  FiMessageCircle,
  FiPhone,
  FiBriefcase,
  FiTrendingUp,
  FiUser,
  FiCheckCircle,
  FiX,
  FiUpload,
  FiImage,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { BsPatchCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Guides.css";

function Guides() {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [newGuide, setNewGuide] = useState({
    name: "", email: "", phone: "", title: "", experienceYears: "",
    level: "Junior", jobType: "Full Time", status: "Active", skills: []
  });

  const [editGuide, setEditGuide] = useState({
    _id: "", name: "", email: "", phone: "", title: "", experienceYears: "",
    level: "Junior", jobType: "Full Time", status: "Active", skills: []
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/login");
  }, [navigate]);

  // ─── Core fetch function (takes explicit params — no stale state) ───
  const fetchGuidesCore = useCallback(async (page, searchTerm, role) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        level: role !== "All Roles" ? role : undefined
      };
      const res = await api.get("/guides", { params });
      const fetched = res.data.guides || [];
      setGuides(fetched);
      setTotalItems(res.data.total || 0);
      return fetched;
    } catch (err) {
      console.error("Failed to fetch guides:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  // Sync selected guide when list updates
  useEffect(() => {
    if (!loading && guides.length > 0) {
      if (!selectedGuide) {
        setSelectedGuide(guides[0]);
      } else {
        const updated = guides.find(g => g._id === selectedGuide._id);
        if (updated) setSelectedGuide(updated);
      }
    }
  }, [guides, loading]);

  // Reactive fetch on page/search/role change
  useEffect(() => {
    fetchGuidesCore(currentPage, search, selectedRole);
  }, [currentPage, search, selectedRole, fetchGuidesCore]);

  // ✅ FIXED handleRefresh — clears all data and re-fetches, no page reload
  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Clear all data immediately so UI shows loading/empty state
    setGuides([]);
    setSelectedGuide(null);
    setTotalItems(0);

    // Reset all filters
    setSearch("");
    setSelectedRole("All Roles");
    setCurrentPage(1);
    setShowRoles(false);

    try {
      // Fetch with explicit reset values (bypass stale state)
      const fetched = await fetchGuidesCore(1, "", "All Roles");
      if (fetched.length > 0) setSelectedGuide(fetched[0]);
    } catch (err) {
      console.error("Refresh failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const roles = ["All Roles", "Junior", "Mid", "Senior"];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = guides;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;
      if (start > 2) pageNumbers.push('...');
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) pageNumbers.push(i);
      }
      if (end < totalPages - 1) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert("Image size must be less than 5MB"); return; }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const handleAddGuide = async (e) => {
    e.preventDefault();
    if (!newGuide.name || !newGuide.email || !newGuide.phone || !newGuide.title) {
      alert("Required fields: Name, Email, Phone, Title");
      return;
    }
    const formData = new FormData();
    formData.append("name", newGuide.name);
    formData.append("email", newGuide.email);
    formData.append("phone", newGuide.phone);
    formData.append("title", newGuide.title);
    formData.append("experienceYears", newGuide.experienceYears || "0");
    formData.append("level", newGuide.level);
    formData.append("jobType", newGuide.jobType);
    formData.append("status", newGuide.status);
    formData.append("skills", JSON.stringify(newGuide.skills));
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await api.post("/guides", formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.success) {
        alert("Guide created successfully!");
        setShowModal(false);
        setNewGuide({ name: "", email: "", phone: "", title: "", experienceYears: "", level: "Junior", jobType: "Full Time", status: "Active", skills: [] });
        setAvatarFile(null);
        setAvatarPreview("");
        fetchGuidesCore(currentPage, search, selectedRole);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create guide");
    }
  };

  const handleEditClick = () => {
    setEditGuide({
      _id: selectedGuide._id,
      name: selectedGuide.name,
      email: selectedGuide.email,
      phone: selectedGuide.phone,
      title: selectedGuide.title,
      experienceYears: selectedGuide.experienceYears || "",
      level: selectedGuide.level || "Junior",
      jobType: selectedGuide.jobType || "Full Time",
      status: selectedGuide.status || "Active",
      skills: selectedGuide.skills || []
    });
    setAvatarPreview(selectedGuide.avatar?.url || "");
    setAvatarFile(null);
    setShowEditModal(true);
  };

  const handleUpdateGuide = async (e) => {
    e.preventDefault();
    if (!editGuide.name || !editGuide.phone || !editGuide.title) {
      alert("Required fields: Name, Phone, Title");
      return;
    }
    const formData = new FormData();
    formData.append("name", editGuide.name);
    formData.append("email", editGuide.email);
    formData.append("phone", editGuide.phone);
    formData.append("title", editGuide.title);
    formData.append("experienceYears", editGuide.experienceYears || "0");
    formData.append("level", editGuide.level);
    formData.append("jobType", editGuide.jobType);
    formData.append("status", editGuide.status);
    formData.append("skills", JSON.stringify(editGuide.skills));
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await api.put(`/guides/${editGuide._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (res.data.success) {
        alert("Guide updated successfully!");
        setShowEditModal(false);
        setAvatarFile(null);
        setAvatarPreview("");
        fetchGuidesCore(currentPage, search, selectedRole);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update guide");
    }
  };

  const handleDeleteGuide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;
    try {
      const res = await api.delete(`/guides/${id}`);
      alert(res.data.message || "Guide deleted successfully");
      if (selectedGuide?._id === id) setSelectedGuide(null);
      fetchGuidesCore(currentPage, search, selectedRole);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete guide");
    }
  };

  const handleSkillChange = (isEdit, index, value) => {
    if (isEdit) {
      const updated = [...editGuide.skills];
      updated[index] = value;
      setEditGuide({ ...editGuide, skills: updated });
    } else {
      const updated = [...newGuide.skills];
      updated[index] = value;
      setNewGuide({ ...newGuide, skills: updated });
    }
  };

  const addSkill = (isEdit) => {
    if (isEdit) setEditGuide({ ...editGuide, skills: [...editGuide.skills, ""] });
    else setNewGuide({ ...newGuide, skills: [...newGuide.skills, ""] });
  };

  const removeSkill = (isEdit, index) => {
    if (isEdit) setEditGuide({ ...editGuide, skills: editGuide.skills.filter((_, i) => i !== index) });
    else setNewGuide({ ...newGuide, skills: newGuide.skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="guides-main-wrapper" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 70px)", background: "#F5F7FB", padding: "24px", boxSizing: "border-box" }}>

      {/* ✅ Fixed Refresh Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button
          type="button"
          className={`admin-refresh-btn ${isRefreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          title="Refresh guides"
          style={{ position: "relative", top: "auto", right: "auto", zIndex: 1 }}
        >
          <span className={`rfr-icon ${isRefreshing ? "spin" : ""}`}>&#x21BB;</span>
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="guides-wrapper" style={{ flex: 1, minHeight: 0, padding: 0 }}>
        <div className="guides-card">
          <div className="guides-header">
            <h2>Guides Management</h2>
            <div className="guides-controls">
              <input
                placeholder="Search guides..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
              <div className="role-dropdown">
                <button className="role-btn" onClick={() => setShowRoles(!showRoles)}>
                  {selectedRole} <span className={`arrow ${showRoles ? "up" : ""}`}>▼</span>
                </button>
                {showRoles && (
                  <div className="roles-menu">
                    {roles.map(role => (
                      <div key={role} className="role-item" onClick={() => { setSelectedRole(role); setShowRoles(false); setCurrentPage(1); }}>
                        {role}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="add-btn" onClick={() => { setShowModal(true); setAvatarPreview(""); setAvatarFile(null); }}>
                <FiUpload /> Add Guide
              </button>
            </div>
          </div>

          <div className="guides-list">
            {loading ? (
              <div className="loading-state">Loading...</div>
            ) : currentItems.length > 0 ? (
              currentItems.map(guide => (
                <div
                  key={guide._id}
                  className={`guide-row ${selectedGuide?._id === guide._id ? "active" : ""}`}
                  onClick={() => setSelectedGuide(guide)}
                >
                  <img src={guide.avatar?.url || "https://randomuser.me/api/portraits/lego/1.jpg"} alt={guide.name} />
                  <div className="guide-text">
                    <h4>{guide.name}</h4>
                    <span>{guide.email}</span>
                    <span>{guide.phone}</span>
                  </div>
                  <div className="role-pill">{guide.title}</div>
                  <button className="delete-row-btn" onClick={(e) => { e.stopPropagation(); handleDeleteGuide(guide._id); }}>
                    <FiTrash2 />
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-list">No guides found.</div>
            )}
          </div>

          <div className="pagination">
            <div className="showing">
              Showing <span>{currentItems.length}</span> out of {totalItems}
            </div>
            <div className="pages">
              <button className="page-nav" onClick={prevPage} disabled={currentPage === 1}><FiChevronLeft /></button>
              {getPageNumbers().map((p, idx) => (
                p === "..." ? <span key={idx} className="ellipsis">...</span> :
                  <button key={p} onClick={() => paginate(p)} className={`page-number ${currentPage === p ? "active" : ""}`}>{p}</button>
              ))}
              <button className="page-nav" onClick={nextPage} disabled={currentPage === totalPages}><FiChevronRight /></button>
            </div>
          </div>
        </div>

        <div className="guide-details">
          {selectedGuide ? (
            <>
              <div className="details-banner"></div>
              <div className="details-body">
                <div className="profile-top">
                  <img src={selectedGuide.avatar?.url || "https://randomuser.me/api/portraits/lego/1.jpg"} className="details-avatar" alt={selectedGuide.name} />
                  <div className="profile-info">
                    <h2>{selectedGuide.name}</h2>
                    <p>{selectedGuide.title}</p>
                  </div>
                  <div className="profile-actions">
                    <button className="icon-btn"><FiMessageCircle size={18} /></button>
                    <button className="icon-btn blue"><FiPhone size={18} /></button>
                  </div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon"><FiBriefcase /></div>
                    <div><p>Experience</p><strong>{selectedGuide.experienceYears || 0} yrs</strong></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><FiTrendingUp /></div>
                    <div><p>Level</p><strong>{selectedGuide.level}</strong></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><FiUser /></div>
                    <div><p>Job Type</p><strong>{selectedGuide.jobType}</strong></div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><FiCheckCircle /></div>
                    <div><p>Status</p><strong>{selectedGuide.status}</strong></div>
                  </div>
                </div>

                <div className="skills-section">
                  <h3>Skills</h3>
                  <ul className="skills-list">
                    {selectedGuide.skills?.length > 0
                      ? selectedGuide.skills.map((s, i) => <li key={i}><BsPatchCheckFill className="tick" /> {s}</li>)
                      : <li>No skills listed</li>}
                  </ul>
                </div>

                <button className="edit-profile" onClick={handleEditClick}>Edit Profile</button>
              </div>
            </>
          ) : (
            <div className="no-selection">Select a guide to view details</div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Guide</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label>Name*</label><input value={newGuide.name} onChange={e => setNewGuide({ ...newGuide, name: e.target.value })} placeholder="Full Name" /></div>
              <div className="form-group"><label>Email*</label><input value={newGuide.email} onChange={e => setNewGuide({ ...newGuide, email: e.target.value })} placeholder="email@example.com" /></div>
              <div className="form-group"><label>Phone*</label><input value={newGuide.phone} onChange={e => setNewGuide({ ...newGuide, phone: e.target.value })} placeholder="+1 234 567 890" /></div>
              <div className="form-group"><label>Title*</label><input value={newGuide.title} onChange={e => setNewGuide({ ...newGuide, title: e.target.value })} placeholder="e.g. Senior Trekking Guide" /></div>
              <div className="form-row">
                <div className="form-group"><label>Experience (Years)</label><input type="number" value={newGuide.experienceYears} onChange={e => setNewGuide({ ...newGuide, experienceYears: e.target.value })} /></div>
                <div className="form-group">
                  <label>Level</label>
                  <select value={newGuide.level} onChange={e => setNewGuide({ ...newGuide, level: e.target.value })}>
                    <option value="Junior">Junior</option><option value="Mid">Mid</option><option value="Senior">Senior</option>
                  </select>
                </div>
              </div>
              <div className="upload-group">
                <label>Profile Image</label>
                <div className="upload-container">
                  {avatarPreview ? (
                    <div className="image-preview">
                      <img src={avatarPreview} className="preview-img" alt="Avatar preview" />
                      <button className="remove-image-btn" onClick={handleRemoveImage}><FiX /></button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FiImage className="upload-icon" /><p>No image selected</p>
                    </div>
                  )}
                  <label className="upload-btn">
                    <FiUpload /> Choose Image
                    <input type="file" onChange={handleImageUpload} accept="image/*" style={{ display: "none" }} />
                  </label>
                </div>
              </div>
              <div className="edit-section">
                <div className="section-header">
                  <h4>Skills</h4>
                  <button className="add-item-btn" onClick={() => addSkill(false)}>+ Add Skill</button>
                </div>
                {newGuide.skills.map((s, i) => (
                  <div key={i} className="skill-edit-row">
                    <input className="skill-input" value={s} onChange={e => handleSkillChange(false, i, e.target.value)} placeholder="e.g. First Aid" />
                    <button className="remove-item-btn" onClick={() => removeSkill(false, i)}>×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-btn add" onClick={handleAddGuide}>Create Guide</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content edit-modal">
            <div className="modal-header">
              <h3>Edit Guide Profile</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}><FiX /></button>
            </div>
            <div className="modal-body edit-modal-body">
              <div className="edit-section">
                <h4>Personal Information</h4>
                <div className="form-group"><label>Name*</label><input value={editGuide.name} onChange={e => setEditGuide({ ...editGuide, name: e.target.value })} /></div>
                <div className="form-row">
                  <div className="form-group"><label>Phone*</label><input value={editGuide.phone} onChange={e => setEditGuide({ ...editGuide, phone: e.target.value })} /></div>
                  <div className="form-group"><label>Title*</label><input value={editGuide.title} onChange={e => setEditGuide({ ...editGuide, title: e.target.value })} /></div>
                </div>
              </div>
              <div className="edit-section">
                <h4>Professional Details</h4>
                <div className="form-row">
                  <div className="form-group"><label>Experience (Years)</label><input type="number" value={editGuide.experienceYears} onChange={e => setEditGuide({ ...editGuide, experienceYears: e.target.value })} /></div>
                  <div className="form-group">
                    <label>Level</label>
                    <select value={editGuide.level} onChange={e => setEditGuide({ ...editGuide, level: e.target.value })}>
                      <option value="Junior">Junior</option><option value="Mid">Mid</option><option value="Senior">Senior</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Type</label>
                    <select value={editGuide.jobType} onChange={e => setEditGuide({ ...editGuide, jobType: e.target.value })}>
                      <option value="Full Time">Full Time</option><option value="Part Time">Part Time</option><option value="Contract">Contract</option><option value="Seasonal">Seasonal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select value={editGuide.status} onChange={e => setEditGuide({ ...editGuide, status: e.target.value })}>
                      <option value="Active">Active</option><option value="Inactive">Inactive</option><option value="On Leave">On Leave</option><option value="Training">Training</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="edit-section">
                <h4>Profile Image</h4>
                <div className="upload-container">
                  {avatarPreview ? (
                    <div className="image-preview">
                      <img src={avatarPreview} className="preview-img" alt="Avatar preview" />
                      <button className="remove-image-btn" onClick={handleRemoveImage}><FiX /></button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FiImage className="upload-icon" /><p>No image selected</p>
                    </div>
                  )}
                  <label className="upload-btn">
                    <FiUpload /> Change Image
                    <input type="file" onChange={handleImageUpload} accept="image/*" style={{ display: "none" }} />
                  </label>
                </div>
              </div>
              <div className="edit-section">
                <div className="section-header">
                  <h4>Skills</h4>
                  <button className="add-item-btn" onClick={() => addSkill(true)}>+ Add Skill</button>
                </div>
                {editGuide.skills.map((s, i) => (
                  <div key={i} className="skill-edit-row">
                    <input className="skill-input" value={s} onChange={e => handleSkillChange(true, i, e.target.value)} />
                    <button className="remove-item-btn" onClick={() => removeSkill(true, i)}>×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="modal-btn add" onClick={handleUpdateGuide}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Guides;