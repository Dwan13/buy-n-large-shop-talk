import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card className="w-[300px] flex flex-col">
      <CardContent className="p-0">
        <Skeleton className="w-full h-48 rounded-t-md" />
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;