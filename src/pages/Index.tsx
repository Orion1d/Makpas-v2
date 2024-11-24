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
          <h1 className="text-5xl font-bold mb-6">Makpas Packing</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Since our establishment in 2000, our company has been a trusted provider of packaging and industrial materials, serving clients both within Türkiye and internationally. We are dedicated to staying at the forefront of advancements in the packaging, automotive, and cable industries, enabling us to deliver a comprehensive range of high-quality products to meet our customers' needs. With a strong global presence, we proudly import and export to numerous countries across the Americas, Asia, and Europe, continuing to build lasting partnerships based on reliability, innovation, and excellence.
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