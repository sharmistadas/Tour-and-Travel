import React from 'react';
import './Card.css';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`content-card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
