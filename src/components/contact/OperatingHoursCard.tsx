
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const OperatingHoursCard: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Get current day to highlight in operating hours
  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };
  
  const currentDay = getCurrentDay();
  
  return (
    <Card className="bg-white dark:bg-industry-blue/90 shadow-md transition-transform duration-250 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-safety-orange/30 overflow-hidden card-brushed-metal">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-primary dark:text-white font-space-grotesk flex items-center gap-2">
          <Clock className="text-safety-orange h-5 w-5" />
          {t('operating_hours') || 'Operating Hours'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="py-2 px-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  {language === 'tr' ? 'Günler' : 'Days'}
                </th>
                <th className="py-2 px-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  {language === 'tr' ? 'Saatler' : 'Hours'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className={`${currentDay === 'monday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'monday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Pazartesi' : 'Monday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'monday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  08:00 - 18:00
                </td>
              </tr>
              <tr className={`${currentDay === 'tuesday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'tuesday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Salı' : 'Tuesday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'tuesday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  08:00 - 18:00
                </td>
              </tr>
              <tr className={`${currentDay === 'wednesday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'wednesday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Çarşamba' : 'Wednesday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'wednesday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  08:00 - 18:00
                </td>
              </tr>
              <tr className={`${currentDay === 'thursday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'thursday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Perşembe' : 'Thursday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'thursday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  08:00 - 18:00
                </td>
              </tr>
              <tr className={`${currentDay === 'friday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'friday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Cuma' : 'Friday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'friday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  08:00 - 18:00
                </td>
              </tr>
              <tr className={`${currentDay === 'saturday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'saturday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Cumartesi' : 'Saturday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'saturday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  08:00 - 15:00
                </td>
              </tr>
              <tr className={`${currentDay === 'sunday' ? 'bg-safety-orange/10' : ''}`}>
                <td className={`py-3 px-3 ${currentDay === 'sunday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Pazar' : 'Sunday'}
                </td>
                <td className={`py-3 px-3 ${currentDay === 'sunday' ? 'text-safety-orange font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                  {language === 'tr' ? 'Kapalı' : 'Closed'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
