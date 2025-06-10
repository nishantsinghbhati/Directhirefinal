// hooks/useShowAnimation.js
import { useEffect, useState } from 'react';

const useShowAnimation = () => {
  const [showCard, setShowCard] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const cardTimer = setTimeout(() => setShowCard(true), 0);
    const contentTimer = setTimeout(() => setShowContent(true), 1000
  );

    return () => {
      clearTimeout(cardTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return { showCard, showContent };
};

export default useShowAnimation;
