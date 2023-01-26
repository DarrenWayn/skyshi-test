import { useEffect } from "react";

interface ClickOutsideProps {
  ref: React.RefObject<HTMLElement>;
  callback: (event: MouseEvent) => void;
}

const useClickOutside = ({ ref, callback }: ClickOutsideProps) => {
  const handleClick = (event: MouseEvent) => {
    if (!ref.current || ref.current.contains(event.target as Node)) {
      return;
    }
    callback(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;
