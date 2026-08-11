// أنواع البيانات الرئيسية لمنظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم

// =============================================
// نوع المستخدم
// =============================================
export interface User {
  Id: number;
  FullName: string;
  Username: string;
  Role: 'admin' | 'storekeeper' | 'viewer';
  Email?: string;
  Phone?: string;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  LastLogin?: string;
}

// =============================================
// نوع المخزن
// =============================================
export interface Warehouse {
  Id: number;
  Name: string;
  Code: string;
  Location?: string;
  Type: string;
  ManagerId?: number;
  ManagerName?: string;
  Description?: string;
  IsActive: boolean;
  CreatedAt: string;
}

// =============================================
// نوع التصنيف
// =============================================
export interface Category {
  Id: number;
  Name: string;
  Description?: string;
  ParentId?: number;
  IsActive: boolean;
  CreatedAt: string;
}

// =============================================
// نوع الصنف
// =============================================
export interface Item {
  Id: number;
  Name: string;
  Code: string;
  Barcode?: string;
  CategoryId: number;
  CategoryName?: string;
  Unit: string;
  MinQuantity: number;
  MaxQuantity: number;
  ReorderLevel: number;
  Description?: string;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  TotalStock?: number;
}

// =============================================
// نوع رصيد الصنف
// =============================================
export interface ItemStock {
  Id: number;
  ItemId: number;
  ItemName?: string;
  ItemCode?: string;
  WarehouseId: number;
  WarehouseName?: string;
  Quantity: number;
  BatchNumber?: string;
  ExpiryDate?: string;
  UnitPrice: number;
  LastUpdated: string;
}

// =============================================
// نوع المورد
// =============================================
export interface Supplier {
  Id: number;
  Name: string;
  ContactPerson?: string;
  Phone?: string;
  Email?: string;
  Address?: string;
  TaxNumber?: string;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

// =============================================
// نوع حركة المخزون
// =============================================
export interface Transaction {
  Id: number;
  TransactionNumber: string;
  Type: 'inbound' | 'outbound' | 'transfer';
  Status: 'pending' | 'approved' | 'cancelled';
  WarehouseId: number;
  WarehouseName?: string;
  DestWarehouseId?: number;
  DestWarehouseName?: string;
  SupplierId?: number;
  SupplierName?: string;
  UserId: number;
  UserName?: string;
  ApprovedById?: number;
  ApprovedByName?: string;
  Notes?: string;
  TransactionDate: string;
  CreatedAt: string;
  Details?: TransactionDetail[];
}

// =============================================
// نوع تفاصيل الحركة
// =============================================
export interface TransactionDetail {
  Id: number;
  TransactionId: number;
  ItemId: number;
  ItemName?: string;
  ItemCode?: string;
  Quantity: number;
  UnitPrice: number;
  BatchNumber?: string;
  ExpiryDate?: string;
  Notes?: string;
}

// =============================================
// نوع سجل المراجعة
// =============================================
export interface AuditLog {
  Id: number;
  Action: string;
  TableName: string;
  RecordId?: number;
  OldValues?: string;
  NewValues?: string;
  UserId?: number;
  UserName?: string;
  IpAddress?: string;
  CreatedAt: string;
}

// =============================================
// أنواع إحصائيات لوحة التحكم
// =============================================
export interface DashboardStats {
  totalItems: number;
  totalStock: number;
  totalValue: number;
  lowStockItems: number;
  expiringItems: number;
  pendingTransactions: number;
  recentTransactions: Transaction[];
  expiryAlerts: ItemStock[];
  lowStockAlerts: (Item & { TotalStock: number })[];
  monthlyMovement: MonthlyMovement[];
}

export interface MonthlyMovement {
  month: string;
  inbound: number;
  outbound: number;
}

// =============================================
// نوع استجابة الـ API
// =============================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  total?: number;
}

// =============================================
// نوع بيانات تسجيل الدخول
// =============================================
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
  user: User;
}

// =============================================
// نوع معلمات البحث والفلترة
// =============================================
export interface SearchParams {
  search?: string;
  category?: number;
  warehouse?: number;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
