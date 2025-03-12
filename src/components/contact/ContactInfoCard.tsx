
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ContactInfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ 
  title, 
  icon, 
  children 
}) => {
  return (
    <Card className="bg-white dark:bg-industry-blue/90 shadow-md transition-transform duration-250 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-safety-orange/30 overflow-hidden card-brushed-metal">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-primary dark:text-white font-space-grotesk flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};
