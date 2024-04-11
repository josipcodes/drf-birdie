import { useEffect, useRef, useState } from "react";


const useNavBarToggle = () => {
  // menu is initially collapsed
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  // created following Moments lessons
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);
  return { expanded, setExpanded, ref };
};


export default useNavBarToggle;