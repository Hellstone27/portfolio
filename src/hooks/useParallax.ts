import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', offset = 0 } = options;
  const [transform, setTransform] = useState('translateY(0px)');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.pageYOffset;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrolled = window.pageYOffset;
      
      // Calculate if element is in viewport
      const elementBottom = elementTop + elementHeight;
      const viewportTop = scrolled;
      const viewportBottom = scrolled + windowHeight;
      
      if (elementBottom >= viewportTop && elementTop <= viewportBottom) {
        // Element is in viewport, apply parallax
        const rate = (scrolled - elementTop + offset) * speed;
        const yPos = direction === 'up' ? -rate : rate;
        setTransform(`translateY(${yPos}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, offset]);

  return [ref, transform] as const;
};

export default useParallax;
