// src/components/BlogDetail.jsx
import Sidebar from "./Sidebar";
import PostMetaAndComments from "./PostMetaAndComments";
import "./BlogDetail.css";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiBookLight } from "react-icons/pi";
import { LuMessageCircle } from "react-icons/lu";

const BlogDetail = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="single-post-hero">
        <div className="single-hero-inner">
          <div className="single-meta-row">
            <div className="single-date">
              <span className="day">06</span>
              <span className="month">JUN</span>
            </div>
            <span className="meta-item">John Smith</span>
            <span className="meta-item">
              <MdOutlineLibraryBooks /> Blog, Uncategorized
            </span>
            <span className="meta-item">
              <PiBookLight /> Nature, News
            </span>
            <span className="meta-item">
              <LuMessageCircle /> 5
            </span>
          </div>
          <h1 className="single-post-title">Pack wisely before traveling</h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="single-post-body">
        <div className="post-wrapper">
          {/* LEFT COLUMN: Article + Comments Form */}
          <div className="post-content-wrapper">
            <article className="post-content">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                alt="Main visual"
                className="main-post-img"
              />
              
              <p>A wonderful serenity has taken possession of my entire soul...</p>
              <p>I am alone, and feel the charm of existence in this spot...</p>
              
              <blockquote className="quote-default">
                Travel makes one modest. You see what a tiny place you occupy in the world.
              </blockquote>
              
              <p>When, while the lovely valley teems with vapour around me...</p>
              
              <div className="secondary-section">
                <div className="quote-light">
                  I sink under the weight of the splendour of these visions...
                </div>
                <p>I sink under the weight of the splendour of these visions...</p>
                <h3>I throw myself down among the tall grass</h3>
                <p>I should be incapable of drawing a single stroke vapour around me...</p>
                <h3>I throw myself down among the tall grass</h3>
                <p>I sink under the weight of the splendour of these visions!...</p>
                
                <img
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80"
                  alt="Second visual"
                  className="secondary-img"
                />
                
                <h3>Text, that where it came from it</h3>
                <p>Far far away, behind the word mountains...</p>
                
                <ul className="post-list">
                  <li>Far far away, behind the word mountain</li>
                  <li>When she reached the first hills</li>
                  <li>A small river named Duden flows</li>
                  <li>A small river named Duden flows by their plat.</li>
                  <li>Far far away, behind the word mountain</li>
                </ul>
                <p>Copy Writers ambushed her...</p>
              </div>
              
              <div className="tag-buttons">
                <a href="#" className="tag-btn">Nature</a>
                <a href="#" className="tag-btn">News</a>
              </div>
              
              <PostMetaAndComments />
            </article>
            
            {/* COMMENT FORM - NOW CORRECTLY PLACED INSIDE LEFT COLUMN */}
            <section className="comment-section">
              <h3 className="comment-title">LEAVE A REPLY</h3>
              <form className="comment-form">
                <textarea placeholder="Comment*" required></textarea>
                <div className="comment-row">
                  <input type="text" placeholder="Name*" required />
                  <input type="email" placeholder="Email*" required />
                </div>
                <input type="text" placeholder="Website" />
                <label className="comment-checkbox">
                  <input type="checkbox" />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>
                <button type="submit">POST COMMENT</button>
              </form>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;