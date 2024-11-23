const Index = () => {
  return (
    <div className="min-h-screen">
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/lovable-uploads/bfc59d3b-fe89-4a98-9a42-7188b454d33c.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Transform Your Business</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Streamline your operations with our cutting-edge SaaS solutions
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;