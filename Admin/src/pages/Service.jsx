import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FiImage, FiEdit3, FiTrash2, FiPlus, FiX,
  FiGlobe, FiDollarSign, FiHeadphones, FiCheck,
  FiStar, FiPhone, FiClock, FiSend, FiUpload,
  FiGrid, FiAward, FiMail, FiMessageSquare,
  FiPlay, FiCompass, FiUsers, FiShield, FiSave,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/Service.css";
import api from "../utils/api";

/* ─── icon map ─── */
const ICONS = {
  globe: <FiGlobe />, dollar: <FiDollarSign />, headphones: <FiHeadphones />,
  check: <FiCheck />, compass: <FiCompass />, users: <FiUsers />,
  shield: <FiShield />, star: <FiStar />, grid: <FiGrid />, award: <FiAward />,
};
const ICON_KEYS = Object.keys(ICONS);

/* ─── empty defaults ─── */
const EMPTY_DATA = {
  banner: { title: "", subtitle: "", bgUrl: "" },
  intros: [],
  features: [],
  experience: { heading: "", desc: "", ctaText: "", bullets: [], images: [] },
};

/* ═══════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════ */
export default function Service() {
  const navigate = useNavigate();
  const [data, setData] = useState(EMPTY_DATA);

  // -----------------------------
  // AUTHENTICATION
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const [tab, setTab] = useState("banner");
  const [toast, setToast] = useState(null);
  const [bannerId, setBannerId] = useState(null);
  const [experienceId, setExperienceId] = useState(null);
  const [saving, setSaving] = useState(false);

  /* ── modal state ── */
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  /* ── file state ── */
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [introFile, setIntroFile] = useState(null);
  const [introPreview, setIntroPreview] = useState("");
  const [expFiles, setExpFiles] = useState([]); // array of { file, preview }
  const bannerInputRef = useRef(null);
  const introInputRef = useRef(null);
  const expInputRefs = useRef([]);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const f = (k) => form[k] || "";
  const fSet = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  /* ── file helpers ── */
  const handleFileSelect = (file, setFile, setPreview) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      flash("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      flash("Please select an image file");
      return;
    }
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  /* ── API fetch helpers ── */
  const fetchFeatures = useCallback(async () => {
    try {
      const res = await api.get("/services/services");
      const items = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setData(d => ({ ...d, features: items.map(s => ({ id: s._id || s.id, icon: s.icon || "globe", title: s.title || "", text: s.text || s.description || "" })) }));
    } catch (err) { console.error("Failed to fetch services:", err); }
  }, []);

  const fetchIntros = useCallback(async () => {
    try {
      const res = await api.get("/services/info-pages");
      const items = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setData(d => ({ ...d, intros: items.map(p => ({ id: p._id || p.id, tag: p.tag || "", heading: p.heading || p.title || "", desc: p.desc || p.description || "", ctaText: p.ctaText || p.buttonText || "", imgUrl: p.imgUrl || p.image || "" })) }));
    } catch (err) { console.error("Failed to fetch info-pages:", err); }
  }, []);

  const fetchBanner = useCallback(async () => {
    try {
      const res = await api.get("/services/pages");
      const items = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      if (items.length > 0) {
        const b = items[0];
        setBannerId(b._id || b.id);
        const bgUrl = b.bgUrl || b.image || b.backgroundImage || "";
        setData(d => ({ ...d, banner: { title: b.title || "", subtitle: b.subtitle || b.description || "", bgUrl } }));
        setBannerPreview(bgUrl);
      }
    } catch (err) { console.error("Failed to fetch pages (banner):", err); }
  }, []);

  const fetchExperience = useCallback(async () => {
    try {
      const res = await api.get("/services/multi-pages");
      const items = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      if (items.length > 0) {
        const exp = items[0];
        setExperienceId(exp._id || exp.id);
        const imgs = exp.images || [];
        setData(d => ({
          ...d, experience: {
            heading: exp.heading || exp.title || "", desc: exp.desc || exp.description || "",
            ctaText: exp.ctaText || exp.buttonText || "",
            bullets: (exp.bullets || []).map(bl => ({ id: bl._id || bl.id || Math.random().toString(36).slice(2, 10), icon: bl.icon || "check", text: bl.text || "" })),
            images: imgs,
          }
        }));
        setExpFiles(imgs.map(url => ({ file: null, preview: url })));
      }
    } catch (err) { console.error("Failed to fetch multi-pages:", err); }
  }, []);

  const fetchAll = useCallback(async () => {
    await Promise.all([fetchBanner(), fetchIntros(), fetchFeatures(), fetchExperience()]);
  }, [fetchBanner, fetchIntros, fetchFeatures, fetchExperience]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  /* ── CRUD helpers ── */
  const openAdd = (type) => {
    setForm({});
    setIntroFile(null);
    setIntroPreview("");
    setModal({ type, mode: "add" });
  };
  const openEdit = (type, item) => {
    setForm({ ...item });
    setIntroFile(null);
    setIntroPreview(item.imgUrl || "");
    setModal({ type, mode: "edit", id: item.id });
  };
  const closeModal = () => {
    setModal(null);
    setIntroFile(null);
    setIntroPreview("");
  };

  const saveIntro = async () => {
    if (!f("heading")) return;
    const fd = new FormData();
    fd.append("title", f("heading"));
    fd.append("description", f("desc"));
    if (introFile) {
      fd.append("image", introFile);
    }
    try {
      if (modal.mode === "add") { await api.post("/services/info-pages", fd, { headers: { "Content-Type": "multipart/form-data" } }); }
      else { await api.put(`/services/info-pages/${modal.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } }); }
      closeModal(); flash("Intro saved!"); fetchIntros();
    } catch (err) { flash(err.response?.data?.message || err.response?.data?.error || "Failed to save intro"); }
  };

  const deleteIntro = async (id) => {
    if (!window.confirm("Delete this intro section?")) return;
    try { await api.delete(`/services/info-pages/${id}`); flash("Intro deleted"); fetchIntros(); }
    catch (err) { flash(err.response?.data?.message || "Failed to delete intro"); }
  };

  const saveFeature = async () => {
    if (!f("title")) return;
    const payload = { icon: f("icon") || "globe", title: f("title"), text: f("text"), description: f("text") };
    try {
      if (modal.mode === "add") { await api.post("/services/services", payload); }
      else { await api.put(`/services/services/${modal.id}`, payload); }
      closeModal(); flash("Feature saved!"); fetchFeatures();
    } catch (err) { flash(err.response?.data?.message || "Failed to save feature"); }
  };

  const deleteFeature = async (id) => {
    if (!window.confirm("Delete this feature?")) return;
    try { await api.delete(`/services/services/${id}`); flash("Feature deleted"); fetchFeatures(); }
    catch (err) { flash(err.response?.data?.message || "Failed to delete feature"); }
  };

  const addBullet = () => setData(d => ({ ...d, experience: { ...d.experience, bullets: [...d.experience.bullets, { id: Math.random().toString(36).slice(2, 10), icon: "check", text: "New point" }] } }));
  const updateBullet = (id, patch) => setData(d => ({ ...d, experience: { ...d.experience, bullets: d.experience.bullets.map(b => b.id === id ? { ...b, ...patch } : b) } }));
  const deleteBullet = (id) => setData(d => ({ ...d, experience: { ...d.experience, bullets: d.experience.bullets.filter(b => b.id !== id) } }));

  const saveAll = async () => {
    setSaving(true);
    try {
      /* ── Save Banner via FormData ── */
      const bannerFd = new FormData();
      bannerFd.append("title", data.banner.title);
      bannerFd.append("description", data.banner.subtitle);
      if (bannerFile) {
        bannerFd.append("image", bannerFile);
      }
      if (bannerId) {
        await api.put(`/services/pages/${bannerId}`, bannerFd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        const res = await api.post("/services/pages", bannerFd, { headers: { "Content-Type": "multipart/form-data" } });
        const c = res.data?.data || res.data;
        if (c?._id || c?.id) setBannerId(c._id || c.id);
      }

      /* ── Save Experience via FormData ── */
      const expFd = new FormData();
      expFd.append("title", data.experience.heading);
      expFd.append("description", data.experience.desc);
      // Append image files
      const hasNewFiles = expFiles.some(ef => ef.file !== null);
      if (hasNewFiles) {
        for (const ef of expFiles) {
          if (ef.file) {
            expFd.append("images", ef.file);
          }
        }
      }
      if (experienceId) {
        await api.put(`/services/multi-pages/${experienceId}`, expFd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        const res = await api.post("/services/multi-pages", expFd, { headers: { "Content-Type": "multipart/form-data" } });
        const c = res.data?.data || res.data;
        if (c?._id || c?.id) setExperienceId(c._id || c.id);
      }

      flash("All changes saved!");
      setBannerFile(null);
      fetchAll();
    } catch (err) { flash(err.response?.data?.message || err.response?.data?.error || "Failed to save changes"); }
    finally { setSaving(false); }
  };

  /* ── Experience image helpers ── */
  const addExpImage = () => {
    if (expFiles.length >= 4) {
      flash("Maximum 4 images allowed");
      return;
    }
    setExpFiles(prev => [...prev, { file: null, preview: "" }]);
  };

  const removeExpImage = (index) => {
    if (expFiles.length <= 1) {
      flash("Minimum 1 image required");
      return;
    }
    setExpFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleExpFileSelect = (index, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      flash("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      flash("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setExpFiles(prev => {
        const updated = [...prev];
        updated[index] = { file, preview: reader.result };
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  /* ── tab config ── */
  const TABS = [
    { key: "banner", label: "Banner", icon: <FiImage size={15} /> },
    { key: "content", label: "Content", icon: <FiPlay size={15} /> },
    { key: "experience", label: "Experience", icon: <FiAward size={15} /> },
  ];

  /* ═══════════════════════════════════════
     RENDER
     ═══════════════════════════════════════ */
  return (
    <div className="svc-root">
      {/* ── Header ── */}
      <div className="svc-header">
        <div>
          <h2 className="svc-title">Services Page</h2>
          <p className="svc-subtitle">Manage all sections of your public Services page</p>
        </div>
        <button className="svc-save-btn" onClick={saveAll} disabled={saving}>
          {saving ? <><span className="svc-spinner" /> Saving...</> : <><FiSave size={15} /> Save All Changes</>}
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="svc-tabs">
        {TABS.map(t => (
          <button key={t.key} className={`svc-tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="svc-body">

        {/* ════════ BANNER ════════ */}
        {tab === "banner" && (
          <div className="svc-section">
            <div className="svc-card">
              <div className="svc-card-head">
                <div className="svc-card-icon" style={{ background: "#EEF2FF", color: "#4F46E5" }}><FiImage size={18} /></div>
                <div>
                  <h4>Hero Banner</h4>
                  <p>The top banner visitors see on the Services page</p>
                </div>
              </div>
              <div className="svc-form-grid">
                <div className="svc-field full">
                  <label>Banner Title</label>
                  <input value={data.banner.title} onChange={e => setData(d => ({ ...d, banner: { ...d.banner, title: e.target.value } }))} />
                </div>
                <div className="svc-field full">
                  <label>Banner Subtitle</label>
                  <input value={data.banner.subtitle} onChange={e => setData(d => ({ ...d, banner: { ...d.banner, subtitle: e.target.value } }))} />
                </div>
                <div className="svc-field full">
                  <label>Background Image</label>
                  <div
                    className="svc-upload-zone"
                    onClick={() => bannerInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
                    onDragLeave={e => e.currentTarget.classList.remove("dragover")}
                    onDrop={e => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("dragover");
                      const file = e.dataTransfer.files[0];
                      handleFileSelect(file, setBannerFile, setBannerPreview);
                    }}
                  >
                    {bannerPreview ? (
                      <div className="svc-upload-preview">
                        <img src={bannerPreview} alt="Banner preview" />
                        <div className="svc-upload-preview-overlay">
                          <span>Click to change</span>
                        </div>
                        <button
                          className="svc-upload-remove"
                          onClick={e => {
                            e.stopPropagation();
                            setBannerFile(null);
                            setBannerPreview("");
                            setData(d => ({ ...d, banner: { ...d.banner, bgUrl: "" } }));
                          }}
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="svc-upload-placeholder">
                        <FiUpload size={24} />
                        <p>Click or drag image here to upload</p>
                        <span>Supports JPG, PNG, WEBP (Max 5MB)</span>
                      </div>
                    )}
                    <input
                      ref={bannerInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files[0], setBannerFile, setBannerPreview)}
                    />
                  </div>
                </div>
              </div>
              {/* Preview */}
              <div className="svc-banner-preview" style={{ backgroundImage: bannerPreview ? `url(${bannerPreview})` : "linear-gradient(135deg,#1e293b,#334155)" }}>
                <div className="svc-banner-overlay">
                  <h3>{data.banner.title || "Banner Title"}</h3>
                  <p>{data.banner.subtitle || "Banner subtitle"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════ CONTENT (Intros + Features) ════════ */}
        {tab === "content" && (
          <div className="svc-section">
            {/* ── Intro sections ── */}
            <div className="svc-card">
              <div className="svc-card-head">
                <div className="svc-card-icon" style={{ background: "#D1FAE5", color: "#059669" }}><FiPlay size={18} /></div>
                <div>
                  <h4>Intro Sections</h4>
                  <p>Hero content blocks with image, heading, and call-to-action</p>
                </div>
                <button className="svc-add-btn" onClick={() => openAdd("intro")}><FiPlus size={14} /> Add</button>
              </div>

              {data.intros.length === 0 && <div className="svc-empty">No intro sections yet. Click "Add" to create one.</div>}

              <div className="svc-intro-list">
                {data.intros.map(intro => (
                  <div key={intro.id} className="svc-intro-item">
                    <div className="svc-intro-img">
                      <img src={intro.imgUrl || "https://placehold.co/300x200/e2e8f0/64748b?text=No+Image"} alt="" />
                    </div>
                    <div className="svc-intro-body">
                      <span className="svc-tag">{intro.tag || "Tag"}</span>
                      <h5>{intro.heading}</h5>
                      <p>{intro.desc?.slice(0, 120)}...</p>
                      <div className="svc-intro-actions">
                        <button className="svc-btn-cta" disabled>{intro.ctaText || "CTA"}</button>
                        <button className="svc-btn-edit" onClick={() => openEdit("intro", intro)}><FiEdit3 size={14} /> Edit</button>
                        <button className="svc-btn-del" onClick={() => deleteIntro(intro.id)}><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Features ── */}
            <div className="svc-card">
              <div className="svc-card-head">
                <div className="svc-card-icon" style={{ background: "#FEF3C7", color: "#D97706" }}><FiGrid size={18} /></div>
                <div>
                  <h4>Feature Cards</h4>
                  <p>The 3 highlight cards shown below the intro</p>
                </div>
                <button className="svc-add-btn" onClick={() => openAdd("feature")}><FiPlus size={14} /> Add</button>
              </div>

              {data.features.length === 0 && <div className="svc-empty">No features yet.</div>}

              <div className="svc-features-grid">
                {data.features.map(ft => (
                  <div key={ft.id} className="svc-feature-card">
                    <div className="svc-ft-icon">{ICONS[ft.icon] || <FiGlobe />}</div>
                    <h5>{ft.title}</h5>
                    <p>{ft.text}</p>
                    <div className="svc-ft-actions">
                      <button onClick={() => openEdit("feature", ft)}><FiEdit3 size={13} /> Edit</button>
                      <button className="del" onClick={() => deleteFeature(ft.id)}><FiTrash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════ EXPERIENCE ════════ */}
        {tab === "experience" && (
          <div className="svc-section">
            <div className="svc-card">
              <div className="svc-card-head">
                <div className="svc-card-icon" style={{ background: "#EDE9FE", color: "#7C3AED" }}><FiAward size={18} /></div>
                <div>
                  <h4>Experience Section</h4>
                  <p>The "20 years" block with images and bullet list</p>
                </div>
              </div>

              <div className="svc-form-grid">
                <div className="svc-field full">
                  <label>Heading</label>
                  <input value={data.experience.heading} onChange={e => setData(d => ({ ...d, experience: { ...d.experience, heading: e.target.value } }))} />
                </div>
                <div className="svc-field full">
                  <label>Description</label>
                  <textarea rows={3} value={data.experience.desc} onChange={e => setData(d => ({ ...d, experience: { ...d.experience, desc: e.target.value } }))} />
                </div>
                <div className="svc-field">
                  <label>CTA Button Text</label>
                  <input value={data.experience.ctaText} onChange={e => setData(d => ({ ...d, experience: { ...d.experience, ctaText: e.target.value } }))} />
                </div>
              </div>

              <div className="svc-sub-section">
                <div className="svc-sub-head">
                  <h5>Experience Images (Min 1, Max 4)</h5>
                  <button
                    className="svc-add-btn sm"
                    onClick={addExpImage}
                    disabled={expFiles.length >= 4}
                    style={{ opacity: expFiles.length >= 4 ? 0.5 : 1 }}
                  >
                    <FiPlus size={13} /> Add Image
                  </button>
                </div>
                <div className="svc-images-grid">
                  {expFiles.map((ef, i) => (
                    <div key={i} className="svc-exp-upload-card">
                      <div
                        className="svc-upload-zone compact"
                        onClick={() => expInputRefs.current[i]?.click()}
                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
                        onDragLeave={e => e.currentTarget.classList.remove("dragover")}
                        onDrop={e => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("dragover");
                          handleExpFileSelect(i, e.dataTransfer.files[0]);
                        }}
                      >
                        {ef.preview ? (
                          <div className="svc-upload-preview">
                            <img src={ef.preview} alt={`Experience ${i + 1}`} />
                            <div className="svc-upload-preview-overlay">
                              <span>Click to change</span>
                            </div>
                          </div>
                        ) : (
                          <div className="svc-upload-placeholder compact">
                            <FiUpload size={20} />
                            <p>Upload Image {i + 1}</p>
                          </div>
                        )}
                        <input
                          ref={el => expInputRefs.current[i] = el}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={e => handleExpFileSelect(i, e.target.files[0])}
                        />
                      </div>
                      <button
                        className="svc-btn-del sm"
                        onClick={() => removeExpImage(i)}
                        disabled={expFiles.length <= 1}
                        style={{ opacity: expFiles.length <= 1 ? 0.5 : 1, marginTop: "6px" }}
                      >
                        <FiTrash2 size={13} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bullets */}
              <div className="svc-sub-section">
                <div className="svc-sub-head">
                  <h5>Bullet Points</h5>
                  <button className="svc-add-btn sm" onClick={addBullet}><FiPlus size={13} /> Add Point</button>
                </div>
                <div className="svc-bullets-list">
                  {data.experience.bullets.map(b => (
                    <div key={b.id} className="svc-bullet-row">
                      <select value={b.icon} onChange={e => updateBullet(b.id, { icon: e.target.value })}>
                        {ICON_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                      <input value={b.text} onChange={e => updateBullet(b.id, { text: e.target.value })} />
                      <button className="svc-btn-del sm" onClick={() => deleteBullet(b.id)}><FiTrash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="svc-exp-preview">
                <div className="svc-exp-images">
                  {expFiles.filter(ef => ef.preview).map((ef, i) => (
                    <img key={i} src={ef.preview} alt={`Experience ${i + 1}`} />
                  ))}
                </div>
                <div className="svc-exp-text">
                  <h4>{data.experience.heading}</h4>
                  <p>{data.experience.desc}</p>
                  <div className="svc-exp-bullets">
                    {data.experience.bullets.map(b => (
                      <div key={b.id} className="svc-exp-bullet">
                        <span className="svc-exp-bullet-icon">{ICONS[b.icon] || <FiCheck />}</span>
                        {b.text}
                      </div>
                    ))}
                  </div>
                  <button className="svc-btn-cta" disabled>{data.experience.ctaText}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════ MODAL ═══════ */}
      {modal && (
        <div className="svc-modal-backdrop" onClick={closeModal}>
          <div className="svc-modal" onClick={e => e.stopPropagation()}>
            <div className="svc-modal-head">
              <h4>{modal.mode === "add" ? "Add" : "Edit"} {modal.type}</h4>
              <button onClick={closeModal}><FiX size={18} /></button>
            </div>

            {/* Intro form */}
            {modal.type === "intro" && (
              <div className="svc-modal-body">
                <div className="svc-field"><label>Tag</label><input value={f("tag")} onChange={e => fSet("tag", e.target.value)} placeholder="e.g. Great Service!" /></div>
                <div className="svc-field"><label>Heading</label><input value={f("heading")} onChange={e => fSet("heading", e.target.value)} placeholder="Main heading" /></div>
                <div className="svc-field"><label>Description</label><textarea rows={3} value={f("desc")} onChange={e => fSet("desc", e.target.value)} /></div>
                <div className="svc-field"><label>CTA Button Text</label><input value={f("ctaText")} onChange={e => fSet("ctaText", e.target.value)} /></div>
                <div className="svc-field">
                  <label>Image</label>
                  <div
                    className="svc-upload-zone"
                    onClick={() => introInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
                    onDragLeave={e => e.currentTarget.classList.remove("dragover")}
                    onDrop={e => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("dragover");
                      handleFileSelect(e.dataTransfer.files[0], setIntroFile, setIntroPreview);
                    }}
                  >
                    {introPreview ? (
                      <div className="svc-upload-preview">
                        <img src={introPreview} alt="Intro preview" />
                        <div className="svc-upload-preview-overlay">
                          <span>Click to change</span>
                        </div>
                        <button
                          className="svc-upload-remove"
                          onClick={e => {
                            e.stopPropagation();
                            setIntroFile(null);
                            setIntroPreview("");
                          }}
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="svc-upload-placeholder">
                        <FiUpload size={24} />
                        <p>Click or drag image here to upload</p>
                        <span>Supports JPG, PNG, WEBP (Max 5MB)</span>
                      </div>
                    )}
                    <input
                      ref={introInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(e.target.files[0], setIntroFile, setIntroPreview)}
                    />
                  </div>
                </div>
                <div className="svc-modal-actions">
                  <button className="svc-btn-cancel" onClick={closeModal}>Cancel</button>
                  <button className="svc-btn-save" onClick={saveIntro}><FiCheck size={14} /> Save</button>
                </div>
              </div>
            )}

            {/* Feature form */}
            {modal.type === "feature" && (
              <div className="svc-modal-body">
                <div className="svc-field">
                  <label>Icon</label>
                  <div className="svc-icon-picker">
                    {ICON_KEYS.map(k => (
                      <button key={k} className={`svc-icon-opt ${f("icon") === k ? "active" : ""}`} onClick={() => fSet("icon", k)} title={k}>
                        {ICONS[k]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="svc-field"><label>Title</label><input value={f("title")} onChange={e => fSet("title", e.target.value)} /></div>
                <div className="svc-field"><label>Description</label><textarea rows={2} value={f("text")} onChange={e => fSet("text", e.target.value)} /></div>
                <div className="svc-modal-actions">
                  <button className="svc-btn-cancel" onClick={closeModal}>Cancel</button>
                  <button className="svc-btn-save" onClick={saveFeature}><FiCheck size={14} /> Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="svc-toast">
          <FiCheck size={16} /> {toast}
        </div>
      )}
    </div>
  );
}
