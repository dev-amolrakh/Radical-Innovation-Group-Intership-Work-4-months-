// App.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import img6 from './images/img6.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/bhojanam');
  };
  return (
    <div className="main-container">
      <header className="header">
        <h1>ANNAM</h1>
        <nav>
          <Link to="/">About</Link>
          <Link to="/bhojanam">Projects</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="circle"></div>
        <div className='start-text'>
            <h1>Revolutionize Your Food Choices with AI-Powered Insights</h1>
            <p>Empowering you to make informed, sustainable, and nutritious food decisions that benefit your health, your community, and the planet.</p>
            <button>Learn More About ANNAM</button>
        </div>
      </section>

      <section className="about">
        <h1>About ANNAM</h1>
        <div className="about-cards">
          <div className="card">
            <h4>Our Mission</h4>
            <p>At ANNAM, we are on a mission to revolutionize global food systems through the power of artificial intelligence. We strive to create a world where sustainable, nutritious, and affordable food is accessible to all, while minimizing environmental impact and maximizing resource efficiency.
            </p>
          </div>
          <div className="card">
            <h4>Our Vision</h4>
            <p>We envision a future where AI-driven solutions seamlessly integrate with every aspect of the food chain...We envision a future where Al-driven solutions seamlessly integrate with every aspect of the food chain, from farm to fork. By harnessing the potential of machine learning, data analytics, and automation, we aim to build resilient, transparent, and equitable food systems that nourish both people and planet.</p>
          </div>
          <div className="card">
            <h4>Our Approach</h4>
            <p>ANNAM combines cutting-edge Al technology with deep expertise in food systems to create innovative solutions. We work closely with farmers, food producers, distributors, and consumers to develop tools and strategies that optimize resource use, reduce waste, and promote sustainable practices throughout the entire food value chain.</p>
          </div>
        </div>
      </section>

      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="img6">
            <img src={img6} alt="img6" />
          </div>
      </section>

      <h2 className='project-heading'>ANNAM'S Projects</h2>
      <button className ='project-btn' onClick={handleButtonClick}>
        <div className="project-card">
          <h3>BHOJANAM</h3>
          <p>The Sustainable Breakfast Cereals and Beverages Initiative is a groundbreaking project under the ANNAM (Al-Driven Sustainable Food Systems) platform. This initiative aims to revolutionize the breakfast food industry by promoting sustainability, reducing waste, and engaging communities through innovative Al- driven solutions and digital storytelling.</p>
        </div>
      </button>

      <footer>
        <p>BHOJANAM &copy; 2024, All rights reserved.</p>
        <div className="icons">
        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
    <path d="M11.666,2.005C6.62,2.17,2.374,6.251,2.025,11.288c-0.369,5.329,3.442,9.832,8.481,10.589V14.65H8.892 c-0.726,0-1.314-0.588-1.314-1.314v0c0-0.726,0.588-1.314,1.314-1.314h1.613v-1.749c0-2.896,1.411-4.167,3.818-4.167 c0.357,0,0.662,0.008,0.921,0.021c0.636,0.031,1.129,0.561,1.129,1.198v0c0,0.663-0.537,1.2-1.2,1.2h-0.442 c-1.022,0-1.379,0.969-1.379,2.061v1.437h1.87c0.591,0,1.043,0.527,0.953,1.111l-0.108,0.701c-0.073,0.47-0.477,0.817-0.953,0.817 h-1.762v7.247C18.235,21.236,22,17.062,22,12C22,6.366,17.341,1.821,11.666,2.005z"></path>
</svg></a>
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
    <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
</svg></a>
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
<path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path>
</svg></a>
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
</svg></a>
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
    <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M7.738,17L7.738,17 c-0.697,0-1.262-0.565-1.262-1.262v-4.477C6.477,10.565,7.042,10,7.738,10h0C8.435,10,9,10.565,9,11.262v4.477 C9,16.435,8.435,17,7.738,17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2 S8.551,8.717,7.694,8.717z M16.779,17L16.779,17c-0.674,0-1.221-0.547-1.221-1.221v-2.605c0-1.058-0.651-1.174-0.895-1.174 s-1.058,0.035-1.058,1.174v2.605c0,0.674-0.547,1.221-1.221,1.221h-0.081c-0.674,0-1.221-0.547-1.221-1.221v-4.517 c0-0.697,0.565-1.262,1.262-1.262h0c0.697,0,1.262,0.565,1.262,1.262c0,0,0.282-1.262,2.198-1.262C17.023,10,18,10.977,18,13.174 v2.605C18,16.453,17.453,17,16.779,17z"></path>
</svg></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
