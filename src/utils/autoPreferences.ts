export const getLocationBasedLanguage = async (): Promise<'en' | 'tr'> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code === 'TR' ? 'tr' : 'en';
  } catch (error) {
    console.error('Error detecting location:', error);
    return 'en'; // Default to English if detection fails
  }
};

export const shouldUseDarkMode = (): boolean => {
  const hour = new Date().getHours();
  return hour >= 22 || hour < 6;
};