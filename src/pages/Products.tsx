
import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";
import type { Product } from "@/types/product";
import { motion } from "framer-motion";
import FloatingActionButton from "@/components/ctas/FloatingActionButton";
import StickyQuoteBar from "@/components/ctas/StickyQuoteBar";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { ProductsLoading } from "@/components/products/ProductsLoading";
import { Package, Search, X, ArrowUpDown, ChevronRight, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type SortOption = "priority" | "name-asc" | "name-desc" | "newest";

const Products = () => {
  const location = useLocation();
  const initialGroup = location.state?.activeGroup || "all";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(initialGroup);
  const [sortBy, setSortBy] = useState<SortOption>("priority");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { t, language } = useLanguage();
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('group_priority', { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data || []) as Product[];
    }
  });

  // Get unique product groups sorted by priority
  const productGroups = useMemo(() => {
    const groupMap = new Map<string, { priority: number; count: number }>();
    products.forEach(product => {
      const groupName = language === 'tr'
        ? product.Product_Group_tr || product.Product_Group || "other"
        : product.Product_Group || "other";
      const priority = product.group_priority ?? 999;
      const existing = groupMap.get(groupName);
      if (!existing || priority < existing.priority) {
        groupMap.set(groupName, { priority, count: (existing?.count || 0) + 1 });
      } else {
        groupMap.set(groupName, { ...existing, count: existing.count + 1 });
      }
    });
    return Array.from(groupMap.entries())
      .sort((a, b) => a[1].priority - b[1].priority)
      .map(([name, { count }]) => ({ name, count }));
  }, [products, language]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productName = language === 'tr' ? product.name_tr || product.name : product.name;
      const productDescription = language === 'tr' ? product.description_tr || product.description : product.description;
      const productGroup = language === 'tr' ? product.Product_Group_tr || product.Product_Group || "other" : product.Product_Group || "other";
      
      const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (productDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesGroup = activeGroup === "all" || productGroup.toLowerCase() === activeGroup.toLowerCase();
      
      return matchesSearch && matchesGroup;
    });
  }, [products, searchQuery, activeGroup, language]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => {
          const nameA = language === 'tr' ? a.name_tr || a.name : a.name;
          const nameB = language === 'tr' ? b.name_tr || b.name : b.name;
          return nameA.localeCompare(nameB);
        });
      case "name-desc":
        return sorted.sort((a, b) => {
          const nameA = language === 'tr' ? a.name_tr || a.name : a.name;
          const nameB = language === 'tr' ? b.name_tr || b.name : b.name;
          return nameB.localeCompare(nameA);
        });
      case "newest":
        return sorted.sort((a, b) => (b.id || 0) - (a.id || 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy, language]);

  // Group products by category
  const productsByGroup = useMemo(() => {
    if (activeGroup !== "all") {
      return { [activeGroup]: sortedProducts };
    }

    const grouped: { [key: string]: Product[] } = {};
    productGroups.forEach(({ name }) => { grouped[name] = []; });
    
    sortedProducts.forEach(product => {
      const group = language === 'tr' 
        ? product.Product_Group_tr || product.Product_Group || "other"
        : product.Product_Group || "other";
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(product);
    });

    Object.keys(grouped).forEach(key => {
      if (grouped[key].length === 0) delete grouped[key];
    });

    return grouped;
  }, [sortedProducts, productGroups, activeGroup, language]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveGroup("all");
    setSortBy("priority");
  };

  const hasActiveFilters = searchQuery !== "" || activeGroup !== "all" || sortBy !== "priority";

  const scrollToGroup = (groupName: string) => {
    setActiveGroup("all");
    setTimeout(() => {
      sectionRefs.current[groupName]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    document.title = `${t('products_page_title')} | Makpas`;
  }, [t]);

  if (isLoading) {
    return <ProductsLoading />;
  }

  const sortLabel = language === 'tr' ? 'Sırala' : 'Sort';

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <FloatingActionButton />
      <StickyQuoteBar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              <Package className="h-5 w-5 text-primary dark:text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {activeGroup === "all" ? t('products_page_title') : activeGroup}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ml-[44px]">
            {filteredProducts.length} {filteredProducts.length === 1 ? t('product') || 'product' : t('products') || 'products'}
          </p>
        </motion.div>

        {/* Sticky Category Tabs (horizontal) */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => setActiveGroup("all")}
              className={cn(
                "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                activeGroup === "all" 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {language === 'tr' ? 'Tümü' : 'All'}
            </button>
            {productGroups.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setActiveGroup(name)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize whitespace-nowrap",
                  activeGroup === name 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {name}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-32">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={language === 'tr' ? 'Ara...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>

              {/* Category List */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {language === 'tr' ? 'Kategoriler' : 'Categories'}
                </h3>
                <ScrollArea className="max-h-[400px]">
                  <nav className="space-y-0.5">
                    <button
                      onClick={() => setActiveGroup("all")}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                        activeGroup === "all" 
                          ? "bg-primary/10 text-primary font-medium dark:bg-primary/20 dark:text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span>{language === 'tr' ? 'Tüm Ürünler' : 'All Products'}</span>
                      <span className="text-xs opacity-60">{products.length}</span>
                    </button>
                    {productGroups.map(({ name, count }) => (
                      <button
                        key={name}
                        onClick={() => setActiveGroup(name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors capitalize",
                          activeGroup === name 
                            ? "bg-primary/10 text-primary font-medium dark:bg-primary/20 dark:text-primary-foreground" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span className="truncate text-left">{name}</span>
                        <span className="text-xs opacity-60 ml-2">{count}</span>
                      </button>
                    ))}
                  </nav>
                </ScrollArea>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {sortLabel}
                </h3>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">{language === 'tr' ? 'Varsayılan' : 'Default'}</SelectItem>
                    <SelectItem value="name-asc">{language === 'tr' ? 'İsim (A-Z)' : 'Name (A-Z)'}</SelectItem>
                    <SelectItem value="name-desc">{language === 'tr' ? 'İsim (Z-A)' : 'Name (Z-A)'}</SelectItem>
                    <SelectItem value="newest">{language === 'tr' ? 'En Yeni' : 'Newest'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="mt-4 w-full text-xs text-muted-foreground"
                >
                  <X className="h-3 w-3 mr-1" />
                  {language === 'tr' ? 'Filtreleri Temizle' : 'Clear All'}
                </Button>
              )}
            </div>
          </aside>

          {/* Mobile Filter Bar */}
          <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'tr' ? 'Ürün ara...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-card/95 backdrop-blur-md shadow-lg border-border/60 text-sm"
              />
            </div>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-auto h-10 bg-card/95 backdrop-blur-md shadow-lg border-border/60">
                <ArrowUpDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">{language === 'tr' ? 'Varsayılan' : 'Default'}</SelectItem>
                <SelectItem value="name-asc">A-Z</SelectItem>
                <SelectItem value="name-desc">Z-A</SelectItem>
                <SelectItem value="newest">{language === 'tr' ? 'En Yeni' : 'Newest'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    "{searchQuery}"
                    <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {activeGroup !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs capitalize">
                    {activeGroup}
                    <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => setActiveGroup("all")} />
                  </Badge>
                )}
                {sortBy !== "priority" && (
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                    {sortBy === "name-asc" ? "A-Z" : sortBy === "name-desc" ? "Z-A" : language === 'tr' ? 'En Yeni' : 'Newest'}
                    <X className="h-3 w-3 cursor-pointer ml-1" onClick={() => setSortBy("priority")} />
                  </Badge>
                )}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg font-medium">
                  {language === 'tr' ? 'Ürün bulunamadı.' : 'No products found.'}
                </p>
                <p className="text-muted-foreground/60 text-sm mt-1">
                  {language === 'tr' ? 'Filtrelerinizi değiştirmeyi deneyin.' : 'Try adjusting your filters.'}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-10">
                {Object.entries(productsByGroup).map(([groupName, groupProducts]) => (
                  <section 
                    key={groupName} 
                    ref={el => { if (el) sectionRefs.current[groupName] = el; }}
                  >
                    {activeGroup === "all" && (
                      <div className="flex items-center gap-3 mb-5">
                        <h2 className="text-lg font-semibold text-foreground capitalize whitespace-nowrap">
                          {groupName}
                        </h2>
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {groupProducts.length}
                        </span>
                      </div>
                    )}
                    <ProductsGrid products={groupProducts} language={language} showDescription />
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
