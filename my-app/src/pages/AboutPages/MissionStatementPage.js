import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Pane } from 'tweakpane';
import './MissionStatementPage.scss';

gsap.registerPlugin(ScrollTrigger);

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
];


function MissionStatementPage() {
  useEffect(() => {
    const config = {
      theme: 'dark',
      start: gsap.utils.random(0, 100, 1),
      end: gsap.utils.random(900, 1000, 1),
      scroll: true,
    };

    const ctrl = new Pane({
      title: 'Config',
      expanded: true,
    });

    const update = () => {
      document.documentElement.dataset.theme = config.theme;
      document.documentElement.dataset.syncScrollbar = config.scroll;
      document.documentElement.style.setProperty('--start', config.start);
      document.documentElement.style.setProperty('--scroller', config.start);
      document.documentElement.style.setProperty('--end', config.end);
    };

    const sync = (event) => {
      if (
        !document.startViewTransition ||
        event.target.controller.view.labelElement.innerText !== 'Theme'
      )
        return update();
      document.startViewTransition(() => update());
    };

    ctrl.addBinding(config, 'start', {
      label: 'Hue Start',
      min: 0,
      max: 1000,
      step: 1,
    });
    ctrl.addBinding(config, 'end', {
      label: 'Hue End',
      min: 0,
      max: 1000,
      step: 1,
    });
    ctrl.addBinding(config, 'scroll', {
      label: 'Scrollbar',
    });
    ctrl.addBinding(config, 'theme', {
      label: 'Theme',
      options: {
        System: 'system',
        Light: 'light',
        Dark: 'dark',
      },
    });

    ctrl.on('change', sync);
    update();

    // Fallback for browsers that don't support scroll timeline
    if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
      const items = gsap.utils.toArray('ul li');
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        gsap.set(item, { opacity: i !== 0 ? 0.2 : 1 });
        gsap
          .timeline({
            scrollTrigger: {
              scrub: 0.25,
              trigger: item,
              start: 'center center+=4lh',
              end: 'center center-=4lh',
            },
          })
          .to(item, {
            opacity: 1,
            ease: 'none',
            duration: 0.1,
          })
          .to(item, {
            opacity: i !== items.length - 1 ? 0.2 : 1,
            ease: 'none',
            duration: 0.1,
          });
      }

      // Register scrollbar changer
      gsap.fromTo(
        document.documentElement,
        {
          '--scroller': config.start,
        },
        {
          '--scroller': config.end,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.1,
            trigger: 'ul',
            start: 'top center-=1lh',
            end: 'bottom center+=1lh',
          },
        }
      );

      gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0,
        },
        {
          '--chroma': 0.3,
          duration: 0.1,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: 'ul',
            start: 'top center-=2lh',
            end: 'top center',
          },
        }
      );

      gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0.3,
        },
        {
          '--chroma': 0,
          duration: 0.1,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: 'ul',
            start: 'bottom center+=2lh',
            end: 'bottom center+=1lh',
          },
        }
      );
    }

    return () => {
      ctrl.dispose();
    };
  }, []);

  return (
    <div className="mission-statement">
      <header>
        <h1 className="fluid">you can<br />scroll.</h1>
      </header>
      <main>
        <section className="content fluid">
          <h2>
            <span aria-hidden="true">you can&nbsp;</span>
            <span className="sr-only">you can ship things.</span>
          </h2>
          <ul aria-hidden="true" style={{ '--count': SCROLL_ITEMS.length }}>
            {SCROLL_ITEMS.map((item, index) => (
              <li key={index} style={{ '--i': index }}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="fluid">fin.</h2>
        </section>
      </main>
      <footer>ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024</footer>
      <a
        className="bear-link"
        href="https://twitter.com/intent/follow?screen_name=jh3yy"
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg
          className="w-9"
          viewBox="0 0 969 955"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="161.191"
            cy="320.191"
            r="133.191"
            stroke="currentColor"
            strokeWidth="20"
          />
          <circle
            cx="806.809"
            cy="320.191"
            r="133.191"
            stroke="currentColor"
            strokeWidth="20"
          />
          <circle
            cx="695.019"
            cy="587.733"
            r="31.4016"
            fill="currentColor"
          />
          <circle
            cx="272.981"
            cy="587.733"
            r="31.4016"
            fill="currentColor"
          />
          <path
            d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
            fill="currentColor"
          />
          <rect
            x="310.42"
            y="448.31"
            width="343.468"
            height="51.4986"
            fill="#FF1E1E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}

export default MissionStatementPage;
