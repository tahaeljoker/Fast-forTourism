export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  lastLogin?: string;
  token?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'employee';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

export interface FormDataType {
  name: string;
  email: string;
  phone: string;
  role: User['role'];
  status: User['status'];
  permissions: string[];
}

export const permissionLabels: { [key: string]: string } = {
  'manage_tours': 'إدارة الجولات',
  'manage_offers': 'إدارة العروض',
  'manage_visas': 'إدارة التأشيرات',
  'manage_content': 'إدارة المحتوى',
  'manage_users': 'إدارة المستخدمين',
  'view_analytics': 'عرض الإحصائيات',
  'manage_settings': 'إدارة الإعدادات'
};