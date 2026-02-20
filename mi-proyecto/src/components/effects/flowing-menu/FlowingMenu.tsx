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
  speed = 15,
  textColor = '#fff',
  bgColor = '#060010',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#060010',
  borderColor = '#fff'
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
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
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
  );
}

export default FlowingMenu;
