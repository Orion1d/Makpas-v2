import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); // Show loading screen for at least 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div className="w-64 h-64 mb-8 mx-auto">
          <img
            src="/lovable-uploads/bfc59d3b-fe89-4a98-9a42-7188b454d33c.png"
            alt="Company Building"
            className="w-full h-full object-cover rounded-lg animate-pulse"
          />
        </div>
        <div className="text-white text-xl font-semibold">
          <div className="animate-bounce">Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;