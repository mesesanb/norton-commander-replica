import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      tabIndex={1}
      onClick={onClick}
      className={`px-4 py-2 text-black focus-visible:bg-nortonText bg-nortonButton hover:bg-nortonText transition duration-300 ${className}`}>
      {text}
    </button>
  );
};

export default Button;
