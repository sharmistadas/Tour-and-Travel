import "./TagCloud.css";

const TagCloud = () => {
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

  return (
    <div className="sidebar-box">
      <h4>TAG CLOUD</h4>

      <div className="tag-cloud">
        {tags.map((tag, index) => (
          <a href="#" key={index}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
