import BlogHero from "../components/BlogComponents/BlogHero";
import BlogCard from "../components/BlogComponents/BlogCard";
import Sidebar from "../components/BlogComponents/Sidebar";
import "./Blog.css";

const blogData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    title: "Tips For Taking A Long-Term Trip",
    date: "June 6, 2016",
    author: "John Smith",
    desc: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be...."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    title: "Everything You Need To Know Before Visiting Japan",
    date: "June 4, 2016",
    author: "John Smith",
    desc: "Donec ullamcorper nulla non metus auctor fringilla A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be...."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=85",
    title: "Top 10 European Cities You Should Visit",
    date: "June 2, 2016",
    author: "John Smith",
    desc: "Maecenas faucibus mollis interdum A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be...."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    title: "Best Beaches In The World",
    date: "May 30, 2016",
    author: "John Smith",
    desc: "Cras mattis consectetur purus sit amet fermentum A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be...."
  }
];

const Blog = () => {
  return (
    <>
      <BlogHero />

      <section className="blog-wrapper">
        <div className="blog-content">
          <div className="blog-list">
            {blogData.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="sidebar">
          <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
