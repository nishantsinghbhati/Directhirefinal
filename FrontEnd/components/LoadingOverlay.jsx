import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const LoadingOverlay = ({ onComplete }) => {
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { stiffness: 100, damping: 20 });
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1,ease: 'easeInOut',
      onComplete: () => {
        setIsLoadingComplete(true);
      },
    });

    return controls.stop;
  }, [progress]);

  const clipPath = useTransform(springProgress, (value) => `inset(${100 - value}% 0 0 0)`);

  // Reveal animation done callback
  const handleRevealComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <>
      {!isLoadingComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900 z-50">
          <motion.div
            style={{ clipPath }}
            className="bg-blue-300 w-1 h-full"
          />
        </div>
      )}

      {isLoadingComplete && (
        <motion.div
          initial={{ clipPath: 'inset(0 0% 0 0%)' }}
          animate={{ clipPath: 'inset(0% 50% 0% 50%)' }}
          transition={{ duration: .5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-blue-900 z-50"
          onAnimationComplete={handleRevealComplete}
        />
      )}
    </>
  );
};

export default LoadingOverlay;
