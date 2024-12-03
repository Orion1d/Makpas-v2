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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: `linear-gradient(rgba(26, 43, 109, 0.85), rgba(26, 43, 109, 0.85)), url('/lovable-uploads/bfc59d3b-fe89-4a98-9a42-7188b454d33c.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center">
        <div className="w-screen h-screen absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-semibold">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;