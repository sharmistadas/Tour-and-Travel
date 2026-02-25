import React, { useState } from "react";
import {
  FiImage, FiEdit3, FiTrash2, FiPlus, FiX,
  FiGlobe, FiDollarSign, FiHeadphones, FiCheck,
  FiStar, FiPhone, FiClock, FiSend, FiUpload,
  FiGrid, FiAward, FiMail, FiMessageSquare,
  FiPlay, FiCompass, FiUsers, FiShield, FiSave,
} from "react-icons/fi";
import "../styles/Service.css";

/* ─── helpers ─── */
const uid = () => Math.random().toString(36).slice(2, 10);

/* ─── icon map ─── */
const ICONS = {
  globe: <FiGlobe />, dollar: <FiDollarSign />, headphones: <FiHeadphones />,
  check: <FiCheck />, compass: <FiCompass />, users: <FiUsers />,
  shield: <FiShield />, star: <FiStar />, grid: <FiGrid />, award: <FiAward />,
};
const ICON_KEYS = Object.keys(ICONS);

/* ─── seed data ─── */
const SEED = {
  banner: {
    title: "Services We Provide",
    subtitle: "A small river named Duden flows by their place.",
    bgUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=70",
  },
  intros: [{
    id: uid(),
    tag: "Great Service, Great Price!",
    heading: "Freedom to discover, confidence to explore",
    desc: "Leave your guidebooks at home and dive into the local cultures that make each destination so special. We'll connect you with our exclusive experiences. Each trip is carefully crafted to let you enjoy your vacation.",
    ctaText: "Contact Us",
    imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70",
  }],
  features: [
    { id: uid(), icon: "globe",       title: "700 Destinations",      text: "Our expert team handpicked all destinations in this site" },
    { id: uid(), icon: "dollar",      title: "Best Price Guarantee",  text: "Price match within 48 hours of order confirmation" },
    { id: uid(), icon: "headphones",  title: "Top Notch Support",     text: "We are here to help, before, during, and even after your trip." },
  ],
  experience: {
    heading: "We have been in the tourism industry for more than 20 years",
    desc: "Leave your guidebooks at home and dive into the local cultures that make each destination so special. We'll connect you with our exclusive experiences.",
    ctaText: "Book Now!",
    bullets: [
      { id: uid(), icon: "check",   text: "Book With Confidence" },
      { id: uid(), icon: "compass", text: "Freedom to discover, confidence to explore" },
      { id: uid(), icon: "users",   text: "Dive into Culture" },
    ],
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=70",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=70",
    ],
  },
};

