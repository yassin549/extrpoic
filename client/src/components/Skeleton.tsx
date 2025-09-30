import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', width, height, className, ...props }) => {
  const baseClass = 'animate-pulse bg-muted-surface';
  
  const variantStyles = {
    text: `h-4 rounded ${width ? '' : 'w-full'}`, // Default height for text
    rect: `rounded-md ${width ? '' : 'w-full'} ${height ? '' : 'h-full'}`,
    circle: `rounded-full`,
  };

  const style = {
    width: width,
    height: height,
  };

  if (variant === 'circle') {
    style.width = width || height || '40px';
    style.height = style.width;
  }

  return (
    <div 
      className={`${baseClass} ${variantStyles[variant]} ${className}`}
      style={style}
      {...props}
    />
  );
};

export default Skeleton;
