import { FileText, Brain, BookOpen, Building2, CreditCard } from "lucide-react";
import { MenuItem } from "@/types/menu";

export const accountingMenuItems: MenuItem[] = [
  {
    name: "Accounting",
    icon: FileText,
    path: "/accounting",
    roles: ["admin", "accounting"],
    requirements: [
      {
        name: "Automated Entries",
        icon: FileText,
        path: "/accounting/automated-entries",
        roles: ["admin", "accounting"]
      },
      {
        name: "AI Discrepancy Detection",
        icon: Brain,
        path: "/accounting/discrepancy-detection",
        roles: ["admin", "accounting"]
      },
      {
        name: "Chart of Accounts",
        icon: BookOpen,
        path: "/accounting/chart-of-accounts",
        roles: ["admin", "accounting"]
      },
      {
        name: "Bank Accounts",
        icon: CreditCard,
        path: "/accounting/bank-accounts",
        roles: ["admin", "accounting"]
      }
    ]
  },
  {
    name: "Finance",
    icon: Building2,
    path: "/finance",
    roles: ["admin", "accounting"],
    requirements: [
      {
        name: "Overview",
        icon: FileText,
        path: "/finance",
        roles: ["admin", "accounting"]
      },
      {
        name: "PayPal Integration",
        icon: CreditCard,
        path: "/finance/paypal-integration",
        roles: ["admin", "accounting"]
      }
    ]
  }
];