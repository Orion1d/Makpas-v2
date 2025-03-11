import { Search, Download, Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
interface ProductSidebarProps {
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters?: () => void;
  activeFilters?: string[];
  className?: string;
}
export function ProductSidebar({
  groups,
  activeGroup,
  onGroupChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  activeFilters = [],
  className = ""
}: ProductSidebarProps) {
  const {
    t
  } = useLanguage();
  const sortedGroups = ["all", ...groups.sort()];
  const [isFocused, setIsFocused] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>("categories");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Demo filter categories for the industrial sidebar
  const filterCategories = [{
    id: "categories",
    name: t('product_groups') || "Product Groups",
    options: sortedGroups.map(group => ({
      id: group,
      name: getGroupDisplayName(group),
      checked: activeGroup === group
    }))
  }, {
    id: "material",
    name: t('material') || "Material",
    options: [{
      id: "steel",
      name: t('steel') || "Steel",
      checked: activeFilters.includes("steel")
    }, {
      id: "aluminum",
      name: t('aluminum') || "Aluminum",
      checked: activeFilters.includes("aluminum")
    }, {
      id: "plastic",
      name: t('plastic') || "Plastic",
      checked: activeFilters.includes("plastic")
    }]
  }, {
    id: "certification",
    name: t('certification') || "Certification",
    options: [{
      id: "iso9001",
      name: "ISO 9001",
      checked: activeFilters.includes("iso9001")
    }, {
      id: "ce",
      name: "CE",
      checked: activeFilters.includes("ce")
    }]
  }];

  // Simulated search suggestions for autocomplete
  const searchSuggestions = ["Industrial Parts", "Mechanical Components", "Hydraulic Systems", "Control Units", "Safety Equipment"].filter(suggestion => searchQuery && suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && suggestion.toLowerCase() !== searchQuery.toLowerCase());
  function getGroupDisplayName(group: string) {
    if (group === "all") {
      return t('all_products');
    }
    return group;
  }
  const handleCatalogDownload = () => {
    const link = document.createElement('a');
    link.href = '/src/components/Makpas_catalog_EN.pdf';
    link.download = 'Makpas_catalog_EN.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const clearSearch = () => {
    onSearchChange("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  const handleAccordionChange = (value: string) => {
    setOpenCategory(value === openCategory ? null : value);
  };

  // Mobile filter bar component
  const MobileFilterBar = () => <div className="md:hidden w-full space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b sticky top-14 z-20">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-primary dark:text-white">
          {t('filters') || 'Filters'}
        </h3>
        {(searchQuery || activeGroup !== "all" || activeFilters.length > 0) && <Button variant="link" size="sm" onClick={onClearFilters} className="text-secondary hover:text-secondary/80 py-0 h-auto">
            {t('clear_all') || 'Clear all'}
          </Button>}
      </div>
      
      <div className="relative">
        <div className={`relative border-b-2 transition-colors duration-300 ${isFocused ? 'border-safety-orange' : 'border-gray-300 dark:border-gray-700'}`}>
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
            <Search className={`h-4 w-4 transition-colors duration-300 ${isFocused ? 'text-safety-orange' : 'text-muted-foreground'}`} />
          </div>
          
          <Input ref={searchInputRef} placeholder={t('search_placeholder')} value={searchQuery} onChange={e => onSearchChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="pl-8 border-none shadow-none focus-visible:ring-0 py-2 bg-transparent" />
          
          {searchQuery && <button onClick={clearSearch} className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="h-4 w-4" />
            </button>}
        </div>
        
        {/* Search Autocomplete Dropdown */}
        <AnimatePresence>
          {isFocused && searchQuery && searchSuggestions.length > 0 && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} transition={{
          duration: 0.2
        }} className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <ul className="py-1">
                {searchSuggestions.map(suggestion => <li key={suggestion}>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => onSearchChange(suggestion)}>
                      {suggestion}
                    </button>
                  </li>)}
              </ul>
            </motion.div>}
        </AnimatePresence>
      </div>
      
      <div className="space-y-2">
        <Accordion type="single" collapsible value={openCategory || ""} onValueChange={handleAccordionChange} className="w-full">
          {filterCategories.map(category => <AccordionItem key={category.id} value={category.id} className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 py-2">
                  {category.options.map(option => <label key={option.id} className="flex items-center space-x-3 py-1 px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${option.checked ? 'bg-safety-orange border-safety-orange' : 'border-gray-300 dark:border-gray-600'}`}>
                        {option.checked && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                      <span className="text-sm">{option.name}</span>
                    </label>)}
                </div>
              </AccordionContent>
            </AccordionItem>)}
        </Accordion>
      </div>
    </div>;
  return <>
      <MobileFilterBar />
      <Sidebar className={`hidden md:flex md:flex-col sticky top-16 h-[calc(100vh-4rem)] ${className}`}>
        <SidebarContent className="flex-grow pb-2">
          {/* Enhanced Search Bar */}
          <SidebarGroup>
            <SidebarGroupLabel>{t('search_products')}</SidebarGroupLabel>
            <SidebarGroupContent className="px-3">
              <div className="relative">
                <div className={`relative border-b-2 transition-colors duration-300 ${isFocused ? 'border-safety-orange' : 'border-gray-300 dark:border-gray-700'}`}>
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
                    <Search className={`h-4 w-4 transition-colors duration-300 ${isFocused ? 'text-safety-orange' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <Input ref={searchInputRef} placeholder={t('search_placeholder')} value={searchQuery} onChange={e => onSearchChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="pl-8 border-none shadow-none focus-visible:ring-0 py-2 bg-transparent" />
                  
                  {searchQuery && <button onClick={clearSearch} className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <X className="h-4 w-4" />
                    </button>}
                </div>
                
                {/* Search Autocomplete Dropdown */}
                <AnimatePresence>
                  {isFocused && searchQuery && searchSuggestions.length > 0 && <motion.div initial={{
                  opacity: 0,
                  y: -10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -10
                }} transition={{
                  duration: 0.2
                }} className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <ul className="py-1">
                        {searchSuggestions.map(suggestion => <li key={suggestion}>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => onSearchChange(suggestion)}>
                              {suggestion}
                            </button>
                          </li>)}
                      </ul>
                    </motion.div>}
                </AnimatePresence>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {/* Filters */}
          <div className="overflow-auto flex-grow">
            <Accordion type="single" collapsible value={openCategory || ""} onValueChange={handleAccordionChange} className="w-full">
              {filterCategories.map(category => <AccordionItem key={category.id} value={category.id} className="border-b border-gray-200 dark:border-gray-700 px-3">
                  
                  <AccordionContent>
                    <div className="space-y-2 py-2">
                      {category.options.map(option => <label key={option.id} className="flex items-center space-x-3 py-1.5 px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => category.id === "categories" ? onGroupChange(option.id) : null}>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${option.checked ? 'bg-safety-orange border-safety-orange' : 'border-gray-300 dark:border-gray-600'}`}>
                            {option.checked && <Check className="h-3.5 w-3.5 text-white" />}
                          </div>
                          <span className={cn("text-sm", option.checked && "font-medium")}>
                            {option.name}
                          </span>
                        </label>)}
                    </div>
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </SidebarContent>
        
        {/* Sticky catalog download button */}
        <div className="sticky bottom-0 mt-auto p-2 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <Button variant="outline" className="w-full flex items-center gap-2 shadow-sm hover:shadow-md transition-all" onClick={handleCatalogDownload}>
            <Download className="h-4 w-4" />
            <span>{t('download_catalog') || 'Download Catalog'}</span>
          </Button>
        </div>
      </Sidebar>
    </>;
}