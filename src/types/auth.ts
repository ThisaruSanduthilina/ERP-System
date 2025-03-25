export type UserRole = 'admin' | 'user' | 'sales' | 'purchasing' | 'accounting' | 'shipping';

export interface User {
  avatar: string;
  phone: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  phone: any;
  id?: number;
  email: string;
  username?: string;
  role: UserRole;
  name: string;
}