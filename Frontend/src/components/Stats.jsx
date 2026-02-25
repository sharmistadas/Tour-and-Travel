import { useEffect, useRef, useState } from "react";
import "./Stats.css";

const statsData = [
  { value: 20000, label: "Customers", suffix: "+" },
  { value: 1400, label: "Projects" },
  { value: 16800, label: "Working Hours" },
  { value: 17000, label: "SKUs" },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(sectionRef.current);
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-overlay" />

      <div className="stats-container">
        {statsData.map((item, i) => (
          <StatItem key={i} {...item} start={start} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ value, label, suffix = "", start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = Math.ceil(value / 100);

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(current);
    }, 20);

    return () => clearInterval(timer);
  }, [start, value]);

  return (
    <div className="stat-item">
      <h2>
        {count}
        {suffix}
      </h2>
      <p>{label}</p>
    </div>
  );
}
