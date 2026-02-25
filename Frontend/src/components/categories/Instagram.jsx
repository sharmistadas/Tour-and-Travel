import "./Instagram.css";
import { FaInstagram } from "react-icons/fa";

export default function Instagram() {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  ];

  return (
    <section className="instagram">
      <h4><FaInstagram />INSTAGRAM</h4>

      <div className="insta-grid">
        {images.map((img, i) => (
          <img src={img} key={i} alt={`instagram-${i}`} />
        ))}
      </div>
    </section>
  );
}
