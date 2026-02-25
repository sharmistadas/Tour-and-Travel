import React from "react";
import "./RecentPost.css";

const posts = [
    {
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=320&fit=crop",
        title: "Most Popular Place In This World",
        date: "11",
        month: "September",
        year: "2020",
    },
    {
        img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=320&fit=crop",
        title: "Top Travel Destinations for 2020",
        date: "11",
        month: "September",
        year: "2020",
    },
    {
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=320&fit=crop",
        title: "Hidden Gems Around the Globe",
        date: "11",
        month: "September",
        year: "2020",
    },
];

const RecentPost = () => {
    return (
        <section className="recent-post">
            <p className="badge-title">Our Blog</p>
            <h2 className="section-title">Recent Post</h2>

            <div className="post-grid">
                {posts.map((post) => (
                    <div className="post-card p-2" key={post.title}>
                        <div className="post-img">
                            <img src={post.img} alt={`Blog: ${post.title}`} />

                            <div className="date-badge">
                                <span className="day">{post.date}</span>
                                <div className="date-text">
                                    <span>{post.year}</span>
                                    <span>{post.month}</span>
                                </div>
                            </div>
                        </div>

                        <div className="post-content">
                            <h3>{post.title}</h3>
                            <button>Read more</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentPost;
