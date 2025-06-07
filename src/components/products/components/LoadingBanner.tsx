
export const LoadingBanner = () => {
  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[380px] xl:h-[420px] mb-8 overflow-hidden rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800 animate-pulse">
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500 dark:text-gray-400">Loading banners...</div>
      </div>
    </div>
  );
};
