import React, { useEffect, useState } from "react";

export const useOutsideClick = <T extends HTMLElement>(ref: React.RefObject<T>): boolean => {
  const [ isOutside, setIsOutside ] = useState(true);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // return true;
        // alert('OUT');
        setIsOutside(true);
      }
      else {
        setIsOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isOutside;
}