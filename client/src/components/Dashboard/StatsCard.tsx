import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
