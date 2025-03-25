import { 
  LayoutDashboard,
  Wrench,
  Car,
  DollarSign,
  Bell,
  HelpCircle,
  ClipboardList,
  BarChart3,
  FileText,
  PackageSearch,
  MessageSquare,
  Calendar,
  Mail,
  BookOpen,
  Ship,
  Container,
  Truck,
  Box,
  Warehouse,
  Anchor,
  Plus,
  List
} from "lucide-react";
import { MenuItem } from "@/types/menu";
import { customerMenuItems } from "./customer";

export const baseMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"],
  },
  {
    name: "Service Center",
    icon: Wrench,
    path: "/service",
    roles: ["admin", "user"],
  },
  {
    name: "Vehicle Management",
    icon: Car,
    path: "/vehicles",
    roles: ["admin", "sales", "shipping"],
    requirements: [
      { name: "Inventory", icon: PackageSearch, path: "/vehicles/inventory", roles: ["admin", "sales"] },
      { name: "Maintenance", icon: Wrench, path: "/vehicles/maintenance", roles: ["admin"] },
      { name: "Documents", icon: FileText, path: "/vehicles/documents", roles: ["admin", "sales"] }
    ],
  },
  {
    name: "Sales",
    icon: DollarSign,
    path: "/sales",
    roles: ["admin", "sales", "accounting"],
    requirements: [
      { name: "Orders", icon: ClipboardList, path: "/sales/orders", roles: ["admin", "sales", "accounting"] },
      { name: "Analytics", icon: BarChart3, path: "/sales/analytics", roles: ["admin", "sales"] },
      { name: "Reports", icon: FileText, path: "/sales/reports", roles: ["admin", "accounting"] }
    ],
  },
  ...customerMenuItems,
  {
    name: "Notifications",
    icon: Bell,
    path: "/notifications",
    roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"],
    requirements: [
      { name: "Messages", icon: MessageSquare, path: "/notifications/messages", roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"] },
      { name: "Calendar", icon: Calendar, path: "/notifications/calendar", roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"] },
      { name: "Mail", icon: Mail, path: "/notifications/mail", roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"] }
    ],
  },
  {
    name: "Help & Support",
    icon: HelpCircle,
    path: "/support",
    roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"],
    requirements: [
      { name: "Documentation", icon: BookOpen, path: "/support/docs", roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"] },
      { name: "Contact", icon: MessageSquare, path: "/support/contact", roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"] },
      { name: "FAQs", icon: FileText, path: "/support/faqs", roles: ["admin", "user", "sales", "purchasing", "accounting", "shipping"] }
    ],
  },
  {
    name: "Shipping",
    icon: Ship,
    path: "/shipping",
    roles: ["admin", "shipping"],
    requirements: [
      { 
        name: "Orders", 
        icon: Container, 
        path: "/shipping/orders", 
        roles: ["admin", "shipping"] 
      },
      { 
        name: "Inventory", 
        icon: Box, 
        path: "/shipping/inventory", 
        roles: ["admin", "shipping"] 
      },
      { 
        name: "Tracking", 
        icon: Truck, 
        path: "/shipping/tracking", 
        roles: ["admin", "shipping"] 
      },
      { 
        name: "Warehouses", 
        icon: Warehouse, 
        path: "/shipping/warehouses", 
        roles: ["admin", "shipping"] 
      },
      { 
        name: "Freight Forwarders", 
        icon: Anchor, 
        path: "/shipping/freight-forwarders", 
        roles: ["admin", "shipping"] 
      }
    ],
  },
  {
    name: "Inventory",
    icon: Box,
    path: "/inventory",
    roles: ["admin", "sales", "shipping"],
    requirements: [
      { 
        name: "Add Item", 
        icon: Plus, 
        path: "/inventory/add", 
        roles: ["admin", "sales"] 
      },
      { 
        name: "View List", 
        icon: List, 
        path: "/inventory/list", 
        roles: ["admin", "sales", "shipping"] 
      }
    ],
  }
];