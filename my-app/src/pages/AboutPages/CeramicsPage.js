import React, { useEffect, useState } from 'react';
import imagesLoaded from "imagesloaded";
import './CeramicsPage.scss';

// ============================================
// EDIT YOUR CONTENT HERE
// ============================================
const CERAMICS_DATA = {
    slide1: {
        images: [
            `${process.env.PUBLIC_URL}/assets/ceramics/Picture1.jpg`,
            `${process.env.PUBLIC_URL}/assets/ceramics/Picture3.jpg`
        ],
        title: "Finality",
        subtitle: "Constructing",
        description: "For Us"
    },
    slide2: {
        images: [
            `${process.env.PUBLIC_URL}/assets/ceramics/Picture4.jpg`,
            `${process.env.PUBLIC_URL}/assets/ceramics/Picture5.jpg`
        ],
        title: "Ɱ?┃┃⎕ꟽ?♢𝚫  𐤨ӿѬ?",
        subtitle: "Counter Nihilism",
        description: "For Who?"
    },
    slide3: {
        images: [
            `${process.env.PUBLIC_URL}/assets/ceramics/BA86EDC1-39E9-4755-BC21-9EB2137D6C2F_1_105_c.jpeg`
        ],
        title: "Laniakea",
        subtitle: "Gold Weaver",
        description: "For What?"
    }
};

// Utility functions
const wrap = (n, max) => (n + max) % max;
const lerp = (a, b, t) => a + (b - a) * t;

// Vec2 and RAF classes remain the same as they're utilities
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    lerp(v, t) {
        this.x = lerp(this.x, v.x, t);
        this.y = lerp(this.y, v.y, t);
    }
}

class Raf {
    constructor() {
        this.rafId = 0;
        this.raf = this.raf.bind(this);
        this.callbacks = [];
        this.start();
    }

    start() {
        this.raf();
    }

    stop() {
        cancelAnimationFrame(this.rafId);
    }

    raf() {
        this.callbacks.forEach(({ callback, id }) => callback({ id }));
        this.rafId = requestAnimationFrame(this.raf);
    }

    add(callback, id) {
        this.callbacks.push({ callback, id: id || String(Math.random()) });
    }

    remove(id) {
        this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
    }
}

