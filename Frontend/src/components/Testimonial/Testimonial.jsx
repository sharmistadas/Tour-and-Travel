import { useState } from "react";
import "./Testimonial.css";

const personImages = [
    "https://preview.colorlib.com/theme/pacific/images/person_1.jpg",
    "https://preview.colorlib.com/theme/pacific/images/person_2.jpg",
    "https://preview.colorlib.com/theme/pacific/images/person_3.jpg",
];

const testimonials = Array.from({ length: 15 }).map((_, i) => ({
    text:
        "Far far away, behind the word mountains far from the countries Vokalia and Consonantia.",
    name: "Roger Scott",
    role: "Marketing Manager",
    img: personImages[i % 3],
}));

const CARDS_PER_PAGE = 3;
const TOTAL_DOTS = 5;

function Testimonial() {
    const [page, setPage] = useState(0);

    return (
        <section className="testimonial-section">
            <div className="overlay"></div>

            <div className="testimonial-content animate-up-testimonial">
                <span className="subtitle">Testimonial</span>
                <h2 className="text-white">Tourist Feedback</h2>

                <div className="slider-wrapper">
                    <div
                        className="testimonial-track"
                        style={{ transform: `translateX(-${page * 100}%)` }}
                    >
                        {Array.from({ length: TOTAL_DOTS }).map((_, pageIndex) => (
                            <div className="testimonial-page" key={pageIndex}>
                                {testimonials
                                    .slice(
                                        pageIndex * CARDS_PER_PAGE,
                                        pageIndex * CARDS_PER_PAGE + CARDS_PER_PAGE
                                    )
                                    .map((item, i) => (
                                        <div className="testimonial-card" key={i}>
                                            <div className="stars">★★★★★</div>
                                            <p>{item.text}</p>

                                            <div className="person">
                                                <img src={item.img} alt={item.name} />
                                                <div>
                                                    <h4>{item.name}</h4>
                                                    <span>{item.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dots">
                    {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
                        <span
                            key={i}
                            className={page === i ? "active" : ""}
                            onClick={() => setPage(i)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
