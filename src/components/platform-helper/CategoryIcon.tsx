
import React from 'react';

type CategoryIconProps = {
  children: React.ReactNode;
};

export const CategoryIcon = ({ children }: CategoryIconProps) => {
  return (
    <div className="h-5 w-5 mr-1">{children}</div>
  );
};
