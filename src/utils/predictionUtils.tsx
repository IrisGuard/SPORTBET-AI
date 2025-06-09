
import React from 'react';
import { Activity, BadgeCheck, Citrus, Dumbbell } from "lucide-react";

export const getSportIcon = (sport: string) => {
  const sportIcons = {
    football: <Activity className="h-6 w-6 text-sportbet-blue" />,
    basketball: <Dumbbell className="h-6 w-6 text-sportbet-orange" />,
    tennis: <BadgeCheck className="h-6 w-6 text-sportbet-green" />,
    volleyball: <Citrus className="h-6 w-6 text-white" />
  };
  
  return sport in sportIcons 
    ? sportIcons[sport as keyof typeof sportIcons] 
    : null;
};

export const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return 'bg-sportbet-green/10 text-sportbet-green';
  if (confidence >= 50) return 'bg-yellow-500/10 text-yellow-500';
  return 'bg-red-500/10 text-red-500';
};
