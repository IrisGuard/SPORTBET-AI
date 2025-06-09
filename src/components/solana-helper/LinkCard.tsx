
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from 'lucide-react';
import { LinkItemProps } from './types';

export const LinkCard = ({ link }: { link: LinkItemProps }) => (
  <Card className="mb-4 bg-card/80 backdrop-blur-sm border-muted">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex justify-between">
        <span>{link.title}</span>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">{link.category}</span>
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        {link.description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button 
        variant="outline" 
        className="w-full flex justify-between" 
        onClick={() => window.open(link.url, "_blank")}
      >
        <span>Open Link</span>
        <ArrowUpRight size={16} />
      </Button>
      <div className="mt-2 text-xs text-muted-foreground truncate">{link.url}</div>
    </CardContent>
  </Card>
);
