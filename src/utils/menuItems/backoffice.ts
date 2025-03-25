import { Building2, Receipt, Calculator, PieChart, Wallet } from "lucide-react";
import { MenuItem } from "@/types/menu";

export const backofficeMenuItems: MenuItem[] = [
  {
    name: "BackOffice",
    icon: Building2,
    path: "/backoffice",
    roles: ["admin", "accounting"],
    requirements: [
      { 
        name: "Invoice Management", 
        icon: Receipt, 
        path: "/backoffice/invoices", 
        roles: ["admin", "accounting"] 
      },
      { 
        name: "Cost Calculator", 
        icon: Calculator, 
        path: "/backoffice/calculator", 
        roles: ["admin", "accounting"] 
      },
      { 
        name: "Reports", 
        icon: PieChart, 
        path: "/backoffice/reports", 
        roles: ["admin", "accounting"] 
      },
      {
        name: "Add Monthly Budget",
        icon: Wallet,
        path: "/backoffice/budget/add",
        roles: ["admin", "accounting"]
      }
    ],
  }
];