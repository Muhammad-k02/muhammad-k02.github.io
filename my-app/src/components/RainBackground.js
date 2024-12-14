import React from 'react';
import styles from './RainBackground.module.css';

const RainBackground = () => {
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <div key={index} className={styles.rain}>
          <div className={styles.drop}></div>
          <div className={styles.waves}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.splash}></div>
          <div className={styles.particles}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RainBackground;
