import { ChevronLeft, ChevronRight, Users, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { getMenuItemsByRole } from "@/utils/menuItems";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { MiniSidebar } from "./sidebar/MiniSidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

export function AppSidebar() {
  const { t } = useTranslation();
  const { createNewChat } = useChat();
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const menuItems = user ? getMenuItemsByRole(user.role) : [];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleExpand = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isGroupActive = (item: any) => {
    if (isActive(item.path)) return true;
    return item.requirements?.some((req: any) => isActive(req.path));
  };

  const SidebarContentComponent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2">
        <SidebarGroupLabel className="text-purple-700">
          {t(`${user?.role}.dashboard`)}
        </SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-purple-600 hover:text-purple-700"
          onClick={createNewChat}
        >
          <Users className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 [&_[data-radix-scroll-area-viewport]]:!scrollbar-none">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              {item.name === "Dashboard" || item.name === "Service Center" ? (
                <SidebarMenuButton 
                  className={cn(
                    "text-purple-600 hover:bg-purple-50 w-full px-3 py-2",
                    isActive(item.path) && "bg-purple-100 text-purple-800"
                  )}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </SidebarMenuButton>
              ) : (
                <>
                  <div 
                    className={cn(
                      "flex items-center px-3 py-2 text-purple-700 cursor-pointer hover:bg-purple-50",
                      isGroupActive(item) && "bg-purple-100"
                    )}
                    onClick={() => toggleExpand(item.name)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span className="flex-1">{item.name}</span>
                    {item.requirements && item.requirements.length > 0 && (
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedItems.includes(item.name) && "rotate-180"
                        )} 
                      />
                    )}
                  </div>
                  {item.requirements && item.requirements.length > 0 && expandedItems.includes(item.name) && (
                    <SidebarMenuSub>
                      {item.requirements.map((req) => (
                        <SidebarMenuItem key={req.name}>
                          <SidebarMenuButton 
                            className={cn(
                              "text-purple-600 hover:bg-purple-50 pl-8",
                              isActive(req.path) && "bg-purple-100 text-purple-800"
                            )}
                            onClick={() => handleNavigation(req.path)}
                          >
                            <req.icon className="h-4 w-4 mr-2" />
                            {req.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SidebarContentComponent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="relative hidden md:block">
      <Sidebar className="min-h-screen border-r border-purple-100/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed z-50 h-8 w-8 rounded-full bg-white shadow-sm border border-purple-100 hover:bg-purple-50 transition-all md:absolute md:-right-4 md:top-4"
          style={{
            left: state === "expanded" ? "14rem" : "3.5rem",
            top: "1rem",
          }}
        >
          {state === "expanded" ? (
            <ChevronLeft className="h-4 w-4 text-purple-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-purple-600" />
          )}
        </Button>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarContentComponent />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {state === "collapsed" && <MiniSidebar departments={menuItems} />}
    </div>
  );
}