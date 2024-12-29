import './MissionStatementPage.scss';

import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCROLL_ITEMS = [
  'empower', 'innovate', 'connect', 'grow', 'explore', 
  'inspire', 'learn', 'uplift', 'create', 'persevere', 
  'build', 'evolve', 'transform', 'lead', 'adapt', 
  'imagine', 'collaborate', 'achieve'
];

const MissionStatementPage = () => {
  const navigate = useNavigate();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showOathTitle, setShowOathTitle] = useState(false);
  const [showEndingSection, setShowEndingSection] = useState(false);
  const scrollContainerRef = useRef(null);
  const introSectionRef = useRef(null);
  const oathSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true);
        setShowScrollIndicator(false);
      }

      if (introSectionRef.current && oathSectionRef.current && scrollContainerRef.current) {
        const introRect = introSectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.abs(introRect.top) / introRect.height;
        setShowOathTitle(scrollProgress > 0.2);

        // Check if we're near the bottom of the scroll
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const scrolledToBottom = scrollHeight - (scrollTop + clientHeight) < 100;
        setShowEndingSection(scrolledToBottom);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [hasScrolled]);

  return (
    <div className="mission-statement-page">
      <svg 
        className="filters" 
        width="1440px" 
        height="300px" 
        viewBox="0 0 1440 300" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <filter id="glow-4" colorInterpolationFilters="sRGB" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur in="SourceGraphic" data-target-blur="4" stdDeviation="4" result="blur4"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="19" stdDeviation="19" result="blur19"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="9" stdDeviation="9" result="blur9"/>
            <feGaussianBlur in="SourceGraphic" data-target-blur="30" stdDeviation="30" result="blur30"/>
            <feColorMatrix in="blur4" result="color-0-blur" type="matrix" values="1 0 0 0 0
                      0 0.9803921568627451 0 0 0
                      0 0 0.9647058823529412 0 0
                      0 0 0 0.8 0"/>
            <feOffset in="color-0-blur" result="layer-0-offsetted" dx="0" dy="0" data-target-offset-y="0"/>
            <feColorMatrix in="blur19" result="color-1-blur" type="matrix" values="0.8156862745098039 0 0 0 0
                      0 0.49411764705882355 0 0 0
                      0 0 0.2627450980392157 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-1-blur" result="layer-1-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur9" result="color-2-blur" type="matrix" values="1 0 0 0 0
                      0 0.6666666666666666 0 0 0
                      0 0 0.36470588235294116 0 0
                      0 0 0 0.65 0"/>
            <feOffset in="color-2-blur" result="layer-2-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-3-blur" type="matrix" values="1 0 0 0 0
                      0 0.611764705882353 0 0 0
                      0 0 0.39215686274509803 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-3-blur" result="layer-3-offsetted" dx="0" dy="2" data-target-offset-y="2"/>
            <feColorMatrix in="blur30" result="color-4-blur" type="matrix" values="0.4549019607843137 0 0 0 0
                      0 0.16470588235294117 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-4-blur" result="layer-4-offsetted" dx="0" dy="16" data-target-offset-y="16"/>
            <feColorMatrix in="blur30" result="color-5-blur" type="matrix" values="0.4235294117647059 0 0 0 0
                      0 0.19607843137254902 0 0 0
                      0 0 0.11372549019607843 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-5-blur" result="layer-5-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-6-blur" type="matrix" values="0.21176470588235294 0 0 0 0
                      0 0.10980392156862745 0 0 0
                      0 0 0.07450980392156863 0 0
                      0 0 0 1 0"/>
            <feOffset in="color-6-blur" result="layer-6-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feColorMatrix in="blur30" result="color-7-blur" type="matrix" values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.68 0"/>
            <feOffset in="color-7-blur" result="layer-7-offsetted" dx="0" dy="64" data-target-offset-y="64"/>
            <feMerge>
              <feMergeNode in="layer-0-offsetted"/>
              <feMergeNode in="layer-1-offsetted"/>
              <feMergeNode in="layer-2-offsetted"/>
              <feMergeNode in="layer-3-offsetted"/>
              <feMergeNode in="layer-4-offsetted"/>
              <feMergeNode in="layer-5-offsetted"/>
              <feMergeNode in="layer-6-offsetted"/>
              <feMergeNode in="layer-7-offsetted"/>
              <feMergeNode in="layer-0-offsetted"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      <button 
        className="back-button" 
        onClick={() => navigate('/about')}
        data-text="Back to About"
      >
        Back to About
      </button>
      <div className="scroll-container" ref={scrollContainerRef}>
        <section className="scroll-section intro-section" ref={introSectionRef}>
          <header>
            <h1>
              To shaping technology as a force for harmony, justice, and human flourishing, guiding progress toward a future where innovation aligns with the deepest values of humanity.
            </h1>
          </header>
          {showScrollIndicator && (
            <div className="scroll-indicator" data-text="Scroll to explore">
              Scroll to explore
            </div>
          )}
        </section>
        <section className="oath-section" ref={oathSectionRef}>
          <div className="sticky-wrapper">
            <h2 className={showOathTitle ? 'visible' : ''} data-text="My oath to:">My oath to:</h2>
            <div className="scroll-items">
              {SCROLL_ITEMS.map((item, index) => (
                <div 
                  key={index} 
                  className="scroll-item"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={`scroll-section ending-section ${showEndingSection ? 'visible' : ''}`}>
          <h2 data-text="...in every endeavor">...in every endeavor</h2>
        </section>
      </div>
    </div>
  );
};

export default MissionStatementPage; 