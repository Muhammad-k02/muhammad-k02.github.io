import './ProfessionPage.scss';

import $ from 'jquery';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfessionPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const particlesRef = useRef([]);

  class Particle {
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
  }

  const initParticleAnimation = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    particleCanvasRef.current = canvas;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < 100; i++) {
      particlesRef.current.push(new Particle(canvas));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update();
        particlesRef.current[i].draw(ctx);
        if (particlesRef.current[i].size <= 0.2) {
          particlesRef.current.splice(i, 1);
          i--;
          particlesRef.current.push(new Particle(canvas));
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Append canvas to fullpage
    const fullpage = document.querySelector('.fullpage');
    fullpage.appendChild(canvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.remove();
    };
  };

  useEffect(() => {
    // Wait for the container to be mounted
    setTimeout(() => {
      if (containerRef.current) {
        blackhole('#blackhole');
      }
    }, 0);

    return () => {
      // Cleanup event listeners
      $('.centerHover').off('click mouseover mouseout');
      // Cancel animation frame if it exists
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Remove particle canvas if it exists
      if (particleCanvasRef.current) {
        particleCanvasRef.current.remove();
      }
    };
  }, []);

  function blackhole(element) {
    const $element = $(element);
    const h = $element.height() || window.innerHeight;
    const w = $element.width() || window.innerWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 400; // Increased from 255 to 400 for larger radius
    const centery = ch/2;
    const centerx = cw/2;

    const startTime = new Date().getTime();
    let currentTime = 0;

    const stars = [];
    let collapse = false; // if hovered
    let expanse = false; // if clicked

    // Create and append canvas
    if (canvasRef.current) {
      $(canvasRef.current).remove();
    }
    const canvas = $('<canvas/>').attr({
      width: cw,
      height: ch
    });
    canvasRef.current = canvas.get(0);
    $element.append(canvas);

    const context = canvas.get(0).getContext('2d');
    context.globalCompositeOperation = 'multiply';

    // Define requestFrame
    const requestFrame = (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    ).bind(window);

    function setDPI(canvas, dpi) {
      if (!canvas.get(0).style.width)
        canvas.get(0).style.width = canvas.get(0).width + 'px';
      if (!canvas.get(0).style.height)
        canvas.get(0).style.height = canvas.get(0).height + 'px';

      var scaleFactor = dpi / 96;
      canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
      canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
      var ctx = canvas.get(0).getContext('2d');
      ctx.scale(scaleFactor, scaleFactor);
    }

    function rotate(cx, cy, x, y, angle) {
      var radians = angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
      return [nx, ny];
    }

    var star = function() {
      var rands = [];
      rands.push(Math.random() * (maxorbit/2) + 1);
      rands.push(Math.random() * (maxorbit/2) + maxorbit);

      this.orbital = (rands.reduce(function(p, c) {
        return p + c;
      }, 0) / rands.length);

      this.x = centerx;
      this.y = centery + this.orbital;
      this.yOrigin = centery + this.orbital;
      this.speed = (Math.floor(Math.random() * 2.5) + 1.5)*Math.PI/180;
      this.rotation = 0;
      this.startRotation = (Math.floor(Math.random() * 360) + 1)*Math.PI/180;
      this.id = stars.length;
      this.collapseBonus = this.orbital - (maxorbit * 0.7);
      
      if(this.collapseBonus < 0) {
        this.collapseBonus = 0;
      }

      stars.push(this);
      this.color = 'rgba(255,255,255,'+ Math.min(1, (1 - ((this.orbital) / maxorbit)) + 0.5) +')';
      this.hoverPos = centery + (maxorbit/2) + this.collapseBonus;
      this.expansePos = centery + (this.id%100)*-10 + (Math.floor(Math.random() * 20) + 1);
      this.prevR = this.startRotation;
      this.prevX = this.x;
      this.prevY = this.y;
    };

    star.prototype.draw = function() {
      if(!expanse) {
        this.rotation = this.startRotation + (currentTime * this.speed);
        if(!collapse) {
          if(this.y > this.yOrigin) {
            this.y-= 2.5;
          }
          if(this.y < this.yOrigin-4) {
            this.y+= (this.yOrigin - this.y) / 10;
          }
        } else {
          this.trail = 1;
          if(this.y > this.hoverPos) {
            this.y-= (this.hoverPos - this.y) / -5;
          }
          if(this.y < this.hoverPos-4) {
            this.y+= 2.5;
          }
        }
      } else {
        this.rotation = this.startRotation + (currentTime * (this.speed / 2));
        if(this.y > this.expansePos) {
          this.y-= Math.floor(this.expansePos - this.y) / -140;
        }
      }

      context.save();
      context.fillStyle = this.color;
      context.strokeStyle = this.color;
      context.beginPath();
      var oldPos = rotate(centerx,centery,this.prevX,this.prevY,-this.prevR);
      context.moveTo(oldPos[0],oldPos[1]);
      context.translate(centerx, centery);
      context.rotate(this.rotation);
      context.translate(-centerx, -centery);
      context.lineTo(this.x,this.y);
      context.stroke();
      context.restore();

      this.prevR = this.rotation;
      this.prevX = this.x;
      this.prevY = this.y;
    };

    function loop() {
      const now = new Date().getTime();
      currentTime = (now - startTime) / 50;

      context.fillStyle = 'rgba(25,25,25,0.2)';
      context.fillRect(0, 0, cw, ch);

      for(let i = 0; i < stars.length; i++) {
        if(stars[i] !== stars) {
          stars[i].draw();
        }
      }

      animationRef.current = requestFrame(loop);
    }

    function init() {
      context.fillStyle = 'rgba(25,25,25,1)';
      context.fillRect(0, 0, cw, ch);
      
      // Clear existing stars
      stars.length = 0;
      
      // Create new stars
      for(let i = 0; i < 2500; i++) {
        new star();
      }
      
      // Start the animation loop
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      loop();
    }

    // Set up event handlers
    const $centerHover = $('.centerHover');
    
    $centerHover.on('click', function() {
      collapse = false;
      expanse = true;
      $(this).addClass('open');
      
      // Add fade classes to elements that should disappear
      $('#blackhole').addClass('fade');
      $('.title').addClass('fade');
      $('.container').addClass('fade');
      
      // Invert colors
      $('.profession-page').addClass('inverted');
      
      // Show fullpage and initialize particle animation
      $('.fullpage').addClass('open');
      initParticleAnimation();
      
      // Show cards, title and exit text after a delay
      setTimeout(() => {
        $('.cards-container').addClass('visible');
        $('.professional-title').addClass('visible');
        $('.exit-text').addClass('visible');
      }, 800);
      
      setTimeout(function() {
        $('.header .welcome').removeClass('gone');
      }, 500);
    });

    // Add exit handler
    $('.exit-text').on('click', function() {
      // Prevent multiple clicks
      if ($(this).hasClass('transitioning')) return;
      $(this).addClass('transitioning');

      // First phase: Hide UI elements
      $('.cards-container').removeClass('visible');
      $('.professional-title').removeClass('visible');
      $('.exit-text').removeClass('visible');

      // Cancel any existing animations
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      // Remove particle animation
      if (particleCanvasRef.current) {
        particleCanvasRef.current.remove();
        particleCanvasRef.current = null;
      }

      // Second phase: Reset state and restore original view
      setTimeout(() => {
        // Remove inversion
        $('.profession-page').removeClass('inverted');
        
        // Reset state variables
        collapse = false;
        expanse = false;

        // Clear canvas and prepare for new animation
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Show original elements with proper timing
        setTimeout(() => {
          $('#blackhole').removeClass('fade');
          $('.title').removeClass('fade');
          $('.container').removeClass('fade');
          $('.centerHover').removeClass('open');
          $('.fullpage').removeClass('open');
          
          // Start fresh animation cycle
          stars.length = 0;
          for(let i = 0; i < 2500; i++) {
            new star();
          }
          if (!animationRef.current) {
            loop();
          }
          
          // Remove transitioning state
          $('.exit-text').removeClass('transitioning');
        }, 100);
      }, 500);
    });

    $centerHover.on('mouseover', function() {
      if(expanse === false) {
        collapse = true;
      }
    });

    $centerHover.on('mouseout', function() {
      if(expanse === false) {
        collapse = false;
      }
    });

    // Initialize
    setDPI(canvas, 192);
    init();

    // Handle window resize
    const handleResize = () => {
      const newWidth = $element.width() || window.innerWidth;
      const newHeight = $element.height() || window.innerHeight;
      canvas.attr({
        width: newWidth,
        height: newHeight
      });
      init();
    };

    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }

  return (
    <div className="profession-page">
      <div className="back-button" onClick={() => navigate('/about')}>Back</div>
      <h1 className="title">Singularity</h1>
      <h2 className="professional-title">Professional Expertise</h2>
      <div id="blackhole" ref={containerRef}></div>
      <div className="container">
        <div className="blackhole">
          <div className="megna">
            <div className="black"></div>
          </div>
        </div>
      </div>
      <div className="centerHover">
        <span>Enter</span>
      </div>
      <div className="fullpage">
        <div className="cards-container">
          <div className="card">
            <h2>Technical Expertise</h2>
            <div className="content">
              <div className="item"><strong>Program:</strong> Proficient in Python and Java, with experience in developing scalable software and research-driven projects.</div>
              <div className="item"><strong>Specialize:</strong> Focus on computer vision, natural language processing, and ethical AI development.</div>
              <div className="item"><strong>Analyze:</strong> Extract insights and develop algorithms for complex datasets.</div>
              <div className="item"><strong>Engineer:</strong> Apply software design principles, object-oriented programming, and develop interpreters.</div>
              <div className="item"><strong>Implement:</strong> Integrate custom functions into existing codebases for compatibility and performance optimization.</div>
            </div>
          </div>
          <div className="card">
            <h2>Academic & Professional Contributions</h2>
            <div className="content">
              <div className="item"><strong>Publish:</strong> Author and contribute to peer-reviewed research, including work on misinformation and social media.</div>
              <div className="item"><strong>Collaborate:</strong> Work on interdisciplinary projects such as violence detection and MiniJS language interpreters.</div>
              <div className="item"><strong>Achieve:</strong> Earn honors like John F. Grant Scholarship and Dean's List recognition.</div>
              <div className="item"><strong>Educate:</strong> Study Software Engineering with a Philosophy minor as a senior at Loyola University Chicago.</div>
              <div className="item"><strong>Certify:</strong> Hold certifications in health privacy and research ethics, emphasizing professionalism in data management for research purposes.</div>
            </div>
          </div>
          <div className="card">
            <h2>Ethical and Philosophical Impact</h2>
            <div className="content">
              <div className="item"><strong>Ensure:</strong> Align AI and technology with societal well-being and human values.</div>
              <div className="item"><strong>Detect:</strong> Focus on real-world applications like using AI to identify and mitigate violence.</div>
              <div className="item"><strong>Advocate:</strong> Promote socially responsible AI, balancing innovation with ethical considerations.</div>
              <div className="item"><strong>Mentor:</strong> Share knowledge and support peers to foster collaborative and informed environments.</div>
              <div className="item"><strong>Merge:</strong> Combine philosophical inquiry with technical expertise to address abstract challenges in technology.</div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="welcome gone">
            {/* Content will go here */}
          </div>
        </div>
        <div className="exit-text">I want to leave the Singularity</div>
      </div>
    </div>
  );
}

export default ProfessionPage;
