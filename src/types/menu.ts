import { LucideIcon } from "lucide-react";
import { UserRole } from "./auth";

export interface MenuRequirement {
  name: string;
  icon: LucideIcon;
  path: string;
  roles: UserRole[];
}

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
  roles: UserRole[];
  requirements?: MenuRequirement[];
}