import { useRef, useEffect } from "react";

function useClickOutside(callback: any) {
  const ref = useRef();

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
}

export default useClickOutside;
