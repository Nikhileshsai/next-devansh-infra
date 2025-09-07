import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <span className={`material-icons ${className || ''}`}>
      {name}
    </span>
  );
};

export default Icon;
