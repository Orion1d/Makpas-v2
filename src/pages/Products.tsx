import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Products = () => {
  const cableProducts = [
    {
      name: "Diameter Measurment Ruler",
      description: "Used in Cable and Coil Measuring Operations. Range: 10-115 mm",
      image: "/lovable-uploads/f0a5c15e-55bd-4add-8fd4-ec202e3bbbe1.png"
    },
    {
      name: "Ceramic Welding Rings",
      description: "Production is Made in Specified Sizes. Inner Diameter Range: 0.50 - 4.77 mm",
      image: "/lovable-uploads/f0a5c15e-55bd-4add-8fd4-ec202e3bbbe1.png"
    },
    // Add more cable products as needed
  ];

  const utilityProducts = [
    {
      name: "PHK RSC-432",
      description: "Self-Retracting Safety Can. NSF Certified.",
      image: "/lovable-uploads/2cc86451-a734-4466-abc1-9b528f62b56a.png"
    },
    // Add more utility products
  ];

  const workGloves = [
    {
      name: "Hundai H-818-P",
      description: "Palm of the Hand is Treated Goat Leather, Over-Thumb Safety Palm",
      image: "/lovable-uploads/2cc86451-a734-4466-abc1-9b528f62b56a.png"
    },
    // Add more gloves
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Our Products</h1>
          <img src="/lovable-uploads/4d4003d7-bea1-4405-a96d-72ce538d4e83.png" alt="Makpas Logo" className="h-12" />
        </div>
        
        <Tabs defaultValue="cable" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="cable">Cable Products</TabsTrigger>
            <TabsTrigger value="utility">Utility Knives</TabsTrigger>
            <TabsTrigger value="gloves">Work Gloves</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cable">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cableProducts.map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="utility">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {utilityProducts.map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gloves">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workGloves.map((product, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;