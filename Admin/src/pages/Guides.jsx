import React, { useState } from "react";
import {
  FiMessageCircle,
  FiPhone,
  FiBriefcase,
  FiTrendingUp,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiX,
  FiUpload,
  FiImage
} from "react-icons/fi";
import { BsPatchCheckFill } from "react-icons/bs";
import "../styles/Guides.css";

const guidesData = [
  {
    id: 1,
    name: "Liam Parker",
    email: "liam.parker@example.com",
    phone: "+1 (555) 111-2222",
    role: "Venice Tour Guide",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    phone: "+1 (555) 222-3333",
    role: "Serengeti Tour Guide",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Noah Brown",
    email: "noah.brown@example.com",
    phone: "+1 (555) 333-4444",
    role: "Swiss Alps Tour Guide",
    img: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    id: 4,
    name: "Ava Davis",
    email: "ava.davis@example.com",
    phone: "+1 (555) 444-5555",
    role: "Caribbean Islands Tour Guide",
    img: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: 5,
    name: "William Martinez",
    email: "william.martinez@example.com",
    phone: "+1 (555) 555-6666",
    role: "Paris Tour Guide",
    img: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    id: 6,
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    phone: "+1 (555) 666-7777",
    role: "Tokyo Tour Guide",
    img: "https://randomuser.me/api/portraits/women/64.jpg"
  },
  {
    id: 7,
    name: "James Taylor",
    email: "james.taylor@example.com",
    phone: "+1 (555) 777-8888",
    role: "Greek Islands Tour Guide",
    img: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 8,
    name: "Mia Anderson",
    email: "mia.anderson@example.com",
    phone: "+1 (555) 888-9999",
    role: "Bali Tour Guide",
    img: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    id: 9,
    name: "Lucas Thompson",
    email: "lucas.thompson@example.com",
    phone: "+1 (555) 999-0000",
    role: "New York Tour Guide",
    img: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

// Skills data for each guide
const guideSkills = {
  1: [
    "Fluent in English, Italian, and French",
    "Excellent communication and storytelling",
    "In-depth knowledge of Venetian history and culture",
    "Customer service and hospitality",
    "Navigation and safety management"
  ],
  2: [
    "Fluent in English and Swahili",
    "Wildlife tracking and identification",
    "First aid certified",
    "Photography skills",
    "4x4 off-road driving"
  ],
  3: [
    "Fluent in English, German, and French",
    "Mountain rescue certified",
    "Skiing and snowboarding instructor",
    "Avalanche safety training",
    "Rock climbing expert"
  ],
  4: [
    "Certified scuba diver",
    "Marine biology knowledge",
    "Boat handling skills",
    "Snorkeling guide",
    "Water safety certified"
  ],
  5: [
    "Art history degree",
    "Fluent in English and French",
    "Wine tasting expert",
    "Museum guide certified",
    "Historical storytelling"
  ],
  6: [
    "Fluent in Japanese",
    "Cultural etiquette expert",
    "Food tour specialist",
    "Temple and shrine knowledge",
    "Public transportation expert"
  ],
  7: [
    "Ancient history expert",
    "Archaeology background",
    "Multi-lingual (Greek, English)",
    "Island hopping specialist",
    "Local cuisine knowledge"
  ],
  8: [
    "Yoga instructor",
    "Surfing guide",
    "Wellness coaching",
    "Spa and retreat expert",
    "Holistic health knowledge"
  ],
  9: [
    "City history expert",
    "Broadway show knowledge",
    "Restaurant guide",
    "Subway navigation",
    "Art and culture specialist"
  ]
};

// Experiences data for each guide
const guideExperiences = {
  1: [
    {
      title: "Senior Tour Guide",
      company: "Venice Explore Tours",
      period: "January 2015 - Present",
      description: "Leading and managing group tours across Venice, providing engaging and informative experiences, ensuring customer satisfaction and safety.",
      icon: "clock"
    },
    {
      title: "Tour Guide",
      company: "Historical Venice Walks",
      period: "June 2000 - December 2004",
      description: "Conducted guided tours focusing on the history and culture of Venice, developed tour scripts, and trained new tour guides.",
      icon: "home"
    }
  ],
  2: [
    {
      title: "Senior Safari Guide",
      company: "Serengeti Wildlife Tours",
      period: "March 2016 - Present",
      description: "Leading safari expeditions, educating guests about wildlife conservation, ensuring safety during game drives.",
      icon: "clock"
    },
    {
      title: "Junior Guide",
      company: "Tanzania Adventure Co.",
      period: "January 2012 - February 2016",
      description: "Assisted lead guides on safari trips, learned tracking techniques, and provided customer support.",
      icon: "briefcase"
    }
  ],
  3: [
    {
      title: "Mountain Guide",
      company: "Alpine Adventures",
      period: "December 2017 - Present",
      description: "Leading hiking and skiing tours in the Swiss Alps, ensuring guest safety, providing equipment guidance.",
      icon: "clock"
    },
    {
      title: "Ski Instructor",
      company: "Swiss Ski School",
      period: "November 2012 - April 2017",
      description: "Taught skiing to beginners and intermediate level students, conducted safety briefings.",
      icon: "home"
    }
  ]
};

function Guides() {
  const [guides, setGuides] = useState(guidesData);
  const [selectedGuide, setSelectedGuide] = useState(guidesData[0]);
  const [search, setSearch] = useState("");
  const [showRoles, setShowRoles] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newGuide, setNewGuide] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    img: ""
  });
  
  // Edit guide state
  const [editGuide, setEditGuide] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    img: "",
    experience: "",
    level: "",
    jobType: "",
    status: "",
    skills: [],
    experiences: []
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(1250);

  // Get unique roles for dropdown
  const roles = ["All Roles", ...new Set(guides.map(g => g.role))];

  // Get current guide's skills and experiences
  const currentSkills = guideSkills[selectedGuide.id] || guideSkills[1];
  const currentExperiences = guideExperiences[selectedGuide.id] || guideExperiences[1];

  // Filter guides based on search and role
  const filtered = guides.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
                         g.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === "All Roles" || g.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const totalFilteredItems = filtered.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 4;
      }
      
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(i);
        }
      }
      
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  // Handle image upload for Add Guide
  const handleAddImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGuide({...newGuide, img: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload for Edit Guide
  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditGuide({...editGuide, img: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // ADD GUIDE FUNCTION
  const handleAddGuide = () => {
    if(!newGuide.name || !newGuide.email){
      alert("Name and Email required!");
      return;
    }

    const guide = {
      id: Date.now(),
      ...newGuide,
      img: newGuide.img || "https://randomuser.me/api/portraits/lego/1.jpg"
    };

    setGuides(prev => [guide, ...prev]);
    setSelectedGuide(guide);
    setShowModal(false);
    setNewGuide({
      name: "",
      email: "",
      phone: "",
      role: "",
      img: ""
    });
    
    setCurrentPage(1);
  };

  // EDIT GUIDE FUNCTION - Open edit modal
  const handleEditClick = () => {
    setEditGuide({
      id: selectedGuide.id,
      name: selectedGuide.name,
      email: selectedGuide.email,
      phone: selectedGuide.phone,
      role: selectedGuide.role,
      img: selectedGuide.img,
      experience: "10 years",
      level: "Senior",
      jobType: "Full Time",
      status: "Active",
      skills: currentSkills,
      experiences: currentExperiences
    });
    setShowEditModal(true);
  };

  // UPDATE GUIDE FUNCTION
  const handleUpdateGuide = () => {
    if(!editGuide.name || !editGuide.email){
      alert("Name and Email required!");
      return;
    }

    // Update in guides array
    setGuides(prev => prev.map(guide => 
      guide.id === editGuide.id ? {
        id: editGuide.id,
        name: editGuide.name,
        email: editGuide.email,
        phone: editGuide.phone,
        role: editGuide.role,
        img: editGuide.img
      } : guide
    ));

    // Update selected guide
    setSelectedGuide({
      id: editGuide.id,
      name: editGuide.name,
      email: editGuide.email,
      phone: editGuide.phone,
      role: editGuide.role,
      img: editGuide.img
    });

    // Update skills and experiences in the data stores
    if (guideSkills[editGuide.id]) {
      guideSkills[editGuide.id] = editGuide.skills;
    }
    if (guideExperiences[editGuide.id]) {
      guideExperiences[editGuide.id] = editGuide.experiences;
    }

    setShowEditModal(false);
    alert("Guide profile updated successfully!");
  };

  // Handle skill change in edit modal
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...editGuide.skills];
    updatedSkills[index] = value;
    setEditGuide({...editGuide, skills: updatedSkills});
  };

  // Add new skill
  const handleAddSkill = () => {
    setEditGuide({
      ...editGuide, 
      skills: [...editGuide.skills, "New skill"]
    });
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = editGuide.skills.filter((_, i) => i !== index);
    setEditGuide({...editGuide, skills: updatedSkills});
  };

  // Handle experience change
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...editGuide.experiences];
    updatedExperiences[index] = {...updatedExperiences[index], [field]: value};
    setEditGuide({...editGuide, experiences: updatedExperiences});
  };

  // Add new experience
  const handleAddExperience = () => {
    setEditGuide({
      ...editGuide,
      experiences: [
        ...editGuide.experiences,
        {
          title: "New Position",
          company: "Company Name",
          period: "Start Date - End Date",
          description: "Job description...",
          icon: "clock"
        }
      ]
    });
  };

  // Remove experience
  const handleRemoveExperience = (index) => {
    const updatedExperiences = editGuide.experiences.filter((_, i) => i !== index);
    setEditGuide({...editGuide, experiences: updatedExperiences});
  };

  return (
    <div className="guides-wrapper">
      {/* LEFT CARD */}
      <div className="guides-card">
        {/* HEADER */}
        <div className="guides-header">
          <h2>Guides</h2>

          <div className="guides-controls">
            <input
              placeholder="Search name, email, etc"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="role-dropdown">
              <button
                className="role-btn"
                onClick={() => setShowRoles(!showRoles)}
              >
                {selectedRole}
                <span className={`arrow ${showRoles ? "up" : ""}`}>
                  ▼
                </span>
              </button>

              {showRoles && (
                <div className="roles-menu">
                  {roles.map(role => (
                    <div
                      key={role}
                      className="role-item"
                      onClick={() => {
                        setSelectedRole(role);
                        setShowRoles(false);
                        setCurrentPage(1);
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              className="add-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Guide
            </button>
          </div>
        </div>

        {/* LIST */}
        {currentItems.map(guide => (
          <div
            key={guide.id}
            className={`guide-row ${
              selectedGuide.id === guide.id ? "active" : ""
            }`}
            onClick={() => setSelectedGuide(guide)}
          >
            <img src={guide.img} alt={guide.name} />
            <div className="guide-text">
              <h4>{guide.name}</h4>
              <span>{guide.email}</span>
              <span>{guide.phone}</span>
            </div>
            <div className="role-pill">{guide.role}</div>
          </div>
        ))}

        {/* PAGINATION */}
        <div className="pagination">
          <div className="showing">
            Showing 
            <select 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className="items-per-page"
            >
              <option value="5">5</option>
              <option value="9">9</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
            out of {totalItems}
          </div>

          <div className="pages">
            <button 
              onClick={prevPage}
              disabled={currentPage === 1}
              className="page-nav"
            >
              &lt;
            </button>
            
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`page-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              )
            ))}
            
            <button 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="page-nav"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="guide-details">
        {/* Banner */}
        <div className="details-banner"></div>

        <div className="details-body">
          {/* Avatar + Name + Role */}
          <div className="profile-top">
            <img
              src={selectedGuide.img}
              className="details-avatar"
              alt={selectedGuide.name}
            />

            <div className="profile-info">
              <h2>{selectedGuide.name}</h2>
              <p>{selectedGuide.role}</p>
            </div>

            <div className="profile-actions">
              <button className="icon-btn">
                <FiMessageCircle size={18} />
              </button>
              <button className="icon-btn blue">
                <FiPhone size={18} />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FiBriefcase />
              </div>
              <div>
                <p>Work Experience</p>
                <strong>10 years</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiTrendingUp />
              </div>
              <div>
                <p>Experience Level</p>
                <strong>Senior</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiUser />
              </div>
              <div>
                <p>Job Type</p>
                <strong>Full Time</strong>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <FiCheckCircle />
              </div>
              <div>
                <p>Job Status</p>
                <strong>Active</strong>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="skills-section">
            <h3>Skills</h3>
            <ul className="skills-list">
              {currentSkills.map((skill, index) => (
                <li key={index}>
                  <BsPatchCheckFill className="tick"/> {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences Section */}
          <div className="experiences-section">
            <h3>Experiences</h3>

            {currentExperiences.map((exp, index) => (
              <div key={index} className="experience-card">
                <div className={`exp-icon ${exp.icon === 'home' ? 'red' : 'blue'}`}>
                  {exp.icon === 'clock' ? <FiClock/> : exp.icon === 'home' ? <FiHome/> : <FiBriefcase/>}
                </div>
                <div>
                  <h4>{exp.title}</h4>
                  <p className="company">
                    {exp.company}
                    <span className="dot"/> {exp.period}
                  </p>
                  <p className="description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Profile Button */}
          <button className="edit-profile" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* ADD GUIDE MODAL WITH IMAGE UPLOAD */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Guide</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={newGuide.name}
                  onChange={(e) => setNewGuide({...newGuide, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={newGuide.email}
                  onChange={(e) => setNewGuide({...newGuide, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter phone"
                  value={newGuide.phone}
                  onChange={(e) => setNewGuide({...newGuide, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={newGuide.role}
                  onChange={(e) => setNewGuide({...newGuide, role: e.target.value})}
                >
                  <option value="">Select Role</option>
                  {roles.filter(r => r !== "All Roles").map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Image Upload Field */}
              <div className="form-group upload-group">
                <label>Profile Image</label>
                <div className="upload-container">
                  {newGuide.img ? (
                    <div className="image-preview">
                      <img src={newGuide.img} alt="Preview" className="preview-img" />
                      <button 
                        className="remove-image-btn"
                        onClick={() => setNewGuide({...newGuide, img: ""})}
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FiImage className="upload-icon" />
                      <p>No image selected</p>
                    </div>
                  )}
                  <label htmlFor="add-image-upload" className="upload-btn">
                    <FiUpload /> Choose Image
                  </label>
                  <input
                    id="add-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAddImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="modal-btn add" onClick={handleAddGuide}>
                Add Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL WITH IMAGE UPLOAD */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content edit-modal">
            <div className="modal-header">
              <h3>Edit Guide Profile</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-body edit-modal-body">
              {/* Basic Information */}
              <div className="edit-section">
                <h4>Basic Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={editGuide.name}
                      onChange={(e) => setEditGuide({...editGuide, name: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={editGuide.email}
                      onChange={(e) => setEditGuide({...editGuide, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={editGuide.phone}
                      onChange={(e) => setEditGuide({...editGuide, phone: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={editGuide.role}
                      onChange={(e) => setEditGuide({...editGuide, role: e.target.value})}
                    >
                      {roles.filter(r => r !== "All Roles").map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload Field for Edit */}
                <div className="form-group upload-group">
                  <label>Profile Image</label>
                  <div className="upload-container">
                    {editGuide.img ? (
                      <div className="image-preview">
                        <img src={editGuide.img} alt="Preview" className="preview-img" />
                        <button 
                          className="remove-image-btn"
                          onClick={() => setEditGuide({...editGuide, img: ""})}
                        >
                          <FiX />
                        </button>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <FiImage className="upload-icon" />
                        <p>No image selected</p>
                      </div>
                    )}
                    <label htmlFor="edit-image-upload" className="upload-btn">
                      <FiUpload /> Choose Image
                    </label>
                    <input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="edit-section">
                <h4>Professional Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Work Experience</label>
                    <input
                      type="text"
                      value={editGuide.experience}
                      onChange={(e) => setEditGuide({...editGuide, experience: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Experience Level</label>
                    <select
                      value={editGuide.level}
                      onChange={(e) => setEditGuide({...editGuide, level: e.target.value})}
                    >
                      <option value="Junior">Junior</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Senior">Senior</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Job Type</label>
                    <select
                      value={editGuide.jobType}
                      onChange={(e) => setEditGuide({...editGuide, jobType: e.target.value})}
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Seasonal">Seasonal</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job Status</label>
                    <select
                      value={editGuide.status}
                      onChange={(e) => setEditGuide({...editGuide, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Training">Training</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="edit-section">
                <div className="section-header">
                  <h4>Skills</h4>
                  <button className="add-item-btn" onClick={handleAddSkill}>
                    + Add Skill
                  </button>
                </div>
                
                {editGuide.skills?.map((skill, index) => (
                  <div key={index} className="skill-edit-row">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className="skill-input"
                    />
                    <button 
                      className="remove-item-btn"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Experiences Section */}
              <div className="edit-section">
                <div className="section-header">
                  <h4>Experiences</h4>
                  <button className="add-item-btn" onClick={handleAddExperience}>
                    + Add Experience
                  </button>
                </div>
                
                {editGuide.experiences?.map((exp, index) => (
                  <div key={index} className="experience-edit-card">
                    <div className="experience-edit-header">
                      <h5>Experience {index + 1}</h5>
                      <button 
                        className="remove-item-btn"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                        placeholder="e.g., January 2015 - Present"
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        rows="3"
                      />
                    </div>

                    <div className="form-group">
                      <label>Icon</label>
                      <select
                        value={exp.icon}
                        onChange={(e) => handleExperienceChange(index, 'icon', e.target.value)}
                      >
                        <option value="clock">Clock</option>
                        <option value="home">Home</option>
                        <option value="briefcase">Briefcase</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="modal-btn add" onClick={handleUpdateGuide}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Guides;