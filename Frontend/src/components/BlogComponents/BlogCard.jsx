import { useEffect, useRef } from "react";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiBookLight } from "react-icons/pi";
import { LuMessageCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add("show");
        }
      },
      { threshold: 0.15 }
    );
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // FIXED: Proper click handler with prevent default for links
  const handleCardClick = (e) => {
    if (e.target.tagName !== 'A' && e.target.className !== 'read-more-btn') {
      navigate(`/blog/${blog.id}`);
    }
  };

  return (
    <article
      className="blog-card"
      ref={cardRef}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* REMOVED broken hardcoded "⚡ STICKY POST" */}
      <div className="blog-image">
        
        <img src={blog.image.trim()} alt={blog.title} />
      </div>
      <div className="blog-info">
        <div className="blog-meta-row">
          <span><FaRegClock /> {blog.date.trim()}</span>
          <span><MdOutlineLibraryBooks /> {blog.author.trim()}</span>
          <span><PiBookLight /> Blog</span>
          <span><LuMessageCircle /> 5</span>
        </div>
        <h2 className="blog-title">{blog.title.trim()}</h2>
        <p className="blog-desc">{blog.desc}</p>
        <span className="read-more-btn">Read More</span>
      </div>
    </article>
  );
};

export default BlogCard;