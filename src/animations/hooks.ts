import anime from 'animejs';
import { useEffect, useRef } from 'react';

export const useFloatingAnimation = (selector: string, options = {}) => {
  useEffect(() => {
    const animation = anime({
      targets: selector,
      translateY: [0, -10],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      duration: 3000,
      ...options
    });

    return () => animation.pause();
  }, [selector, options]);
};

export const useHoverAnimation = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    const enterAnimation = (e: MouseEvent) => {
      anime({
        targets: e.currentTarget,
        scale: 1.05,
        duration: 300,
        easing: 'easeOutElastic(1, .6)'
      });
    };

    const leaveAnimation = (e: MouseEvent) => {
      anime({
        targets: e.currentTarget,
        scale: 1,
        duration: 250,
        easing: 'easeOutQuad'
      });
    };

    elements.forEach(el => {
      el.addEventListener('mouseenter', enterAnimation as any);
      el.addEventListener('mouseleave', leaveAnimation as any);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', enterAnimation as any);
        el.removeEventListener('mouseleave', leaveAnimation as any);
      });
    };
  }, [selector]);
};

export const useStaggerAnimation = (selector: string, options = {}) => {
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      anime({
        targets: selector,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
        duration: 800,
        ...options
      });
      hasAnimated.current = true;
    }
  }, [selector, options]);
};

export const usePulseAnimation = (selector: string, options = {}) => {
  useEffect(() => {
    const animation = anime({
      targets: selector,
      scale: [1, 1.05],
      opacity: [0.9, 1],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000,
      ...options
    });

    return () => animation.pause();
  }, [selector, options]);
}; 