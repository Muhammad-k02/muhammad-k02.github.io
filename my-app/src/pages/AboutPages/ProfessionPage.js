import './ProfessionPage.scss';

import $ from 'jquery';
import React, { useEffect, useRef } from 'react';

function ProfessionPage() {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);

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
    };
  }, []);

  function blackhole(element) {
    const $element = $(element);
    const h = $element.height() || window.innerHeight;
    const w = $element.width() || window.innerWidth;
    const cw = w;
    const ch = h;
    const maxorbit = 255; // distance from center
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
      this.color = 'rgba(255,255,255,'+ (1 - ((this.orbital) / 255)) +')';
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
      $('.fullpage').addClass('open');
      setTimeout(function() {
        $('.header .welcome').removeClass('gone');
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
      <div id="blackhole" ref={containerRef}></div>
      <div className="centerHover">
        <span>Enter</span>
      </div>
      <div className="fullpage">
        <div className="header">
          <div className="welcome gone">
            {/* Content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionPage;
