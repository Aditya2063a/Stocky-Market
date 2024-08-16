import React, { useContext, useEffect } from 'react';
import UserContext from '../dashboard/context/UserContext';
import '../styles/bg.css';
import '../styles/about-style.css';

const AboutUs = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const animateText = () => {
      const elements = document.querySelectorAll('.about-us-text');
      elements.forEach(element => {
        element.classList.add('animate-text');
      });
    };

    // Wait for content to render, then apply animation
    setTimeout(() => {
      animateText();
    }, 100); // Adjust timeout as needed based on your content loading speed
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section className="relative h-screen">
      <div className="absolute top-0 left-0 w-full h-full background-image"></div>
      <div className="absolute top-0 left-0 w-full h-full black-overlay"></div>

      <div className="max-w-4xl mx-auto p-8 ml-0 relative z-10 text-white">
        <h2 className="text-6xl font-bold mb-8 about-us-text">About Us</h2>
        <p className="text-lg mb-4 about-us-text font-bold">
          Welcome to our world of innovation and analytics! We are a dedicated team of students from IIT Mandi, passionate about revolutionizing the stock market with cutting-edge machine learning technologies. Our journey is fueled by a commitment to harnessing data-driven insights for informed investment decisions.
        </p>
        <p className="text-lg mb-4 about-us-text font-bold">
          At the heart of our project lies a deep-rooted ambition to merge the realms of finance and artificial intelligence, paving the way for smarter, more efficient market strategies. Through meticulous research and rigorous analysis, we aim to empower investors with predictive models that enhance their trading experiences.
        </p>
        <p className="text-lg mb-4 about-us-text font-bold">
          Join us on this exciting voyage as we explore the frontiers of stock market analytics, driven by a relentless pursuit of excellence and innovation.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
