import React from 'react';

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'vip';
}

const sizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const statusStyles = {
  online: 'bg-emerald-win',
  offline: 'bg-mid-gray',
  vip: 'bg-neon-amber',
};

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', status }) => {
  return (
    <div className={`relative inline-block ${sizeStyles[size]}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <div className="w-full h-full rounded-full bg-muted-surface flex items-center justify-center font-bold text-light-text">
          {getInitials(alt)}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card-dark ${statusStyles[status]}`} />
      )}
    </div>
  );
};

export default Avatar;
