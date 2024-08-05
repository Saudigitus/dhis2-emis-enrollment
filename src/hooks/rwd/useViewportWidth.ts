import { useState, useEffect } from 'react';

function useViewportWidth() {
  const [vw, setVw] = useState(getVw());

  useEffect(() => {
    const handleResize = () => {
      setVw(getVw());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getVw() {
    return window.innerWidth;
  }

  return { viewPortWidth: vw };
}

export default useViewportWidth;
