import './AboutMe.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AboutMe() {
  const [hideContent, setHideContent] = useState(false);
  const navigate = useNavigate();

  const panelContents = [
    { title: '', description: '', route: '', image: '' },
    { 
      title: 'Ceramics', 
      description: 'Exploring the art of clay and form, transforming raw material into expressive pieces.', 
      route: '/about/ceramics',
      image: '/assets/about/ceramics-preview.jpg'
    },
    { 
      title: 'Philosophy', 
      description: 'A deep exploration of existential questions and critical thinking.', 
      route: '/about/philosophy',
      image: '/assets/about/philosophy-preview.png'
    },
    { 
      title: 'Mission Statement', 
      description: 'Dedicated to continuous learning and creative expression.', 
      route: '/about/mission',
      image: '/assets/about/mission-preview.jpeg'
    },
    { 
      title: 'Profession', 
      description: 'Leveraging technical expertise and creative problem-solving.', 
      route: '/about/profession',
      image: '/assets/about/profession-preview.jpg'
    },
    { title: '', description: '', route: '', image: '' }
  ];

  const handlePanelClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={`about-me-container ${hideContent ? 'hide-content' : ''}`}>
      <button onClick={() => setHideContent(!hideContent)}>
        {hideContent ? 'Show Content' : 'Hide Content'}
      </button>
      <main>
        {panelContents.map((panel, i) => (
          <section 
            key={i} 
            onClick={() => handlePanelClick(panel.route)}
            style={{ 
              cursor: panel.route ? 'pointer' : 'default',
              backgroundImage: panel.image ? `url(${process.env.PUBLIC_URL}${panel.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {(i > 0 && i < 5) && (
              <article>
                <h2>{panel.title}</h2>
                <p>{panel.description}</p>
              </article>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

export default AboutMe;
