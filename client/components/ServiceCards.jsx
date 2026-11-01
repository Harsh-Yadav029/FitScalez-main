"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS_DATA } from "@/lib/data";

export default function ServiceCards() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate underline SVG paths on scroll (from HeroSection)
    const underlinePaths = document.querySelectorAll(".title-underline-svg path");
    if (underlinePaths.length > 0) {
      gsap.to(underlinePaths, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".cards-wrapper",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }

    const mm = gsap.matchMedia();

    // ─── Desktop (>= 1025px): Fan cluster hover physics ───
    mm.add("(min-width: 1025px)", () => {
      const cards = gsap.utils.toArray(".card");
      if (!cards.length) return;

      const originalData = [
        { rotation: 4 },
        { rotation: -5 },
        { rotation: 5 },
        { rotation: -8 },
        { rotation: 5 },
      ];

      const cleanupListeners = [];

      cards.forEach((card, index) => {
        const onEnter = () => {
          const hoverGap = 120;
          const clusterGap = 150;
          const cardWidth = 320;
          const hoveredLeft = cards[index].offsetLeft;
          const leftCards = [];
          const rightCards = [];

          cards.forEach((otherCard, otherIndex) => {
            if (otherIndex < index)
              leftCards.push({ card: otherCard, index: otherIndex });
            else if (otherIndex > index)
              rightCards.push({ card: otherCard, index: otherIndex });
          });

          const currentTop = cards[index].offsetTop;
          const targetCommonTop = 50;
          const moveY = targetCommonTop - currentTop;

          gsap.to(cards[index], {
            x: 0,
            y: moveY,
            rotation: 0,
            scale: 1.08,
            duration: 0.9,
            ease: "elastic.out(1, 0.5)",
            overwrite: true,
          });

          if (rightCards.length) {
            const clusterStart = hoveredLeft + cardWidth + hoverGap;
            rightCards.forEach((item, i) => {
              const targetAbsLeft = clusterStart + i * clusterGap;
              const currentAbsLeft = item.card.offsetLeft;
              const moveX = targetAbsLeft - currentAbsLeft;
              gsap.to(item.card, {
                x: moveX,
                y: moveY,
                rotation: originalData[item.index].rotation,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
              });
            });
          }

          if (leftCards.length) {
            const clusterEnd = hoveredLeft - hoverGap;
            const totalLeftWidth = leftCards.length * clusterGap;
            const clusterStart = clusterEnd - totalLeftWidth;
            leftCards.forEach((item, i) => {
              const targetAbsLeft = clusterStart + i * clusterGap;
              const currentAbsLeft = item.card.offsetLeft;
              const moveX = targetAbsLeft - currentAbsLeft;
              gsap.to(item.card, {
                x: moveX,
                y: moveY,
                rotation: originalData[item.index].rotation,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
              });
            });
          }
        };

        const onLeave = () => {
          cards.forEach((c, i) => {
            gsap.to(c, {
              x: 0,
              y: 0,
              scale: 1,
              rotation: originalData[i].rotation,
              duration: 1.0,
              ease: "elastic.out(1, 0.5)",
              overwrite: true,
              zIndex: i + 1,
              delay: 0.08,
            });
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanupListeners.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        cleanupListeners.forEach((fn) => fn());
      };
    });

    // ─── Tablet & Mobile (<= 1024px): Gentle scroll reveal ───
    mm.add("(max-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.88, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <>
      {/* ─── "Call us if you need:" Heading ─── */}
      <div className="title-container">
        <h2 className="main-title">
          call us if you <span className="italic-text">need:</span>
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          viewBox="0 0 159 17"
          fill="none"
          className="title-underline-svg"
        >
          <path
            d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {/* ─── Service Cards ─── */}
      <div className="cards-wrapper" id="cards-wrapper">
        {CARDS_DATA.map((card) => (
          <div key={card.color} className={`card card-${card.color}`}>
            <div className={`card-sticker sticker-${card.sticker}`}>
              <img
                src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                alt=""
                width="100%"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            <h3 className="card-title">{card.title}</h3>
            <svg
              width="100%"
              height="10"
              className="card-divider-svg"
              aria-hidden="true"
            >
              <use href="#card-divider" />
            </svg>
            <ul className="card-list">
              {card.services.map((service) => (
                <li key={service}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="16"
                    className="services-card__bullet-svg"
                    aria-hidden="true"
                  >
                    <use href="#bullet-icon" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
