import React from "react";
import ServicesBanner from "../components/ServicesBanner";
import ServicesHero from "../components/ServicesHero";
import ServicesFeature from "../components/ServicesFeature";
import ServicesList from "../components/ServicesList";
import ServicesQueries from "../components/ServicesQueries";
import ServicesReview from "../components/ServicesReview";

function Services() {
  return (
    <div>
      <ServicesBanner />
      <ServicesHero />
      <ServicesFeature />
      <ServicesList />
      <ServicesQueries />
      <ServicesReview />
      
    </div>
  );
}

export default Services;
