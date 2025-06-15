
import React from 'react';
import { Typography } from '../Typography/Typography';
import { cn } from '@/lib/utils';

interface PriceProps {
  value: number;
  originalValue?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  value,
  originalValue,
  size = 'md',
  className
}) => {
  const sizeVariants = {
    sm: 'body2',
    md: 'h5',
    lg: 'h3'
  } as const;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Typography variant={sizeVariants[size]} color="primary" className="font-bold">
        ${value.toFixed(2)}
      </Typography>
      {originalValue && originalValue > value && (
        <Typography variant="caption" className="line-through text-gray-500">
          ${originalValue.toFixed(2)}
        </Typography>
      )}
    </div>
  );
};
