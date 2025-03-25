import { Users, Building2, UserPlus, CheckSquare, List } from "lucide-react";
import { MenuItem } from "@/types/menu";

export const customerMenuItems: MenuItem[] = [
  {
    name: "Customers",
    icon: Users,
    path: "/customers",
    roles: ["admin", "sales"],
    requirements: [
      { name: "Database", icon: Building2, path: "/customers/database", roles: ["admin", "sales"] },
      { name: "New Lead", icon: UserPlus, path: "/customers/new", roles: ["admin", "sales"] },
      { name: "Lead Records", icon: List, path: "/customers/leads", roles: ["admin", "sales"] },
      { name: "Follow-ups", icon: CheckSquare, path: "/customers/follow-ups", roles: ["admin", "sales"] }
    ],
  }
];