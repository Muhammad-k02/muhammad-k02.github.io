import React from 'react';
import styles from './StarBackground.module.css';

const StarBackground = () => {
  return (
    <div className={styles.stars}>
      {[...Array(50)].map((_, index) => (
        <div key={index} className={styles.star}></div>
      ))}
    </div>
  );
};

export default StarBackground;
