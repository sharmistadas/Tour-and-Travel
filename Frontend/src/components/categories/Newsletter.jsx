import "./Newsletter.css";
 
export default function Newsletter() {
  return (
    <section className="newsletter">
      <h2>Newsletter</h2>
      <p>
        Subscribe to my newsletter for the latest blog posts, tips & travel
        guides. Let's stay updated!
      </p>
 
      <div className="newsletter-form">
        <input type="email" placeholder="Email..." />
        <button>SUBSCRIBE</button>
      </div>
    </section>
  );
}