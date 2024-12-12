import React from "react";

const WelcomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary to-secondary">
      <h1 className="text-4xl font-bold text-white">Welcome to Our Website</h1>
      <p className="mt-4 text-lg text-white">We are glad to have you here.</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 mx-auto text-white drop-shadow-lg animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </section>
  );
};

export default WelcomeSection;