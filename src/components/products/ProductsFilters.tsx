
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeGroup: string;
  onGroupChange: (group: string) => void;
  groups: string[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const ProductsFilters = ({
  searchQuery,
  onSearchChange,
  activeGroup,
  onGroupChange,
  groups,
  onClearFilters,
  hasActiveFilters
}: ProductsFiltersProps) => {
  const { t } = useLanguage();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const sortedGroups = ["all", ...groups.sort()];

  const getGroupDisplayName = (group: string) => {
    if (group === "all") {
      return t('all_products') || 'All Products';
    }
    return group;
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          placeholder={t('search_placeholder') || 'Search products...'}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {t('filters') || 'Filters'}
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              1
            </span>
          )}
        </Button>
      </div>

      {/* Filter Groups */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-2 mb-4">
          {sortedGroups.map((group) => (
            <Button
              key={group}
              variant={activeGroup === group ? "default" : "outline"}
              size="sm"
              onClick={() => onGroupChange(group)}
              className="capitalize"
            >
              {getGroupDisplayName(group)}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Filters Dropdown */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="border rounded-lg p-4 bg-background">
              <h3 className="font-medium mb-3">{t('product_groups') || 'Product Groups'}</h3>
              <div className="grid grid-cols-2 gap-2">
                {sortedGroups.map((group) => (
                  <Button
                    key={group}
                    variant={activeGroup === group ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      onGroupChange(group);
                      setIsFiltersOpen(false);
                    }}
                    className="capitalize text-left justify-start"
                  >
                    {getGroupDisplayName(group)}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          {searchQuery && (
            <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <span>"{searchQuery}"</span>
              <button onClick={() => onSearchChange('')}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {activeGroup !== "all" && (
            <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <span>{activeGroup}</span>
              <button onClick={() => onGroupChange('all')}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-secondary hover:text-secondary/80"
          >
            {t('clear_all') || 'Clear all'}
          </Button>
        </div>
      )}
    </div>
  );
};
