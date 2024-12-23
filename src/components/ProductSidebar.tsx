import { Search } from "lucide-react";
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

  // Mobile filter bar component
  const MobileFilterBar = () => (
    <div className="md:hidden w-full space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b sticky top-0 z-20">
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
            {group}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <MobileFilterBar />
      <Sidebar className={`hidden md:block sticky top-4 h-[calc(100vh-2rem)] ${className}`}>
        <SidebarContent>
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
          <SidebarGroup>
            <SidebarGroupLabel>{t('product_groups')}</SidebarGroupLabel>
            <SidebarGroupContent>
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
                      <span>{group}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}