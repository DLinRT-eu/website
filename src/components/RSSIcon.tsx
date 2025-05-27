
import React from 'react';

interface RSSIconProps {
  className?: string;
}

const RSSIcon: React.FC<RSSIconProps> = ({ className = "h-5 w-5" }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-label="RSS Feed"
    >
      <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248S0 22.546 0 20.752s1.456-3.248 3.252-3.248 3.251 1.454 3.251 3.248zM1.677 6.082v4.495c6.462 0 11.691 5.23 11.691 11.691h4.495c0-8.896-7.29-16.186-16.186-16.186zM1.677.022v4.495C12.31 4.517 21.017 13.224 21.017 23.857h4.495C25.512 11.58 13.954.022 1.677.022z"/>
    </svg>
  );
};

export default RSSIcon;
