import React, { useMemo, useState, useEffect } from "react";
import "../styles/Traveller.css";

const ROWS_PER_PAGE = 11;

const ALL_TRAVELERS = [
  {
    name: "Camellia Swan",
    email: "camellia.swan@example.com",
    phone: "+1 (555) 123-4567",
    address: "Bali, Indonesia",
    job: "Marketing",
    packages: "Venice Dreams, Parisian Romance",
    category: "Gold",
  },
  {
    name: "Raphael Goodman",
    email: "raphael.goodman@example.com",
    phone: "+1 (555) 234-5678",
    address: "Jakarta, Indonesia",
    job: "IT",
    packages: "Safari Adventure, Tokyo Cultural Adventure",
    category: "Silver",
  },
  {
    name: "Ludwig Contesso",
    email: "ludwig.contesso@example.com",
    phone: "+1 (555) 345-6789",
    address: "Bandung, Indonesia",
    job: "Finance",
    packages: "Alpine Escape",
    category: "Gold",
  },
  {
    name: "Armina Raoul Meyes",
    email: "armina.meyes@example.com",
    phone: "+1 (555) 456-7890",
    address: "Surabaya, Indonesia",
    job: "Education",
    packages: "Caribbean Cruise",
    category: "Bronze",
  },
  {
    name: "James Dunn",
    email: "james.dunn@example.com",
    phone: "+1 (555) 567-8901",
    address: "Yogyakarta, Indonesia",
    job: "Engineering",
    packages: "Parisian Romance",
    category: "Silver",
  },
  {
    name: "Hillary Grey",
    email: "hillary.grey@example.com",
    phone: "+1 (666) 345-6780",
    address: "Melbourne, Australia",
    job: "Environmental Science",
    packages: "Tokyo Cultural Adventure",
    category: "Bronze",
  },
  {
    name: "Lucas O’connor",
    email: "lucas.oconnor@example.com",
    phone: "+1 (555) 901-2345",
    address: "Munich, Germany",
    job: "Management",
    packages: "Greek Island Hopping",
    category: "Silver",
  },
  {
    name: "Layla Linch",
    email: "layla.linch@example.com",
    phone: "+1 (555) 012-3456",
    address: "Cape Town, South Africa",
    job: "Marketing",
    packages: "Bali Beach Escape",
    category: "Gold",
  },
  {
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    phone: "+1 (555) 678-9012",
    address: "Seoul, South Korea",
    job: "Healthcare",
    packages: "Tokyo Cultural Adventure",
    category: "Gold",
  },
  {
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1 (555) 789-0123",
    address: "Sydney, Australia",
    job: "Legal",
    packages: "Greek Island Hopping",
    category: "Silver",
  },
  {
    name: "Zaire Dorwart",
    email: "zaire.dorwart@example.com",
    phone: "+1 (555) 345-7890",
    address: "Madrid, Spain",
    job: "Environmental Science",
    packages: "Bali Beach Escape",
    category: "Bronze",
  },
  {
    name: "Michael Smith",
    email: "michael.smith@example.com",
    phone: "+1 (555) 789-0123",
    address: "Sydney, Australia",
    job: "Legal",
    packages: "Greek Island Hopping",
    category: "Silver",
  },
  {
    name: "Zaire Dorwart",
    email: "zaire.dorwart@example.com",
    phone: "+1 (555) 345-7890",
    address: "Madrid, Spain",
    job: "Environmental Science",
    packages: "Bali Beach Escape",
    category: "Bronze",
  },
  {
    name: "Camellia Swan",
    email: "camellia.swan@example.com",
    phone: "+1 (555) 123-4567",
    address: "Bali, Indonesia",
    job: "Marketing",
    packages: "Venice Dreams, Parisian Romance",
    category: "Gold",
  },
  {
    name: "Raphael Goodman",
    email: "raphael.goodman@example.com",
    phone: "+1 (555) 234-5678",
    address: "Jakarta, Indonesia",
    job: "IT",
    packages: "Safari Adventure, Tokyo Cultural Adventure",
    category: "Silver",
  },
  {
    name: "Ludwig Contesso",
    email: "ludwig.contesso@example.com",
    phone: "+1 (555) 345-6789",
    address: "Bandung, Indonesia",
    job: "Finance",
    packages: "Alpine Escape",
    category: "Gold",
  },
  {
    name: "Armina Raoul Meyes",
    email: "armina.meyes@example.com",
    phone: "+1 (555) 456-7890",
    address: "Surabaya, Indonesia",
    job: "Education",
    packages: "Caribbean Cruise",
    category: "Bronze",
  },
  {
    name: "James Dunn",
    email: "james.dunn@example.com",
    phone: "+1 (555) 567-8901",
    address: "Yogyakarta, Indonesia",
    job: "Engineering",
    packages: "Parisian Romance",
    category: "Silver",
  },
  {
    name: "Hillary Grey",
    email: "hillary.grey@example.com",
    phone: "+1 (666) 345-6780",
    address: "Melbourne, Australia",
    job: "Environmental Science",
    packages: "Tokyo Cultural Adventure",
    category: "Bronze",
  },
  {
    name: "Lucas O’connor",
    email: "lucas.oconnor@example.com",
    phone: "+1 (555) 901-2345",
    address: "Munich, Germany",
    job: "Management",
    packages: "Greek Island Hopping",
    category: "Silver",
  },
  {
    name: "Layla Linch",
    email: "layla.linch@example.com",
    phone: "+1 (555) 012-3456",
    address: "Cape Town, South Africa",
    job: "Marketing",
    packages: "Bali Beach Escape",
    category: "Gold",
  },
 
];

