import React from 'react'
import "./HomePageExplore.css"
import { Link } from 'react-router-dom'

export default function HomePageExplore() {
  return (
    <div className="home-message">
        <h1>Indulge Your Senses in Culinary Delights</h1>
        <p>Discover a world of flavors that dance on your palate. From delectable bites to mouthwatering meals, embark on a culinary journey that satisfies every craving.</p>
        <Link to="/search" className="cta-button">Explore More</Link>
    </div>
  )
}
