
import React from 'react';
import { Button as ShadcnButton, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AtomicButtonProps extends ButtonProps {
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<AtomicButtonProps> = ({
  children,
  className,
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <ShadcnButton
      className={cn(
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </ShadcnButton>
  );
};
