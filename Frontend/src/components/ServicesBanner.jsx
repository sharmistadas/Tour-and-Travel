import React from 'react'
import "./ServicesBanner.css"
function ServicesBanner() {
  return (
       <section
      className="services-banner"
      style={{
        backgroundImage: "url(/images/section-bg-4.png)",
      }}
    >
      <div className="services-banner-overlay">
        <div className="services-banner-content">
          <h1>Services We Provide</h1>
          <p>A small river named Duden flows by their place.</p>
        </div>
      </div>
    </section>
  )
}

export default ServicesBanner