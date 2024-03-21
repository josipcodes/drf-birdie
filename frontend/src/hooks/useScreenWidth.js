import React, { useState, useEffect } from 'react';

/* code copied from 
https://www.altcademy.com/blog/how-to-check-screen-width-in-reactjs/ 
Code modified to return boolean value */ 
const ScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
//   returning boolean value
  return width < 768;
}

export default ScreenWidth;