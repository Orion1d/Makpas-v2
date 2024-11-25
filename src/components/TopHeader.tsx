import { Mail } from "lucide-react";

const TopHeader = () => {
  return (
    <div className="bg-primary text-white text-sm transition-all duration-300" id="top-header">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-8">
          <div>ISO 9001 Certificated</div>
          <a href="mailto:Makpas@makpas.com" className="flex items-center gap-1 hover:text-secondary transition-colors">
            <Mail size={14} />
            Makpas@makpas.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;