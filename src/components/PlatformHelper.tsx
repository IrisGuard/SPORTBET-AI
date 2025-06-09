
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Info, X } from 'lucide-react';
import { AllLinks } from './platform-helper/AllLinks';
import { CategorizedLinks } from './platform-helper/CategorizedLinks';

const PlatformHelper = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 bg-sportbet-green hover:bg-sportbet-green/90 text-white rounded-full shadow-lg z-50"
        >
          <Info className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[540px] bg-sportbet-dark/95 backdrop-blur-lg text-white overflow-y-auto">
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl text-white">SportBet AI - Resources & Help</SheetTitle>
            <SheetClose className="rounded-full hover:bg-muted p-1">
              <X className="h-4 w-4" />
            </SheetClose>
          </div>
        </SheetHeader>
        
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 mb-4 bg-muted/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-sportbet-green">All Resources</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-sportbet-green">By Category</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <AllLinks />
          </TabsContent>
          
          <TabsContent value="categories">
            <CategorizedLinks />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default PlatformHelper;
