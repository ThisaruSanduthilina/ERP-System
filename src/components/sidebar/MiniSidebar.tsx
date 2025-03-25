import { 
  ChevronRight,
  LogOut,
  UserRound,
  Settings,
  Bell,
  HelpCircle,
  MessageSquare,
  Calendar,
  Mail,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UserProfilePopover } from "../user/UserProfilePopover";
import { useSidebar } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface MiniSidebarProps {
  departments: Array<{
    name: string;
    icon: any;
    path: string;
    requirements?: Array<{
      name: string;
      icon: any;
      path: string;
    }>;
  }>;
}

export const MiniSidebar = ({ departments }: MiniSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSidebar } = useSidebar();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    navigate('/');
    setShowLogoutDialog(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isGroupActive = (dept: any) => {
    if (isActive(dept.path)) return true;
    return dept.requirements?.some((req: any) => isActive(req.path));
  };

  const handleNavigation = (dept: any) => {
    switch (dept.name) {
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Service Center":
        navigate("/service");
        break;
      case "Vehicle Management":
        navigate("/vehicles/inventory");
        break;
      case "Sales":
        navigate("/sales/orders");
        break;
      case "Customers":
        navigate("/customers/database");
        break;
      case "Administration":
        navigate("/admin/settings");
        break;
      case "Notifications":
        navigate("/notifications/messages");
        break;
      case "Help & Support":
        navigate("/support/docs");
        break;
      case "Finance":
        navigate("/finance");
        break;
      default:
        navigate(dept.path);
    }
  };

  const quickAccessItems = [
    { icon: MessageSquare, path: '/notifications/messages', label: 'Messages' },
    { icon: Calendar, path: '/notifications/calendar', label: 'Calendar' },
    { icon: Mail, path: '/notifications/mail', label: 'Mail' },
    { icon: Bell, path: '/notifications', label: 'Notifications' },
    { icon: Settings, path: '/admin/settings', label: 'Settings' },
    { icon: HelpCircle, path: '/support/docs', label: 'Help' },
  ];

  return (
    <>
      <div className="fixed left-0 top-0 z-20 flex h-screen w-16 flex-col justify-between bg-white/80 backdrop-blur-sm border-r border-purple-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-4 top-4 z-50 h-8 w-8 rounded-full bg-white shadow-sm border border-purple-100 hover:bg-purple-50 transition-all"
        >
          <ChevronRight className="h-4 w-4 text-purple-600" />
        </Button>

        <ScrollArea className="flex-1 pt-20 px-4">
          <div className="flex flex-col items-center space-y-6">
            {departments.map((dept) => (
              <Popover key={dept.name}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <div 
                      className={cn(
                        "h-8 w-8 flex items-center justify-center text-purple-600 cursor-pointer hover:bg-purple-50 rounded-md",
                        isGroupActive(dept) && "bg-purple-100 text-purple-800"
                      )}
                      onClick={() => handleNavigation(dept)}
                    >
                      <dept.icon className="h-4 w-4" />
                    </div>
                  </div>
                </PopoverTrigger>
                
                {dept.requirements && dept.requirements.length > 0 && (
                  <PopoverContent 
                    side="right" 
                    className="p-2 w-48 bg-white rounded-md shadow-lg border border-purple-100"
                    sideOffset={5}
                  >
                    <div className="flex flex-col gap-1">
                      {dept.requirements.map((req) => (
                        <Button
                          key={req.name}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 px-3 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50",
                            isActive(req.path) && "bg-purple-100 text-purple-800"
                          )}
                          onClick={() => navigate(req.path)}
                        >
                          <req.icon className="h-4 w-4" />
                          <span>{req.name}</span>
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            ))}

            <Separator className="w-8 bg-purple-100" />

            {quickAccessItems.map((item) => (
              <Popover key={item.label}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-8 w-8 p-0 text-purple-600 hover:bg-purple-50 rounded-md",
                      isActive(item.path) && "bg-purple-100 text-purple-800"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="p-2">
                  <p className="text-sm text-purple-600">{item.label}</p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </ScrollArea>

        <div className="mb-6 flex flex-col items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-purple-600 hover:bg-purple-50 rounded-md"
              >
                <UserRound className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right" className="p-0">
              <UserProfilePopover />
            </PopoverContent>
          </Popover>

          <Separator className="w-8 bg-purple-100" />

          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-purple-600 hover:bg-purple-50 rounded-md"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end your current session and return you to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