const CeramicsPage = () => {
    // State to track current image index for each slide
    const [imageIndices, setImageIndices] = useState({
        slide1: 0,
        slide2: 0,
        slide3: 0
    });

    // Function to cycle to next image for a slide
    const cycleImage = (slideId, event) => {
        // Stop event propagation to prevent interference with slider navigation
        event.stopPropagation();
        
        setImageIndices(prev => {
            const currentIndex = prev[slideId];
            const maxIndex = CERAMICS_DATA[slideId].images.length - 1;
            // Wrap around to 0 when reaching the end
            const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            return {
                ...prev,
                [slideId]: nextIndex
            };
        });
    };

    // Function to get current image URL for a slide
    const getCurrentImage = (slideId) => {
        try {
            const images = CERAMICS_DATA[slideId].images;
            const currentIndex = imageIndices[slideId];
            return images[currentIndex];
        } catch (error) {
            console.error(`Error getting image for ${slideId}:`, error);
            return '';
        }
    };

    useEffect(() => {
        // Initialize RAF instance
        const raf = new Raf();

        // Preload all images
        const allImages = Object.values(CERAMICS_DATA).flatMap(slide => slide.images);
        Promise.all(
            allImages.map(src => 
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = src;
                })
            )
        ).catch(error => console.error('Error preloading images:', error));

        // Tilt function implementation
        function tilt(node, options) {
            let { trigger, target } = resolveOptions(node, options);
            let lerpAmount = 0.06;
            const rotDeg = { current: new Vec2(), target: new Vec2() };
            const bgPos = { current: new Vec2(), target: new Vec2() };
            let rafId;

            function ticker({ id }) {
                rafId = id;
                rotDeg.current.lerp(rotDeg.target, lerpAmount);
                bgPos.current.lerp(bgPos.target, lerpAmount);

                for (const el of target) {
                    el.style.setProperty("--rotX", rotDeg.current.y.toFixed(2) + "deg");
                    el.style.setProperty("--rotY", rotDeg.current.x.toFixed(2) + "deg");
                    el.style.setProperty("--bgPosX", bgPos.current.x.toFixed(2) + "%");
                    el.style.setProperty("--bgPosY", bgPos.current.y.toFixed(2) + "%");
                }
            }

            const onMouseMove = ({ offsetX, offsetY }) => {
                lerpAmount = 0.1;
                for (const el of target) {
                    const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
                    const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);
                    rotDeg.target.set(ox, oy);
                    bgPos.target.set(-ox * 0.3, oy * 0.3);
                }
            };

            const onMouseLeave = () => {
                lerpAmount = 0.06;
                rotDeg.target.set(0, 0);
                bgPos.target.set(0, 0);
            };

            trigger.addEventListener("mousemove", onMouseMove);
            trigger.addEventListener("mouseleave", onMouseLeave);
            raf.add(ticker);

            return () => {
                trigger.removeEventListener("mousemove", onMouseMove);
                trigger.removeEventListener("mouseleave", onMouseLeave);
                raf.remove(rafId);
            };
        }

        function resolveOptions(node, options) {
            return {
                trigger: options?.trigger ?? node,
                target: options?.target
                    ? Array.isArray(options.target)
                        ? options.target
                        : [options.target]
                    : [node]
            };
        }

        // Setup function
        function setup() {
            const loaderText = document.querySelector(".loader__text");
            const images = [...document.querySelectorAll("img")];
            const totalImages = images.length;
            let loadedImages = 0;
            let progress = {
                current: 0,
                target: 0
            };

            images.forEach((image) => {
                imagesLoaded(image, (instance) => {
                    if (instance.isComplete) {
                        loadedImages++;
                        progress.target = loadedImages / totalImages;
                    }
                });
            });

            raf.add(({ id }) => {
                progress.current = lerp(progress.current, progress.target, 0.06);
                const progressPercent = Math.round(progress.current * 100);
                if (loaderText) loaderText.textContent = `${progressPercent}%`;

                if (progressPercent === 100) {
                    init();
                    raf.remove(id);
                }
            });
        }

        // Init function
        function init() {
            const loader = document.querySelector(".loader");
            const slides = [...document.querySelectorAll(".slide")];
            const slidesInfo = [...document.querySelectorAll(".slide-info")];
            const buttons = {
                prev: document.querySelector(".slider--btn__prev"),
                next: document.querySelector(".slider--btn__next")
            };

            if (loader) {
                loader.style.opacity = 0;
                loader.style.pointerEvents = "none";
            }

            slides.forEach((slide, i) => {
                const slideInner = slide.querySelector(".slide__inner");
                const slideInfoInner = slidesInfo[i].querySelector(".slide-info__inner");
                tilt(slide, { target: [slideInner, slideInfoInner] });
            });

            if (buttons.prev && buttons.next) {
                buttons.prev.addEventListener("click", change(-1));
                buttons.next.addEventListener("click", change(1));
            }
        }

        // Change function
        function change(direction) {
            return () => {
                let current = {
                    slide: document.querySelector(".slide[data-current]"),
                    slideInfo: document.querySelector(".slide-info[data-current]"),
                    slideBg: document.querySelector(".slide__bg[data-current]")
                };
                let previous = {
                    slide: document.querySelector(".slide[data-previous]"),
                    slideInfo: document.querySelector(".slide-info[data-previous]"),
                    slideBg: document.querySelector(".slide__bg[data-previous]")
                };
                let next = {
                    slide: document.querySelector(".slide[data-next]"),
                    slideInfo: document.querySelector(".slide-info[data-next]"),
                    slideBg: document.querySelector(".slide__bg[data-next]")
                };

                Object.values(current).forEach((el) => el?.removeAttribute("data-current"));
                Object.values(previous).forEach((el) => el?.removeAttribute("data-previous"));
                Object.values(next).forEach((el) => el?.removeAttribute("data-next"));

                if (direction === 1) {
                    let temp = current;
                    current = next;
                    next = previous;
                    previous = temp;

                    if (current.slide) current.slide.style.zIndex = "20";
                    if (previous.slide) previous.slide.style.zIndex = "30";
                    if (next.slide) next.slide.style.zIndex = "10";
                } else if (direction === -1) {
                    let temp = current;
                    current = previous;
                    previous = next;
                    next = temp;

                    if (current.slide) current.slide.style.zIndex = "20";
                    if (previous.slide) previous.slide.style.zIndex = "10";
                    if (next.slide) next.slide.style.zIndex = "30";
                }

                Object.values(current).forEach((el) => el?.setAttribute("data-current", ""));
                Object.values(previous).forEach((el) => el?.setAttribute("data-previous", ""));
                Object.values(next).forEach((el) => el?.setAttribute("data-next", ""));
            };
        }

        // Start the setup
        setup();

        // Cleanup function
        return () => {
            raf.stop();
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="ceramics-container">
            <div className="slider">
                <button className="slider--btn slider--btn__prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <div className="slides__wrapper">
                    <div className="slides">
                        {/* slide 1 */}
                        <div className="slide" data-current onClick={(e) => cycleImage('slide1', e)}>
                            <div className="slide__inner">
                                <div className="slide--image__wrapper">
                                    <img 
                                        className="slide--image" 
                                        src={getCurrentImage('slide1')} 
                                        alt={CERAMICS_DATA.slide1.title}
                                        onError={(e) => {
                                            console.error('Error loading image:', e.target.src);
                                            e.target.src = '';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="slide__bg" 
                             style={{ '--bg': `url(${getCurrentImage('slide1')})`, '--dir': '0' }} 
                             data-current></div>

                        {/* slide 2 */}
                        <div className="slide" data-next onClick={(e) => cycleImage('slide2', e)}>
                            <div className="slide__inner">
                                <div className="slide--image__wrapper">
                                    <img 
                                        className="slide--image" 
                                        src={getCurrentImage('slide2')} 
                                        alt={CERAMICS_DATA.slide2.title}
                                        onError={(e) => {
                                            console.error('Error loading image:', e.target.src);
                                            e.target.src = '';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="slide__bg" 
                             style={{ '--bg': `url(${getCurrentImage('slide2')})`, '--dir': '1' }} 
                             data-next></div>

                        {/* slide 3 */}
                        <div className="slide" data-previous onClick={(e) => cycleImage('slide3', e)}>
                            <div className="slide__inner">
                                <div className="slide--image__wrapper">
                                    <img 
                                        className="slide--image" 
                                        src={getCurrentImage('slide3')} 
                                        alt={CERAMICS_DATA.slide3.title}
                                        onError={(e) => {
                                            console.error('Error loading image:', e.target.src);
                                            e.target.src = '';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="slide__bg" 
                             style={{ '--bg': `url(${getCurrentImage('slide3')})`, '--dir': '-1' }} 
                             data-previous></div>
                    </div>

                    <div className="slides--infos">
                        {/* Slide Info 1 */}
                        <div className="slide-info" data-current>
                            <div className="slide-info__inner">
                                <div className="slide-info--text__wrapper">
                                    <div data-title className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide1.title}</span>
                                    </div>
                                    <div data-subtitle className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide1.subtitle}</span>
                                    </div>
                                    <div data-description className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide1.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide Info 2 */}
                        <div className="slide-info" data-next>
                            <div className="slide-info__inner">
                                <div className="slide-info--text__wrapper">
                                    <div data-title className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide2.title}</span>
                                    </div>
                                    <div data-subtitle className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide2.subtitle}</span>
                                    </div>
                                    <div data-description className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide2.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide Info 3 */}
                        <div className="slide-info" data-previous>
                            <div className="slide-info__inner">
                                <div className="slide-info--text__wrapper">
                                    <div data-title className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide3.title}</span>
                                    </div>
                                    <div data-subtitle className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide3.subtitle}</span>
                                    </div>
                                    <div data-description className="slide-info--text">
                                        <span>{CERAMICS_DATA.slide3.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="slider--btn slider--btn__next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className="loader">
                <span className="loader__text">0%</span>
            </div>
        </div>
    );
};

export default CeramicsPage;