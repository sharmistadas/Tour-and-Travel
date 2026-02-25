import "./HeroAbout.css";
import { useState } from "react";

function HeroAbout() {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <section className="hero-about-section">

            <div className="hero-bg">
                <div className="play-circle" onClick={() => setShowVideo(true)}>
                    <span>▶</span>
                </div>
            </div>

            {showVideo && (
                <div className="video-modal" onClick={() => setShowVideo(false)}>
                    <div className="video-box">
                        <iframe
                            src="https://www.youtube.com/embed/Scxs7L0vhZ4?autoplay=1"
                            title="Travel Video"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <div className="about-area">

                <div>
                    <div className="about-image-card">
                        <img
                            src="https://preview.colorlib.com/theme/pacific/images/about-1.jpg"
                            alt="tour"
                        />
                    </div>
                </div>

                <div className="about-text-area animate-up">
                    <span className="about-label">About Us</span>
                    <h1>
                        Make Your Tour <br />
                        Memorable and Safe <br />
                        With Us
                    </h1>
                    <p>
                        Far far away, behind the world mountains, far from the countries
                        vokalia and Consonantia, there live the blind texts. Separated they
                        live in Bookmarksgrove right at the coast of the Semantics, a large
                        language ocean.
                    </p>
                    <button>Book Your Destination</button>
                </div>

            </div>

        </section>
    );
}

export default HeroAbout;
