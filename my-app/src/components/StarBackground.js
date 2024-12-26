import '../styles/StarBackground.scss';

import React from 'react';

const inRange = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const StarBackground = () => {
  const geminidAmount = 15;
  const starAmount = 35;

  const geminids = Array.from({ length: geminidAmount }, (_, g) => {
    const angle = inRange(45, 95);
    const speed = inRange(8, 20);
    const delay = inRange(1, 25);
    const x = inRange(0, 80);
    const y = inRange(0, 25);
    const travel = inRange(10, 50);
    const trail = inRange(1, 5);

    return {
      id: g,
      angle,
      speed,
      delay,
      x,
      y,
      travel,
      trail
    };
  });

  const stars = Array.from({ length: starAmount }, (_, s) => {
    const x = inRange(0, 100);
    const y = inRange(0, 100);
    const opacity = inRange(0, 100) / 100;
    const scale = inRange(0, 3);

    return {
      id: s,
      x,
      y,
      opacity,
      scale
    };
  });

  return (
    <div className="star-background">
      {geminids.map((geminid) => (
        <div 
          key={geminid.id} 
          className="geminid" 
          style={{
            '--angle': geminid.angle,
            '--speed': geminid.speed,
            '--delay': geminid.delay,
            '--x': geminid.x,
            '--y': geminid.y,
            '--travel': geminid.travel,
            '--trail': geminid.trail
          }}
        >
          <div className="geminid__trail"></div>
        </div>
      ))}
      {stars.map((star) => (
        <div 
          key={star.id} 
          className="star" 
          style={{
            '--x': star.x,
            '--y': star.y,
            '--opacity': star.opacity,
            '--scale': star.scale
          }}
        ></div>
      ))}
    </div>
  );
};

export default StarBackground;
