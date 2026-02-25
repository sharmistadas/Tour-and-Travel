import "./Sidebar.css";

const images = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=400&q=80",
];

const tags = [
  "Article",
  "Building",
  "Constructions",
  "Industry",
  "Metal",
  "Mining",
  "Nature",
  "News",
  "Oil",
  "Polymer",
];

const Sidebar = () => {
  return (
    <aside className="">
      {/* TEXT WIDGET */}
      <div className="widget">
        <h4>TEXT WIDGET</h4>
        <p>
          Nulla vitae elit libero, a pharetra augue. Nulla vitae elit libero, a pharetra augue. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Etiam porta sem malesuada.
        </p>
      </div>

      {/* RECENT WORKS */}
      <div className="widget">
        <h4>RECENT WORKS</h4>
        <div className="recent-works">
          {images.map((img, i) => (
            <img key={i} src={img} alt="work" />
          ))}
        </div>
      </div>

      {/* RECENT COMMENTS */}
      <div className="widget">
        <h4>RECENT COMMENTS</h4>
        <ul className="comments">
          <li>John Smith on Pack wisely before traveling</li>
          <li>John Smith on Pack wisely before traveling</li>
          <li>John Smith on Gallery Post Format</li>
          <li>John Smith on Gallery Post Format</li>
          <li>John Smith on Pack wisely before traveling</li>
        </ul>
      </div>

      {/* TAG CLOUD (🔥 MISSING PART – NOW ADDED) */}
      <div className="widget">
        <h4>TAG CLOUD</h4>
        <div className="tag-cloud">
          {tags.map((tag, i) => (
            <a key={i} href="#" className="tag">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
