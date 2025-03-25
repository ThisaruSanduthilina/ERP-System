import { users as mockUsers } from '@/data/users';

interface CreateUserPayload {
  username: string;
  email: string;
  full_name: string;
  role_id: number;
  password: string;
}

interface UserRole {
  name: string;
  description: string;
  id: number;
  permissions: string[];
}

interface User {
  username: string;
  email: string;
  full_name: string;
  role_id: number;
  id: number;
  role: UserRole;
}

// Mock data for roles
const mockRoles: { [key: string]: UserRole } = {
  admin: { name: 'admin', description: 'Administrator', id: 1, permissions: ['all'] },
  user: { name: 'user', description: 'Regular User', id: 2, permissions: ['read'] },
  sales: { name: 'sales', description: 'Sales Manager', id: 3, permissions: ['sales'] },
  shipping: { name: 'shipping', description: 'Shipping Manager', id: 4, permissions: ['shipping'] },
  purchasing: { name: 'purchasing', description: 'Purchasing Manager', id: 5, permissions: ['purchasing'] },
  accounting: { name: 'accounting', description: 'Accounting Manager', id: 6, permissions: ['accounting'] },
};

// Convert mock users to the expected format
const formattedUsers: User[] = mockUsers.map((user, index) => ({
  id: index + 1,
  username: user.username || '',
  email: user.email,
  full_name: user.name,
  role_id: mockRoles[user.role].id,
  role: mockRoles[user.role]
}));

export const getUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return formattedUsers;
};

export const createUser = async (userData: CreateUserPayload): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newUser: User = {
    id: formattedUsers.length + 1,
    username: userData.username,
    email: userData.email,
    full_name: userData.full_name,
    role_id: userData.role_id,
    role: Object.values(mockRoles).find(role => role.id === userData.role_id) || mockRoles.user
  };
  
  formattedUsers.push(newUser);
  return newUser;
};

export const updateUserRole = async (userId: number, newRole: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = formattedUsers.find(u => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  const role = mockRoles[newRole];
  if (!role) {
    throw new Error('Invalid role');
  }
  
  user.role = role;
  user.role_id = role.id;
  
  return user;
};