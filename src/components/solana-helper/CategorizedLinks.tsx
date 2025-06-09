
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { links, categories } from './types';
import { LinkCard } from './LinkCard';
import { CategoryIcon } from './CategoryIcon';
import { cn } from '@/lib/utils';

export const CategorizedLinks = () => {
  return (
    <Tabs defaultValue={categories[0]} orientation="vertical" className="flex h-full">
      <TabsList className="flex-col h-auto w-1/3 bg-muted/30">
        {categories.map((category) => (
          <TabsTrigger 
            key={category} 
            value={category}
            className={cn(
              "justify-start w-full text-left", 
              "data-[state=active]:bg-sportbet-blue/20 data-[state=active]:text-sportbet-blue"
            )}
          >
            <div className="flex items-center gap-2">
              <CategoryIcon category={category} />
              <span className="truncate">{category}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category} value={category} className="flex-1 pl-4 pt-0 mt-0">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <CategoryIcon category={category} />
            {category}
          </h3>
          
          <div className="space-y-4">
            {links
              .filter(link => link.category === category)
              .map((link, index) => (
                <LinkCard key={index} link={link} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
