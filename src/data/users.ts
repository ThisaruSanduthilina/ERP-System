import { User } from "@/types/auth";

export const users: User[] = [
  { email: "admin@gmail.com", username: "admin", role: "admin", name: "Admin User" },
  { email: "user@gmail.com", username: "user", role: "user", name: "Normal User" },
  { email: "sales@gmail.com", username: "sales", role: "sales", name: "Sales Manager" },
  { email: "shipping@gmail.com", username: "shipping", role: "shipping", name: "Shipping Manager" },
  { email: "purchasing@gmail.com", username: "purchasing", role: "purchasing", name: "Purchasing Manager" },
  { email: "accounting@gmail.com", username: "accounting", role: "accounting", name: "Accounting Manager" },
];