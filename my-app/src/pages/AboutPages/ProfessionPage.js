import './ProfessionPage.scss';

import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function setDPI(canvas, dpi) {
  if (!canvas.get(0).style.width) {
    canvas.get(0).style.width = canvas.get(0).width + 'px';
  }
  if (!canvas.get(0).style.height) {
    canvas.get(0).style.height = canvas.get(0).height + 'px';
  }

  const scaleFactor = dpi / 96;
  canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
  canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
  const ctx = canvas.get(0).getContext('2d');
  ctx.scale(scaleFactor, scaleFactor);
}

// Error Boundary Component
class ProfessionPageErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Use error boundary logging
    if (process.env.NODE_ENV !== 'production') {
      console.error('ProfessionPage Error:', error, errorInfo);
    }
    // Here you would typically log to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <h1>Something went wrong</h1>
          <p>We&apos;re unable to display the animation. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProfessionPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const starsRef = useRef([]);
  const collapseRef = useRef(false);
  const expanseRef = useRef(false);
  const [isAnimationSupported, setIsAnimationSupported] = useState(true);

  // Check for animation support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const isSupported = !!(
      canvas.getContext &&
      canvas.getContext('2d') &&
      window.requestAnimationFrame
    );
    setIsAnimationSupported(isSupported);
  }, []);

  // Accessibility keyboard handlers
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const centerHover = document.querySelector('.centerHover');
      if (centerHover && !centerHover.classList.contains('open')) {
        centerHover.click();
      }
    } else if (event.key === 'Escape') {
      const exitText = document.querySelector('.exit-text');
      if (exitText && exitText.classList.contains('visible')) {
        exitText.click();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Memoize particle class to prevent recreation
  const Particle = useCallback(class {
    constructor(canvas) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }

    draw(ctx) {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // Optimize particle animation with requestAnimationFrame
  const initParticleAnimation = useCallback(() => {
    if (particleCanvasRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    particleCanvasRef.current = canvas;
    const ctx = canvas.getContext('2d', { alpha: true });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with object pooling
    particlesRef.current = Array.from({ length: 100 }, () => new Particle(canvas));

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        if (particle.size <= 0.2) {
          particlesRef.current[index] = new Particle(canvas);
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    const fullpage = document.querySelector('.fullpage');
    fullpage.appendChild(canvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      canvas.remove();
    };
  }, [Particle]);

  // Clean up function to handle all animations
  const cleanupAnimations = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (particleCanvasRef.current) {
      particleCanvasRef.current.remove();
      particleCanvasRef.current = null;
    }
    particlesRef.current = [];
    starsRef.current = [];
  }, []);

  useEffect(() => {
    let mounted = true;

    // Initialize with delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      if (mounted && containerRef.current) {
        blackhole('#blackhole');
      }
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(initTimer);
      cleanupAnimations();
      // Clean up event listeners
      $('.centerHover').off('click mouseover mouseout');
    };
  }, [cleanupAnimations]);

  function blackhole(element) {
    const $element = $(element);
    const h = $element.height() || window.innerHeight;
    const w = $element.width() || window.innerWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 400;
    const centery = ch/2;
    const centerx = cw/2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    // Use refs for state management
    starsRef.current = [];

    // Create and append canvas with performance optimizations
    if (canvasRef.current) {
      $(canvasRef.current).remove();
    }
    const canvas = $('<canvas/>').attr({
      width: cw,
      height: ch
    });
    canvasRef.current = canvas.get(0);
    const context = canvas.get(0).getContext('2d', {
      alpha: true,
      desynchronized: true // Enable desynchronized mode for better performance
    });
    context.globalCompositeOperation = 'multiply';
    $element.append(canvas);

    // Optimize rotation calculations
    const rotatePoint = (cx, cy, x, y, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [
        (cos * (x - cx)) + (sin * (y - cy)) + cx,
        (cos * (y - cy)) - (sin * (x - cx)) + cy
      ];
    };

    // Optimized star class
    class Star {
      constructor() {
        const rands = [
          Math.random() * (maxorbit/2) + 1,
          Math.random() * (maxorbit/2) + maxorbit
        ];
        this.orbital = rands.reduce((p, c) => p + c, 0) / 2;
        this.x = centerx;
        this.y = centery + this.orbital;
        this.yOrigin = this.y;
        this.speed = (Math.random() * 2.5 + 1.5) * Math.PI/180;
        this.rotation = 0;
        this.startRotation = Math.random() * 360 * Math.PI/180;
        this.id = starsRef.current.length;
        this.collapseBonus = Math.max(0, this.orbital - (maxorbit * 0.7));
        this.color = `rgba(255,255,255,${Math.min(1, (1 - (this.orbital / maxorbit)) + 0.5)})`;
        this.hoverPos = centery + (maxorbit/2) + this.collapseBonus;
        this.expansePos = centery + (this.id%100)*-10 + (Math.random() * 20 + 1);
        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }

      draw() {
        if(!expanseRef.current) {
          this.rotation = this.startRotation + (currentTime * this.speed);
          if(!collapseRef.current) {
            if(this.y > this.yOrigin) {
              this.y -= 2.5;
            }
            if(this.y < this.yOrigin-4) {
              this.y += (this.yOrigin - this.y) / 10;
            }
          } else {
            if(this.y > this.hoverPos) {
              this.y -= (this.hoverPos - this.y) / -5;
            }
            if(this.y < this.hoverPos-4) {
              this.y += 2.5;
            }
          }
        } else {
          this.rotation = this.startRotation + (currentTime * (this.speed / 2));
          if(this.y > this.expansePos) {
            this.y -= Math.floor(this.expansePos - this.y) / -140;
          }
        }

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        const oldPos = rotatePoint(centerx, centery, this.prevX, this.prevY, -this.prevR);
        context.moveTo(oldPos[0], oldPos[1]);
        context.translate(centerx, centery);
        context.rotate(this.rotation);
        context.translate(-centerx, -centery);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    // Optimized animation loop
    function loop() {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 50;

      // Use a single path for better performance
      context.fillStyle = 'rgba(25,25,25,0.2)';
      context.fillRect(0, 0, cw, ch);

      // Batch draw calls
      for(let i = 0; i < starsRef.current.length; i++) {
        starsRef.current[i].draw();
      }

      animationRef.current = requestAnimationFrame(loop);
    }

    // Initialize with optimized DPI settings
    function init() {
      context.fillStyle = 'rgba(25,25,25,1)';
      context.fillRect(0, 0, cw, ch);
      
      starsRef.current = Array.from({ length: 2500 }, () => new Star());
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      loop();
    }

    // Event handlers with debounced resize
    const $centerHover = $('.centerHover');
    
    $centerHover.on('click', function() {
      collapseRef.current = false;
      expanseRef.current = true;
      $(this).addClass('open');
      
      $('#blackhole').addClass('fade');
      $('.title').addClass('fade');
      $('.container').addClass('fade');
      $('.profession-page').addClass('inverted');
      $('.fullpage').addClass('open');
      
      initParticleAnimation();
      
      setTimeout(() => {
        $('.cards-container').addClass('visible');
        $('.professional-title').addClass('visible');
        $('.exit-text').addClass('visible');
      }, 800);
    });

    $centerHover.on('mouseover', () => {
      if(!expanseRef.current) {
        collapseRef.current = true;
      }
    });

    $centerHover.on('mouseout', () => {
      if(!expanseRef.current) {
        collapseRef.current = false;
      }
    });

    // Initialize with proper DPI
    setDPI(canvas, 192);
    init();

    // Optimized resize handler with debounce
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = $element.width() || window.innerWidth;
        const newHeight = $element.height() || window.innerHeight;
        canvas.attr({
          width: newWidth,
          height: newHeight
        });
        init();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }

  return (
    <ProfessionPageErrorBoundary>
      <div className="profession-page" role="main">
        {!isAnimationSupported ? (
          <div className="fallback-content" role="alert">
            <p>Your browser doesn&apos;t support the required features for animations.</p>
            <p>Please use a modern browser to view this content.</p>
          </div>
        ) : (
          <>
            <div 
              className="back-button" 
              onClick={() => navigate('/about')}
              onKeyPress={(e) => e.key === 'Enter' && navigate('/about')}
              role="button"
              tabIndex={0}
              aria-label="Go back to about page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </div>
            <h1 className="title" aria-label="Singularity">Singularity</h1>
            <h2 
              className="professional-title" 
              aria-hidden={!expanseRef.current}
            >
              Professional Expertise
            </h2>
            <div 
              id="blackhole" 
              ref={containerRef}
              role="img" 
              aria-label="Interactive black hole animation"
            ></div>
            <div className="container" aria-hidden="true">
              <div className="blackhole">
                <div className="megna">
                  <div className="black"></div>
                </div>
              </div>
            </div>
            <div 
              className="centerHover"
              role="button"
              tabIndex={0}
              aria-label="Enter the singularity experience"
              onKeyPress={handleKeyPress}
            >
              <span>Enter</span>
            </div>
            <div 
              className="fullpage"
              role="region"
              aria-label="Professional expertise content"
            >
              <div 
                className="cards-container"
                role="list"
                aria-label="Professional expertise categories"
              >
                {/* Technical Expertise Card */}
                <div className="card" role="listitem">
                  <h2 id="technical-expertise">Technical Expertise</h2>
                  <div className="content">
                    <div className="item" role="article">
                      <strong>Program:</strong> Proficient in Python and Java, with experience in developing scalable software and research-driven projects.
                    </div>
                    <div className="item" role="article">
                      <strong>Specialize:</strong> Focus on computer vision, natural language processing, and ethical AI development.
                    </div>
                    <div className="item" role="article">
                      <strong>Analyze:</strong> Extract insights and develop algorithms for complex datasets.
                    </div>
                    <div className="item" role="article">
                      <strong>Engineer:</strong> Apply software design principles, object-oriented programming, and develop interpreters.
                    </div>
                    <div className="item" role="article">
                      <strong>Implement:</strong> Integrate custom functions into existing codebases for compatibility and performance optimization.
                    </div>
                  </div>
                </div>
                {/* Academic & Professional Contributions Card */}
                <div className="card" role="listitem">
                  <h2>Academic & Professional Contributions</h2>
                  <div className="content">
                    <div className="item" role="article">
                      <strong>Publish:</strong> Author and contribute to peer-reviewed research, including work on misinformation and social media.
                    </div>
                    <div className="item" role="article">
                      <strong>Collaborate:</strong> Work on interdisciplinary projects such as violence detection and MiniJS language interpreters.
                    </div>
                    <div className="item" role="article">
                      <strong>Achieve:</strong> Earn honors like John F. Grant Scholarship and Dean&apos;s List recognition.
                    </div>
                    <div className="item" role="article">
                      <strong>Educate:</strong> Study Software Engineering with a Philosophy minor as a senior at Loyola University Chicago.
                    </div>
                    <div className="item" role="article">
                      <strong>Certify:</strong> Hold certifications in health privacy and research ethics, emphasizing professionalism in data management for research purposes.
                    </div>
                  </div>
                </div>
                {/* Ethical and Philosophical Impact Card */}
                <div className="card" role="listitem">
                  <h2>Ethical and Philosophical Impact</h2>
                  <div className="content">
                    <div className="item" role="article">
                      <strong>Ensure:</strong> Align AI and technology with societal well-being and human values.
                    </div>
                    <div className="item" role="article">
                      <strong>Detect:</strong> Focus on real-world applications like using AI to identify and mitigate violence.
                    </div>
                    <div className="item" role="article">
                      <strong>Advocate:</strong> Promote socially responsible AI, balancing innovation with ethical considerations.
                    </div>
                    <div className="item" role="article">
                      <strong>Mentor:</strong> Share knowledge and support peers to foster collaborative and informed environments.
                    </div>
                    <div className="item" role="article">
                      <strong>Merge:</strong> Combine philosophical inquiry with technical expertise to address abstract challenges in technology.
                    </div>
                  </div>
                </div>
              </div>
              <div className="header">
                <div className="welcome gone" aria-hidden="true">
                  {/* Content will go here */}
                </div>
              </div>
              <div 
                className="exit-text"
                role="button"
                tabIndex={0}
                aria-label="Exit the singularity experience"
                onKeyPress={handleKeyPress}
                onClick={() => {
                  // Add transitioning class to prevent multiple clicks
                  $('.exit-text').addClass('transitioning');
                  
                  // Reverse the animations
                  collapseRef.current = false;
                  expanseRef.current = false;
                  
                  // Hide the cards and title
                  $('.cards-container').removeClass('visible');
                  $('.professional-title').removeClass('visible');
                  $('.exit-text').removeClass('visible');
                  
                  // After cards fade out, reverse the main animations
                  setTimeout(() => {
                    $('#blackhole').removeClass('fade');
                    $('.title').removeClass('fade');
                    $('.container').removeClass('fade');
                    $('.profession-page').removeClass('inverted');
                    $('.fullpage').removeClass('open');
                    $('.centerHover').removeClass('open');
                    
                    // Remove the particle canvas if it exists
                    if (particleCanvasRef.current) {
                      particleCanvasRef.current.remove();
                      particleCanvasRef.current = null;
                    }
                    
                    // Remove transitioning class
                    $('.exit-text').removeClass('transitioning');
                  }, 800);
                }}
              >
                I want to leave the Singularity
              </div>
            </div>
          </>
        )}
      </div>
    </ProfessionPageErrorBoundary>
  );
}

export default ProfessionPage;
