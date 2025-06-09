
import React from 'react';
import { FileCode, Code, Server, Users, LayoutGrid, BookOpen } from 'lucide-react';

export const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "SPL Tokens":
      return <FileCode className="h-4 w-4" />;
    case "Development":
      return <Code className="h-4 w-4" />;
    case "APIs & Services":
      return <Server className="h-4 w-4" />;
    case "Accounts & Addresses":
      return <Users className="h-4 w-4" />;
    case "Clusters & Endpoints":
      return <LayoutGrid className="h-4 w-4" />;
    case "Programs":
      return <BookOpen className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};
