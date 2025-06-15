
import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption';
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'inherit';
}

const variantClasses = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs text-gray-500'
};

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-green-600',
  error: 'text-red-600',
  inherit: ''
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  children,
  className,
  color = 'inherit'
}) => {
  const Component = variant.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p';
  
  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
};