function getInitials(name) {
  const parts = name.split(" ").filter(Boolean);
  const a = parts[0]?.[0] || "T";
  const b = parts[1]?.[0] || "R";
  return (a + b).toUpperCase();
}

function CategoryPill({ value }) {
  let cls = "pill pill-default";
  if (value === "Gold") cls = "pill pill-gold";
  if (value === "Silver") cls = "pill pill-silver";
  if (value === "Bronze") cls = "pill pill-bronze";
  return <span className={cls}>{value}</span>;
}

export default function Traveller() {
  const [travelers, setTravelers] = useState(ALL_TRAVELERS);
  const [page, setPage] = useState(1);
  const [packageFilter, setPackageFilter] = useState("Package");
  const [memberFilter, setMemberFilter] = useState("Member Category");
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    job: "",
    packages: "",
    category: "Bronze",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTravelers((prev) => [formData, ...prev]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      job: "",
      packages: "",
      category: "Bronze",
    });
  };

  // FILTER
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return travelers.filter((t) => {
      const matchesSearch =
        !s ||
        t.name.toLowerCase().includes(s) ||
        t.email.toLowerCase().includes(s) ||
        t.address.toLowerCase().includes(s) ||
        t.job.toLowerCase().includes(s) ||
        t.packages.toLowerCase().includes(s) ||
        t.category.toLowerCase().includes(s);

      const matchesPackage =
        packageFilter === "Package" ||
        t.packages.toLowerCase().includes(packageFilter.toLowerCase());

      const matchesMember =
        memberFilter === "Member Category" || t.category === memberFilter;

      return matchesSearch && matchesPackage && matchesMember;
    });
  }, [packageFilter, memberFilter, search, travelers]);

  // TOTAL PAGES
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));

  // PAGE DATA
  const pageRows = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filtered.slice(start, start + ROWS_PER_PAGE);
  }, [filtered, page]);

  const showingFrom = (page - 1) * ROWS_PER_PAGE + 1;
  const showingTo = Math.min(page * ROWS_PER_PAGE, filtered.length);

  // RESET PAGE WHEN FILTER CHANGE
  useEffect(() => {
    setPage(1);
  }, [packageFilter, memberFilter, search]);

  // DYNAMIC PAGINATION
  const pages = useMemo(() => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
      return pageNumbers;
    }

    pageNumbers.push(1);

    if (page > 4) pageNumbers.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pageNumbers.push(i);

    if (page < totalPages - 3) pageNumbers.push("...");

    pageNumbers.push(totalPages);

    return pageNumbers;
  }, [page, totalPages]);

  return (
    <div className="travelie-page">
      {/* HEADER */}
      <div className="travelie-header">
        <div className="left">
          <h2>Travelers</h2>

          <div className="filters">
            <button
              className="filter-btn"
              onClick={() =>
                setPackageFilter((v) =>
                  v === "Package" ? "Tokyo" : "Package",
                )
              }
            >
              {packageFilter} <i className="bi bi-chevron-down"></i>
            </button>

            <select
              className="filter-select"
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
            >
              <option value="Member Category">Member Category</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
        </div>

        <div className="right">
          {/* Search */}
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, address, job, etc"
            />
          </div>

          {/* Add */}
          <button className="add-btn" onClick={() => setIsModalOpen(true)}>Add Traveler</button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="trav-modal-overlay">
          <div className="trav-modal">
            <div className="trav-modal-header">
              <h3>Add New Traveler</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="trav-form-group">
                <label>Name</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" />
              </div>
              <div className="trav-form-group">
                <label>Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" />
              </div>
              <div className="trav-form-group">
                <label>Phone</label>
                <input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" />
              </div>
              <div className="trav-form-group">
                <label>Address</label>
                <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
              </div>
              <div className="trav-form-group">
                <label>Job</label>
                <input required name="job" value={formData.job} onChange={handleInputChange} placeholder="Job Title" />
              </div>
              <div className="trav-form-group">
                <label>Packages</label>
                <input name="packages" value={formData.packages} onChange={handleInputChange} placeholder="Assigned Packages" />
              </div>
              <div className="trav-form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
              <div className="trav-modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save Traveler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="travelie-table-card">
        <div className="table-responsive">
          <table className="table travelie-table align-middle">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Job Field</th>
                <th>Packages</th>
                <th>Member Category</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((t, idx) => (
                <tr key={t.email + idx}>
                  <td>
                    <div className="name-cell">
                      <div className="avatar">{getInitials(t.name)}</div>
                      <div>
                        <div className="traveler-name">{t.name}</div>
                        <div className="traveler-email">{t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{t.phone}</td>
                  <td>{t.address}</td>
                  <td>{t.job}</td>
                  <td>{t.packages}</td>
                  <td>
                    <CategoryPill value={t.category} />
                  </td>
                </tr>
              ))}

              {/* IF NO DATA */}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No travelers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="table-footer">
          <div className="showing">
            Showing
            <span className="showing-count">
              {showingTo - showingFrom + 1}{" "}
              <i className="bi bi-chevron-down"></i>
            </span>
            out of <b>{filtered.length}</b>
          </div>

          <div className="pagination-area">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage(Math.max(1, page - 1))}
            >
              Previous
            </button>

            {pages.map((p, i) => {
              if (p === "...") {
                return (
                  <span key={i} className="dots">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`page-number ${p === page ? "active" : ""}`}
                >
                  {p}
                </button>
              );
            })}

            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
