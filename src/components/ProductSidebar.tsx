import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

interface ProductSidebarProps {
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductSidebar({
  groups,
  activeGroup,
  onGroupChange,
  searchQuery,
  onSearchChange,
}: ProductSidebarProps) {
  const allGroups = ["all", ...groups];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Search Products</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Product Groups</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allGroups.map((group) => (
                <SidebarMenuItem key={group}>
                  <SidebarMenuButton
                    onClick={() => onGroupChange(group)}
                    className={`w-full capitalize ${
                      activeGroup === group
                        ? "bg-accent text-accent-foreground"
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
  );
}