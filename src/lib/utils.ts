// دوال مساعدة عامة
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم

import { format, formatDistanceToNow, isAfter, isBefore, addDays } from 'date-fns';
import { ar } from 'date-fns/locale';

// =============================================
// تنسيق التاريخ بالعربية
// =============================================
export function formatDate(date: string | Date): string {
  if (!date) return '-';
  return format(new Date(date), 'yyyy/MM/dd', { locale: ar });
}

// تنسيق التاريخ والوقت
export function formatDateTime(date: string | Date): string {
  if (!date) return '-';
  return format(new Date(date), 'yyyy/MM/dd HH:mm', { locale: ar });
}

// الوقت النسبي (منذ ساعتين، منذ يوم...)
export function timeAgo(date: string | Date): string {
  if (!date) return '-';
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ar });
}

// =============================================
// التحقق من الصلاحية
// =============================================
export function isExpired(expiryDate: string | Date): boolean {
  if (!expiryDate) return false;
  return isBefore(new Date(expiryDate), new Date());
}

export function isExpiringSoon(expiryDate: string | Date, daysThreshold: number = 90): boolean {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const threshold = addDays(new Date(), daysThreshold);
  return isAfter(expiry, new Date()) && isBefore(expiry, threshold);
}

// =============================================
// تنسيق الأرقام والعملة
// =============================================
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ar-LY').format(num);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-LY', {
    style: 'currency',
    currency: 'LYD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// =============================================
// ترجمة حالة الحركة
// =============================================
export function getTransactionStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'معلق',
    approved: 'معتمد',
    cancelled: 'ملغي',
  };
  return statusMap[status] || status;
}

// ألوان حالة الحركة
export function getTransactionStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'warning',
    approved: 'success',
    cancelled: 'danger',
  };
  return colorMap[status] || 'default';
}

// =============================================
// ترجمة نوع الحركة
// =============================================
export function getTransactionTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    inbound: 'إدخال',
    outbound: 'صرف',
    transfer: 'تحويل',
  };
  return typeMap[type] || type;
}

// ألوان نوع الحركة
export function getTransactionTypeColor(type: string): string {
  const colorMap: Record<string, string> = {
    inbound: 'success',
    outbound: 'danger',
    transfer: 'info',
  };
  return colorMap[type] || 'default';
}

// =============================================
// ترجمة صلاحيات المستخدم
// =============================================
export function getRoleLabel(role: string): string {
  const roleMap: Record<string, string> = {
    admin: 'مدير النظام',
    storekeeper: 'أمين مخزن',
    viewer: 'مراقب',
  };
  return roleMap[role] || role;
}

// =============================================
// توليد رقم حركة جديد
// =============================================
export function generateTransactionNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TRX-${year}-${random}`;
}

// =============================================
// التحقق من صحة البيانات
// =============================================
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^09\d{8}$/;
  return phoneRegex.test(phone);
}

// =============================================
// دالة debounce للبحث
// =============================================
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// =============================================
// كلاس مساعد لبناء فئات CSS
// =============================================
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
