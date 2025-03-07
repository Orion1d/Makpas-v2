
import { Search, Download } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface ProductSidebarProps {
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function ProductSidebar({
  groups,
  activeGroup,
  onGroupChange,
  searchQuery,
  onSearchChange,
  className = "",
}: ProductSidebarProps) {
  const { t } = useLanguage();
  const sortedGroups = ["all", ...groups.sort()];

  const getGroupDisplayName = (group: string) => {
    if (group === "all") {
      return t('all_products');
    }
    return group;
  };

  const handleCatalogDownload = () => {
    const link = document.createElement('a');
    link.href = '/src/components/Makpas_catalog_EN.pdf';
    link.download = 'Makpas_catalog_EN.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mobile filter bar component
  const MobileFilterBar = () => (
    <div className="md:hidden w-full space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b sticky top-14 z-20">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {sortedGroups.map((group) => (
          <button
            key={group}
            onClick={() => onGroupChange(group)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeGroup === group
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {getGroupDisplayName(group)}
          </button>
        ))}
      </div>
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2" 
        onClick={handleCatalogDownload}
      >
        <Download className="h-4 w-4" />
        <span>{t('download_catalog') || 'Download Catalog'}</span>
      </Button>
    </div>
  );

  return (
    <>
      <MobileFilterBar />
      <Sidebar className={`hidden md:flex md:flex-col sticky top-16 h-[calc(100vh-4rem)] ${className}`}>
        <SidebarContent className="flex-grow">
          <SidebarGroup>
            <SidebarGroupLabel>{t('search_products')}</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-8"
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="flex-grow">
            <SidebarGroupLabel>{t('product_groups')}</SidebarGroupLabel>
            <SidebarGroupContent className="h-full overflow-auto">
              <SidebarMenu>
                {sortedGroups.map((group) => (
                  <SidebarMenuItem key={group}>
                    <SidebarMenuButton
                      onClick={() => onGroupChange(group)}
                      className={`w-full capitalize ${
                        activeGroup === group
                          ? "bg-secondary text-secondary-foreground"
                          : ""
                      }`}
                    >
                      <span>{getGroupDisplayName(group)}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        {/* Sticky catalog download button */}
        <div className="sticky bottom-0 mt-auto p-2 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 shadow-sm hover:shadow-md transition-all" 
            onClick={handleCatalogDownload}
          >
            <Download className="h-4 w-4" />
            <span>{t('download_catalog') || 'Download Catalog'}</span>
          </Button>
        </div>
      </Sidebar>
    </>
  );
}
