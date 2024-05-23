import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me" id="home">
      <div className="about-me-content">
        <img src="https://sumeetbidhan.netlify.app/assets/profile_img-CDm5TZck.svg" alt="Profile" className="profile-img" />
        <div className="about-me-text">
          <h2>Discover the Data Wizardry!</h2>
          <p>
          Welcome to my data visualization site! My name is Sumeet Bidhan, and I am passionate about creating informative and visually appealing data representations. As an avid developer and data enthusiast, I have curated a collection of exciting projects that showcase the power of data visualization. Dive into the Indian Vaccine Dose Distribution to explore vaccination efforts across India, or check out the Annual Mean Temperature project to see climate trends over the years. Don't miss the Property Prices in Ahmedabad visualization for a deep dive into real estate trends. With a keen eye for design and a flair for storytelling through data, I aim to make complex information accessible and engaging for everyone. Explore these projects and uncover the fascinating stories hidden within the numbers!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
