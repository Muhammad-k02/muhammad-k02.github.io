import '../styles/loading.css';

import React from 'react';

const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner transform-optimized" />
    <div className="loading-progress">
      <div className="loading-progress-bar transform-optimized" />
    </div>
  </div>
);

export default React.memo(LoadingFallback); 