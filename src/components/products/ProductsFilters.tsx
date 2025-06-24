
import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={t('search_products') || 'Search products...'}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('filters') || 'Filters'}:
          </span>
        </div>
        
        <Select value={activeGroup} onValueChange={onGroupChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t('all_categories') || 'All Categories'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all_categories') || 'All Categories'}</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group} value={group} className="capitalize">
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-sm"
          >
            <X className="h-3 w-3 mr-1" />
            {t('clear_filters') || 'Clear Filters'}
          </Button>
        )}
      </div>

      {/* Mobile Filters Toggle */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {t('filters') || 'Filters'}
          </span>
          <span className="text-xs text-gray-500">
            {hasActiveFilters ? t('active') || 'Active' : ''}
          </span>
        </Button>

        {showMobileFilters && (
          <div className="mt-4 p-4 border rounded-lg space-y-4 bg-white dark:bg-gray-800">
            <Select value={activeGroup} onValueChange={onGroupChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('all_categories') || 'All Categories'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_categories') || 'All Categories'}</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group} value={group} className="capitalize">
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="w-full"
              >
                <X className="h-3 w-3 mr-1" />
                {t('clear_filters') || 'Clear Filters'}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSearchChange("")}
              />
            </Badge>
          )}
          {activeGroup !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1 capitalize">
              Category: {activeGroup}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onGroupChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
