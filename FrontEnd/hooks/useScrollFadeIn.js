// hooks/useScrollFadeIn.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollFadeIn(ref, options = {}) {
  useEffect(() => {
    if (!ref?.current) return;

    const anim = gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [ref, options]);
}
