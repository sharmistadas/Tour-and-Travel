import "./FinalQuote.css";

export default function FinalQuote() {
  return (
    <section className="final animate fade-up">
      {/* LEFT */}
      <div className="final-quote">
        <span className="quote-mark">“</span>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics.
        </p>
        <strong>- Matt Swally</strong>
      </div>

      {/* RIGHT */}
      <div className="final-content">
        <span className="final-tagline">The most powerful theme on earth</span>

        <h2 className="tour-title">
          WE ARE A TEAM <br /> OF EXPERT DESIGNERS
        </h2>

        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
        </p>
      </div>
    </section>
  );
}