/* ═══════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════ */
export default function Service() {
  const [data, setData] = useState(SEED);
  const [tab, setTab] = useState("banner"); // banner | content | experience | contact | testimonials
  const [toast, setToast] = useState(null);

  /* ── modal state ── */
  const [modal, setModal] = useState(null);  // null | { type, mode, payload }
  const [form, setForm] = useState({});

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const f = (k) => form[k] || "";
  const fSet = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  /* ── CRUD helpers ── */
  const openAdd = (type) => { setForm({}); setModal({ type, mode: "add" }); };
  const openEdit = (type, item) => { setForm({ ...item }); setModal({ type, mode: "edit", id: item.id }); };
  const closeModal = () => setModal(null);

  const saveIntro = () => {
    if (!f("heading")) return;
    if (modal.mode === "add") {
      setData(d => ({ ...d, intros: [...d.intros, { id: uid(), tag: f("tag"), heading: f("heading"), desc: f("desc"), ctaText: f("ctaText"), imgUrl: f("imgUrl") }] }));
    } else {
      setData(d => ({ ...d, intros: d.intros.map(x => x.id === modal.id ? { ...x, tag: f("tag"), heading: f("heading"), desc: f("desc"), ctaText: f("ctaText"), imgUrl: f("imgUrl") } : x) }));
    }
    closeModal(); flash("Intro saved!");
  };
  const deleteIntro = (id) => { setData(d => ({ ...d, intros: d.intros.filter(x => x.id !== id) })); flash("Intro deleted"); };

  const saveFeature = () => {
    if (!f("title")) return;
    if (modal.mode === "add") {
      setData(d => ({ ...d, features: [...d.features, { id: uid(), icon: f("icon") || "globe", title: f("title"), text: f("text") }] }));
    } else {
      setData(d => ({ ...d, features: d.features.map(x => x.id === modal.id ? { ...x, icon: f("icon"), title: f("title"), text: f("text") } : x) }));
    }
    closeModal(); flash("Feature saved!");
  };
  const deleteFeature = (id) => { setData(d => ({ ...d, features: d.features.filter(x => x.id !== id) })); flash("Feature deleted"); };

  const addBullet = () => setData(d => ({ ...d, experience: { ...d.experience, bullets: [...d.experience.bullets, { id: uid(), icon: "check", text: "New point" }] } }));
  const updateBullet = (id, patch) => setData(d => ({ ...d, experience: { ...d.experience, bullets: d.experience.bullets.map(b => b.id === id ? { ...b, ...patch } : b) } }));
  const deleteBullet = (id) => setData(d => ({ ...d, experience: { ...d.experience, bullets: d.experience.bullets.filter(b => b.id !== id) } }));

  const saveAll = () => flash("All changes saved (demo)!");

  /* ── tab config ── */
  const TABS = [
    { key: "banner",       label: "Banner",        icon: <FiImage size={15} /> },
    { key: "content",      label: "Content",       icon: <FiPlay size={15} /> },
    { key: "experience",   label: "Experience",    icon: <FiAward size={15} /> },
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
        <button className="svc-save-btn" onClick={saveAll}><FiSave size={15} /> Save All Changes</button>
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
                  <label>Background Image URL</label>
                  <input value={data.banner.bgUrl} onChange={e => setData(d => ({ ...d, banner: { ...d.banner, bgUrl: e.target.value } }))} placeholder="https://..." />
                </div>
              </div>
              {/* Preview */}
              <div className="svc-banner-preview" style={{ backgroundImage: data.banner.bgUrl ? `url(${data.banner.bgUrl})` : "linear-gradient(135deg,#1e293b,#334155)" }}>
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
                    onClick={() => {
                      if ((data.experience.images || []).length >= 4) {
                        flash("Maximum 4 images allowed");
                        return;
                      }
                      setData(d => ({ 
                        ...d, 
                        experience: { 
                          ...d.experience, 
                          images: [...(d.experience.images || []), ""] 
                        } 
                      }));
                    }}
                    disabled={(data.experience.images || []).length >= 4}
                    style={{ opacity: (data.experience.images || []).length >= 4 ? 0.5 : 1 }}
                  >
                    <FiPlus size={13} /> Add Image
                  </button>
                </div>
                <div className="svc-images-list">
                  {(data.experience.images || []).map((url, i) => (
                    <div key={i} className="svc-image-row" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input 
                        value={url} 
                        onChange={e => {
                          const newImages = [...data.experience.images];
                          newImages[i] = e.target.value;
                          setData(d => ({ ...d, experience: { ...d.experience, images: newImages } }));
                        }}
                        placeholder="Image URL https://..."
                        style={{ flex: 1, padding: '8px', border: '1px solid #E2E8F0', borderRadius: '8px' }}
                      />
                      <button 
                        className="svc-btn-del sm" 
                        onClick={() => {
                          if (data.experience.images.length <= 1) {
                            flash("Minimum 1 image required");
                            return;
                          }
                          const newImages = data.experience.images.filter((_, idx) => idx !== i);
                          setData(d => ({ ...d, experience: { ...d.experience, images: newImages } }));
                        }}
                        disabled={data.experience.images.length <= 1}
                        style={{ opacity: data.experience.images.length <= 1 ? 0.5 : 1 }}
                      >
                        <FiTrash2 size={13} />
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
                  {(data.experience.images || []).map((url, i) => (
                    <img key={i} src={url} alt={`Experience ${i + 1}`} />
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
                <div className="svc-field"><label>Image URL</label><input value={f("imgUrl")} onChange={e => fSet("imgUrl", e.target.value)} placeholder="https://..." /></div>
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
