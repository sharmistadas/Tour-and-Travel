// Hiking.jsx
import "./Beaches.css";
import Instagram from "../components/Instagram";
import Newsletter from "../components/Newsletter";
import { getGroupedDestinations } from "../data/destinations";
import { Link } from "react-router-dom";

export default function Hiking() {
  const sections = getGroupedDestinations("hiking");

  return (
    <>
      {/* BANNER */}
      <section
        className="beaches-banner"
        style={{ backgroundImage: "url(/images/categories/Hiking.png)" }}
      >
        <div className="beaches-banner-overlay">
          <h1>Hiking</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="beaches">
        {sections.map((group, i) => (
          <div className="beaches-grid" key={i}>
            {group.map((item, j) => (
              <Link
                to={`/destinations/${item.id}`}
                className="beach-card-link"
                key={j}
              >
                <div className="beach-card">
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <button>READ MORE »</button>
                </div>
              </Link>
            ))}
          </div>
        ))}

        {/* PAGINATION */}
        <div className="pagination">
          <span className="page active">1</span>
          <span className="page">2</span>
          <span className="page">3</span>
          <span className="page">…</span>
          <span className="page">6</span>
          <span className="page next">›</span>
        </div>

        <Instagram />
        <Newsletter />
      </section>
    </>
  );
}