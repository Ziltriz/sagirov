import React from 'react';
import Classes from '@/styles/layouts-parts/header.module.scss'

type LogoProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
};

const Logo: React.FC<LogoProps> = ({
  className,
  ariaLabel = 'SpaceX'
}) => {
  return (
    <>
    <div
      className={`${className || ''}`}
    >
      <img
        src="/space-logo.png"
        alt={ariaLabel}

        loading="eager"
      />
      {/* Уголки внутри обёртки */}
      <div className={`${Classes.cornertl}`}></div>
      <div className={`${Classes.cornertr}`}></div>
      <div className={`${Classes.cornerbl}`}></div>
      <div className={`${Classes.cornerbr}`}></div>
      </div>
    </>
  );
};

export default Logo;