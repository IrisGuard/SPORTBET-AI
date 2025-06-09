
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from 'lucide-react';

interface LinkCardProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  description: string;
  badge?: React.ReactNode;
}

export const LinkCard = ({ icon, title, href, description, badge }: LinkCardProps) => {
  return (
    <Card className="w-full bg-card border-muted">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 text-muted-foreground">
            {icon}
          </div>
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
        </div>
        {badge && (
          <div>{badge}</div>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xs text-muted-foreground mb-2">
          {description}
        </CardDescription>
        <Button 
          variant="outline" 
          className="w-full text-xs justify-between" 
          size="sm"
          asChild
        >
          <a href={href}>
            <span>Learn More</span>
            <ArrowUpRight size={14} />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
