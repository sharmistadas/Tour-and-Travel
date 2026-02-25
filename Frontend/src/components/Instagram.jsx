import "./Instagram.css";

export default function Instagram() {
  const images = [
    "/images/categories/img07.png",
    "/images/categories/img08.png",
    "/images/categories/img09.png",
    "/images/categories/img10.png",
    "/images/categories/img11.png",
  ];

  return (
    <section className="instagram">
      <h4>INSTAGRAM</h4>
      <div className="insta-grid">
        {images.map((img, i) => (
          <img src={img} key={i} alt="instagram" />
        ))}
      </div>

    </section>
  );
}
