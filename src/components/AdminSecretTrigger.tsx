import { useState, useRef } from "react";

interface AdminSecretTriggerProps {
  onTrigger: () => void;
}

export function AdminSecretTrigger({ onTrigger }: AdminSecretTriggerProps) {
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    if (clickCount + 1 >= 5) {
      onTrigger();
      setClickCount(0);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 w-20 h-20 cursor-default z-[100]"
      aria-hidden="true"
    />
  );
}
