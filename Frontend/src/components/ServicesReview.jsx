import React, { useState, useEffect } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ServicesReview.css";
import { FaChevronLeft, FaChevronRight, FaStar, FaQuoteLeft } from "react-icons/fa";

const ServicesReview = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "David Doe",
      location: "Traveler",
      image: "/images/person-01.png",
      text: "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!",
      rating: 5
    },
    {
      id: 2,
      name: "Brittany Clark",
      location: "San Francisco",
      image: "/images/person-02.png",
      text: "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers.",
      rating: 5
    },
    {
      id: 3,
      name: "Frances Hill",
      location: "San Francisco",
      image: "/images/person-03.png",
      text: "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers.",
      rating: 5
    },
    {
      id: 4,
      name: "Jennth Norz",
      location: "New York City",
      image: "/images/person-04.png",
      text: "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers.",
      rating: 5
    },
    {
      id: 5,
      name: "Jennth Norz",
      location: "New York City",
      image: "/images/person-04.png",
      text: "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers.",
      rating: 5
    },
    {
      id: 6,
      name: "Brittany Clark",
      location: "San Francisco",
      image: "/images/person-02.png",
      text: "The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers.",
      rating: 5
    },
  ];

  // Group members in sets of 2 for desktop
  const chunkedMembers = [];
  for (let i = 0; i < teamMembers.length; i += 2) {
    chunkedMembers.push(teamMembers.slice(i, i + 2));
  }

  // Mobile layout - show all cards vertically without carousel
  if (isMobile) {
    return (
      <div className="review-section-mobile">
        <div className="review-container">
          <div className="review-header">
            <span className="review-label">Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Real experiences from travelers who trusted us with their journey</p>
          </div>

          <div className="review-cards-vertical">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="review-card-mobile" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>
                <div className="review-content">
                  <div className="review-stars">
                    {[...Array(member.rating)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                  <p className="review-text">{member.text}</p>
                </div>
                <div className="reviewer-info">
                  <div className="reviewer-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="reviewer-details">
                    <h4>{member.name}</h4>
                    <span>{member.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout - carousel with 2 cards per slide
  return (
    <div className="review-section-desktop">
      <div className="review-container">
        <div className="review-header">
          <span className="review-label">Testimonials</span>
          <h2>What Our Clients Say</h2>
          <p>Real experiences from travelers who trusted us with their journey</p>
        </div>

        <Carousel
          interval={null}
          pause="hover"
          indicators={true}
          controls={true}
          prevIcon={
            <span className="custom-carousel-icon">
              <FaChevronLeft />
            </span>
          }
          nextIcon={
            <span className="custom-carousel-icon">
              <FaChevronRight />
            </span>
          }
        >
          {chunkedMembers.map((group, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <Row className="justify-content-center carousel-row">
                {group.map((member) => (
                  <Col key={member.id} lg={6} md={6} className="carousel-col">
                    <div className="review-card-desktop">
                      <div className="quote-icon">
                        <FaQuoteLeft />
                      </div>
                      <div className="review-content">
                        <div className="review-stars">
                          {[...Array(member.rating)].map((_, i) => (
                            <FaStar key={i} className="star-icon" />
                          ))}
                        </div>
                        <p className="review-text">{member.text}</p>
                      </div>
                      <div className="reviewer-info">
                        <div className="reviewer-image">
                          <img src={member.image} alt={member.name} />
                        </div>
                        <div className="reviewer-details">
                          <h4>{member.name}</h4>
                          <span>{member.location}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ServicesReview;