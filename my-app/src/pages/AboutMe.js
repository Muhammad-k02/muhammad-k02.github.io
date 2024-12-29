import './AboutMe.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Using local images from public assets
const IMAGES = {
  ceramics: process.env.PUBLIC_URL + '/assets/ceramics/Hand1.png',
  philosophy: process.env.PUBLIC_URL + '/assets/about/philosophy-preview.png',
  profession: process.env.PUBLIC_URL + '/assets/about/profession-preview.png'
};

const PANELS = [
  {
    id: 'ceramics',
    title: 'CERAMICS',
    subtitle: 'EXPLORE MY WORK',
    path: '/about/ceramics',
    image: 'ceramics'
  },
  {
    id: 'mission',
    title: 'MISSION STATEMENT',
    subtitle: 'MY PHILOSOPHY',
    path: '/about/mission',
    image: 'philosophy'
  },
  {
    id: 'profession',
    title: 'PROFESSION',
    subtitle: 'MY EXPERTISE',
    path: '/about/profession',
    image: 'profession'
  }
];

const AboutMe = () => {
  const navigate = useNavigate();
  const [imageLoadError, setImageLoadError] = useState({});

  const handleImageError = (imageKey) => {
    console.error(`Failed to load image: ${IMAGES[imageKey]}`);
    setImageLoadError(prev => ({ ...prev, [imageKey]: true }));
  };

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="about-me">
      <button className="back-button" onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <div className="panels">
        <div className="panels__container">
          {PANELS.map(panel => (
            <a 
              key={panel.id}
              href="#" 
              className="panel" 
              onClick={(e) => handleNavigation(panel.path, e)}
            >
              <div 
                className="panel__content" 
                style={{ 
                  backgroundImage: !imageLoadError[panel.image] ? `url("${IMAGES[panel.image]}")` : 'none',
                  backgroundColor: imageLoadError[panel.image] ? '#2a2a2a' : 'transparent'
                }}
              >
                <img 
                  src={IMAGES[panel.image]} 
                  alt="" 
                  style={{ display: 'none' }} 
                  onError={() => handleImageError(panel.image)}
                />
                <div className="panel__titles">
                  <h3 className="panel__title">{panel.title}</h3>
                  <h4 className="panel__subtitle">{panel.subtitle}</h4>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
