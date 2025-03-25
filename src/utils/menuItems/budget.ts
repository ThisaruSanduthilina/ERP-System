import { Wallet } from "lucide-react";
import { MenuItem } from "@/types/menu";

export const budgetMenuItems: MenuItem[] = [
  {
    name: "Budget Management",
    icon: Wallet,
    path: "/backoffice/budget",
    roles: ["admin", "accounting"],
    requirements: [
      {
        name: "Add Monthly Budget",
        icon: Wallet,
        path: "/backoffice/budget/add",
        roles: ["admin", "accounting"]
      }
    ],
  }
];