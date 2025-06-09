
import React from 'react';
import { links } from './types';
import { LinkCard } from './LinkCard';

export const AllLinks = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {links.map((link, index) => (
          <LinkCard key={index} link={link} />
        ))}
      </div>
    </div>
  );
};
