// components/SmoothScrollWrapper.jsx
import { ReactLenis } from '@studio-freight/react-lenis';


const SmoothScrollWrapper = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollWrapper;
