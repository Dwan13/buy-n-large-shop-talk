import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageWithLoadingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  loadingClassName?: string;
  errorClassName?: string;
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  className,
  loadingClassName = 'bg-gray-200 animate-pulse flex items-center justify-center',
  errorClassName = 'bg-gray-200 flex items-center justify-center text-gray-500',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className={cn('absolute inset-0', loadingClassName)}>
          {/* Puedes poner un spinner o un esqueleto aquí */}
          <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {hasError && !isLoading && (
        <div className={cn('absolute inset-0', errorClassName)}>
          <span className="text-sm">Error al cargar imagen</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn('w-full h-full object-cover transition-opacity duration-300',
          isLoading || hasError ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoading;