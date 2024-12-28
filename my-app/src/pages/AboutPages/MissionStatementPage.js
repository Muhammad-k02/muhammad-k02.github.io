import './MissionStatementPage.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Function to generate a unique color based on word
const generateColor = (word) => {
  // Simple hash function to generate a number from string
  const hash = word.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Convert hash to HSL color with controlled saturation and lightness
  const hue = Math.abs(hash % 360);
  return {
    main: `hsl(${hue}, 70%, 50%)`,
    light: `hsl(${hue}, 70%, 70%)`,
    dark: `hsl(${hue}, 70%, 30%)`
  };
};

// Precompute colors for all items
const SCROLL_ITEMS = [
  'empower',
  'innovate',
  'connect',
  'grow',
  'explore',
  'inspire',
  'learn',
  'uplift',
  'create',
  'persevere',
  'build',
  'evolve',
  'transform',
  'lead',
  'adapt',
  'imagine',
  'collaborate',
  'achieve'
].map(item => ({
  text: item,
  colors: generateColor(item)
}));

function MissionStatementPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.querySelector('.mission-statement');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Scroll section configuration - adjust these values to fine-tune the animations
    const scrollConfig = {
      section1: { start: 0, end: 500 },     // Header title
      section2: { start: 500, end: 8000 },  // First section (oath)
      section3: { start: 1200, end: 9600 },  // List items
      section4: { start: 9600, end: 10000 }  // Last section
    };

    // Apply scroll configuration
    Object.entries(scrollConfig).forEach(([section, { start, end }]) => {
      container.style.setProperty(`--scroll-section-${section.slice(-1)}-start`, start);
      container.style.setProperty(`--scroll-section-${section.slice(-1)}-end`, end);
    });

    // Function to update scroll progress
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / totalHeight) * 100;
      
      // Update scroll progress bar
      container.style.setProperty('--scroll-percent', `${progress}%`);
      container.style.setProperty('--scroll-amount', scrollY);
      
      // Hide scroll indicator after scrolling starts
      if (scrollY > 10) {
        scrollIndicator?.classList.add('hidden');
      } else {
        scrollIndicator?.classList.remove('hidden');
      }

      // Debug info - uncomment to see scroll values
      // console.log(`Scroll: ${scrollY}px, Progress: ${progress}%`);
    };

    // Check initial scroll position
    if (window.scrollY > 10) {
      scrollIndicator?.classList.add('hidden');
    }

    // Add scroll event listener with throttling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress(); // Initial call

    // Function to apply color styles
    const applyColorStyles = (colors) => {
      const root = document.documentElement;
      const container = document.querySelector('.mission-statement');
      
      // Apply colors to both document root and container
      [root, container].forEach(element => {
        if (element) {
          element.style.setProperty('--dynamic-color', colors.main);
          element.style.setProperty('--dynamic-color-light', colors.light);
          element.style.setProperty('--dynamic-color-dark', colors.dark);
          element.style.setProperty('--grid-line-color', colors.light);
          element.style.setProperty('--scrollbar-thumb-color', colors.main);
          element.style.setProperty('--scrollbar-track-color', colors.dark);
        }
      });
    };

    // Fallback for browsers that don't support scroll timeline
    if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
      const items = gsap.utils.toArray('ul li');
      
      // Set up scroll triggers for each item
      items.forEach((item, index) => {
        gsap.set(item, { opacity: index !== 0 ? 0.2 : 1 });
        
        // Create timeline for opacity animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'center center+=4lh',
            end: 'center center-=4lh',
            scrub: 0.25,
            onEnter: () => applyColorStyles(SCROLL_ITEMS[index].colors),
            onEnterBack: () => applyColorStyles(SCROLL_ITEMS[index].colors),
            onUpdate: (self) => {
              // Apply color based on progress
              if (self.progress > 0.4 && self.progress < 0.6) {
                applyColorStyles(SCROLL_ITEMS[index].colors);
              }
            }
          }
        });

        tl.to(item, {
          opacity: 1,
          ease: 'none',
          duration: 0.1
        }).to(item, {
          opacity: index !== items.length - 1 ? 0.2 : 1,
          ease: 'none',
          duration: 0.1
        });
      });
    } else {
      // For modern browsers, set up intersection observer for color changes
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              applyColorStyles(SCROLL_ITEMS[index].colors);
            }
          }
        });
      }, {
        root: null,
        threshold: 0.5,
        rootMargin: '-50% 0px -50% 0px'
      });

      // Observe all list items
      document.querySelectorAll('ul li').forEach(item => observer.observe(item));
    }

    // Initial color
    applyColorStyles(SCROLL_ITEMS[0].colors);

    return () => {
      // Cleanup scroll triggers and observers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      const observer = new IntersectionObserver(() => {});
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="mission-statement">
      <button 
        className="back-button" 
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <header>
        <h1 className="fluid">My Mission</h1>
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-icon" />
        </div>
      </header>
      <main>
        <section className="content fluid">
          <h2>
            <span aria-hidden="true">My oath to&nbsp;</span>
            <span className="sr-only">My commitment to excellence</span>
          </h2>
          <ul aria-hidden="true" style={{ '--count': SCROLL_ITEMS.length }}>
            {SCROLL_ITEMS.map((item, index) => (
              <li 
                key={index}
                data-index={index}
                style={{ 
                  '--i': index,
                  '--item-color': item.colors.main,
                  '--item-color-light': item.colors.light,
                  '--item-color-dark': item.colors.dark
                }}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="fluid">...in every endeavour.</h2>
        </section>
      </main>
      <footer>Muhammad Khan &copy; 2024</footer>
    </div>
  );
}

export default MissionStatementPage;
