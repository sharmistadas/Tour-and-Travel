import { useState } from "react";
import "./Gallery.css";
// import Navbar from "../components/Navbar";

import img1 from "../assets/images/Gallery1.jpg";
import img2 from "../assets/images/Gallery2.jpg";
import img3 from "../assets/images/Gallery3.jpg";
import img4 from "../assets/images/Gallery4.jpg";
import img5 from "../assets/images/Gallery5.jpg";
import img6 from "../assets/images/Gallery6.jpg";
import img7 from "../assets/images/Gallery7.jpg";
import img8 from "../assets/images/Gallery8.jpg";
import img9 from "../assets/images/Gallery9.jpg";
import img10 from "../assets/images/Gallery10.jpg";
import img11 from "../assets/images/Gallery11.jpg";
import img12 from "../assets/images/Gallery12.jpg";
import img13 from "../assets/images/Gallery13.jpg";
import img14 from "../assets/images/Gallery14.jpg";
import img15 from "../assets/images/Gallery15.jpg";
import img16 from "../assets/images/Gallery16.jpg";

const images = [
  { src: img1, title: "Uluwatu Cliff Temple, Bali" },
  { src: img2, title: "Limestone Cliffs & Jungle Coast" },
  { src: img3, title: "Tikal Ruins, Guatemala" },
  { src: img4, title: "Mount Bromo Volcano, Indonesia" },

  { src: img5, title: "Uluwatu Cliff Temple, Bali" },
  { src: img6, title: "Great Wall of China" },
  { src: img7, title: "Bali Elephant Sanctuary" },
  { src: img8, title: "Tropical Beach & Palm Trees" },

  { src: img9, title: "Temple of Heaven, Beijing" },
  { src: img10, title: "Sunset Viewpoint Over Islands" },
  { src: img11, title: "Atlas Moth on Hand" },
  { src: img12, title: "Mountain Lake Reflection" },

  { src: img13, title: "Great Wall of China (Mountain Section)" },
  { src: img14, title: "Hiker at Mountain Summit" },
  { src: img15, title: "Volcanic Landscape Above Clouds" },
  { src: img16, title: "Traditional Stone Huts Village" },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      <section className="gallery-hero">
        {/* <div className="nav-section">
          <Navbar />
        </div> */}

        <div className="gallery-overlay">
          <h1>GALLERY</h1>
          <p>Some pictures from our travels</p>
        </div>
        <div className="torn-edge"></div>
      </section>

      <section className="gallery-grid">
        {images.map((img, index) => (
          <div
            className="gallery-item"
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            <img src={img.src} alt={img.title} />
            <div className="gallery-hover">
              <span>⤢</span>
              <p>{img.title}</p>
            </div>
          </div>
        ))}
      </section>

      {activeIndex !== null && (
        <div className="lightbox" onClick={close}>
          <span className="close">×</span>

          <span
            className="nav left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </span>

          <img
            src={images[activeIndex].src}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />

          <span
            className="nav right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </span>
        </div>
      )}
    </>
  );
}
