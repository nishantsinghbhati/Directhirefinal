import React, { useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedLink({ text }) {
  const wordRef = useRef(null);
  const animatingRef = useRef(false);

  const letters = text.split("");

  const onMouseEnter = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const lettersArray = wordRef.current.querySelectorAll(".letter");

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    tl.to(lettersArray, {
      y: -5,
      opacity: 0.1,
      duration: 0.07,
      ease: "power1.inOut",
      stagger: 0.03,
    })
      .set(lettersArray, { y: 10 }) // jump below
      .to(lettersArray, {
        y: 0,
        opacity: 1,
        duration: 0.07,
        ease: "power1.inOut",
        stagger: 0.03,
      }, ">0.1");
  };

  return (
    <span
      ref={wordRef}
      onMouseEnter={onMouseEnter}
      className="inline-flex cursor-pointer select-none"
    >
      {letters.map((char, i) => (
        <span key={i} className="letter inline-block">
          {char}
        </span>
      ))}
    </span>
  );
}
