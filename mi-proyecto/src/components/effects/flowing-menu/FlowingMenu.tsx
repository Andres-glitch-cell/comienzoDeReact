<<<<<<< HEAD
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

import './FlowingMenu.css';
interface MenuItem { 
  link: string; 
  text: string; 
  image: string; 
}
// 2. La función queda limpia así
function FlowingMenu({
  items = [] as MenuItem[],
=======
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import type { Variants } from 'framer-motion';

type MenuTheme = {
  bgColor: string;
  borderColor: string;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
};
const MenuContainer = styled(motion.div)<{ theme: MenuTheme }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColor};
`;

const MenuNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const MenuItemContainer = styled(motion.div)<{ theme: MenuTheme }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  &:first-child {
    border-top: none;
  }
`;

const MenuItemLink = styled(motion.a)<{ theme: MenuTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 600;
  font-size: 4vh;
  color: ${(props) => props.theme.textColor};
`;

const Marquee = styled(motion.div)<{ theme: MenuTheme }>`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: ${(props) => props.theme.marqueeBgColor};
`;

const MarqueeInner = styled(motion.div)`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: fit-content;
  will-change: transform;
`;

const MarqueePart = styled(motion.div)<{ theme: MenuTheme }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${(props) => props.theme.marqueeTextColor};

  span {
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 4vh;
    line-height: 1;
    padding: 0 1vw;
  }
`;

const MarqueeImg = styled.div`
  width: 200px;
  height: 7vh;
  margin: 2em 2vw;
  padding: 1em 0;
  border-radius: 50px;
  background-size: cover;
  background-position: 50% 50%;
`;


interface FlowingMenuProps {
  items?: Array<{
    link: string;
    text: string;
    image: string;
  }>;
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

function FlowingMenu({
  items = [],
>>>>>>> 2097040bc4325595185f7e53ccb238f2c5e73e45
  speed = 15,
  textColor = '#fff',
  bgColor = '#060010',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#060010',
  borderColor = '#fff'
<<<<<<< HEAD
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
=======
}: FlowingMenuProps) {
  const theme = {
    textColor,
    bgColor,
    marqueeBgColor,
    marqueeTextColor,
    borderColor
  }
  return (
    <MenuContainer theme={theme}>
      <MenuNav>
>>>>>>> 2097040bc4325595185f7e53ccb238f2c5e73e45
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
<<<<<<< HEAD
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      // Get the first marquee part to measure content width
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;

      // Calculate how many copies we need to fill viewport + extra for seamless loop
      // We need at least 2, but calculate based on content vs viewport
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Animate exactly one content width for seamless loop
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    // Small delay to ensure DOM is ready after repetitions update
    const timer = setTimeout(setupMarquee, 50);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
=======
            theme={theme}
          />
        ))}
      </MenuNav>
    </MenuContainer>
  );
}

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  speed: number;
  theme: MenuTheme;
}

function MenuItem({ link, text, image, speed, theme }: MenuItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const [marqueeWidth, setMarqueeWidth] = useState(0);

    useLayoutEffect(() => {
        if (marqueeInnerRef.current) {
            setMarqueeWidth(marqueeInnerRef.current.offsetWidth / 2);
        }
    }, [text, image]);

    const marqueeVariants: Variants = {
        animate: {
            x: [0, -marqueeWidth],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: speed,
                    ease: "linear",
                },
            },
        },
    };

    const marqueeContainerVariants: Variants = {
        initial: {
            y: "101%"
        },
        hover: {
            y: 0,
            transition: { duration: 0.6, ease: 'easeInOut' }
        },
        exit: {
            y: "101%",
            transition: { duration: 0.6, ease: 'easeInOut' }
        }
    }

  return (
    <MenuItemContainer 
        theme={theme}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
    >
      <MenuItemLink
        href={link}
        theme={theme}
      >
        {text}
      </MenuItemLink>
      <AnimatePresence>
      {isHovered && (
          <Marquee 
            theme={theme}
            variants={marqueeContainerVariants}
            initial="initial"
            animate="hover"
            exit="exit"
          >
              <MarqueeInner
                  ref={marqueeInnerRef}
                  variants={marqueeVariants}
                  animate="animate"
              >
                <MarqueePart theme={theme}>
                    <span>{text}</span>
                    <MarqueeImg style={{ backgroundImage: `url(${image})` }} />
                </MarqueePart>
                <MarqueePart theme={theme}>
                    <span>{text}</span>
                    <MarqueeImg style={{ backgroundImage: `url(${image})` }} />
                </MarqueePart>
              </MarqueeInner>
          </Marquee>
      )}
      </AnimatePresence>
    </MenuItemContainer>
>>>>>>> 2097040bc4325595185f7e53ccb238f2c5e73e45
  );
}

export default FlowingMenu;
