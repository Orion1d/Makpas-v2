import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const products = {
    measuring: [
      {
        name: "Diameter Measurement Ruler (10-115 mm)",
        description: "Used in Cable and Coil Measuring Operations. Diameter Measurement Range: 10-115 mm",
      },
      {
        name: "Diameter Measurement Ruler (5-35 mm)",
        description: "Used in Cable and Coil Measuring Operations. Diameter Measurement Range: 5-35 mm",
      },
      {
        name: "Ceramic Welding Rings",
        description: "Production is Made in Specified Sizes. Inner Diameter Range: 0.50 - 47.7 mm",
      },
    ],
    safetyKnives: [
      {
        name: "PHC RSC-432",
        description: "Recyclable, Retractable and Replaceable Safety Blade. NSF Certified and Ideal for Food Service and Manufacturing Facilities.",
      },
      {
        name: "Mascaret 103.1.152",
        description: "Safety blade; Provides Superior Safety with Recoiling Spring System",
      },
      {
        name: "Hundal H-818-P",
        description: "Ideal Choice for Cutting Stretch Film, Plastic Bags, Plastic Straps, Twine and More. It Has a Self-Activating Safety Cap. The Blade Closes Automatically at the End of Each Cut",
      },
      {
        name: "Hundal H-814-A",
        description: "Short Cuff Argon Welding Glove, Made of Treated Goat Leather",
      },
      {
        name: "Hundal H-820-DYP",
        description: "Long Cuff Argon Welding Glove, Made of Cowhide. Non-Stick Surface for Welding Sparks",
      },
      {
        name: "Hundal H-170418C",
        description: "Leather Assembly Glove Reinforced Palm, Index Finger and Thumb CE EN388 4142X",
      },
      {
        name: "Hundal H-828-B",
        description: "Long Cuff Welding Glove, Non-Stick Surface for Welding Sparks Made of Cowhide EN388:2016 (3233X) EN407:2004 (413X4X) EN12477:2001+A1:2005",
      },
    ],
    workGloves: [
      {
        name: "Hundal H-818-P",
        description: "Leather Assembly Glove, Reinforced Palm, Index Finger and Thumb, CE EN388 4142X",
      },
      {
        name: "Hundal H-814-A",
        description: "Short Cuff Argon Welding Glove, Made of Treated Goat Leather",
      },
      {
        name: "Hundal H-820-DYP",
        description: "Long Cuff Argon Welding Glove, Made of Cowhide. Non-Stick Surface for Welding Sparks",
      },
      {
        name: "Hundal H-170418C",
        description: "Leather Assembly Glove Reinforced Palm, Index Finger and Thumb CE EN388 4142X",
      },
      {
        name: "Hundal H-828-B",
        description: "Leather Assembly Glove Made of Cowhide Hard Cotton Cuff CE EN388:2016 4123X",
      },
    ],
  };

  const filterProducts = (products: any, query: string) => {
    if (!query) return products;
    
    const filtered: any = {};
    Object.entries(products).forEach(([category, items]: [string, any]) => {
      const filteredItems = items.filter((item: any) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    return filtered;
  };

  const filteredProducts = filterProducts(products, searchQuery);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">Our Products</h1>
          <img 
            src="/lovable-uploads/2401d1ed-a520-43c6-b7cd-99b558306b25.png" 
            alt="Makpas Logo" 
            className="h-12"
          />
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="measuring" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="measuring">Measuring Tools</TabsTrigger>
            <TabsTrigger value="safetyKnives">Safety Knives</TabsTrigger>
            <TabsTrigger value="workGloves">Work Gloves</TabsTrigger>
          </TabsList>
          
          {Object.entries(filteredProducts).map(([category, items]: [string, any]) => (
            <TabsContent key={category} value={category}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((product: any, index: number) => (
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
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Products;
