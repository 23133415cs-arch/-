// مكون القائمة الجانبية
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ArrowLeftRight,
  FileBarChart,
  Truck,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

// عناصر القائمة الرئيسية
const mainNavItems = [
  { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/inventory', label: 'الأصناف', icon: Package },
  { href: '/warehouses', label: 'المخازن', icon: Warehouse },
  { href: '/transactions', label: 'حركة المخزون', icon: ArrowLeftRight },
  { href: '/suppliers', label: 'الموردين', icon: Truck },
  { href: '/reports', label: 'التقارير', icon: FileBarChart },
];

// عناصر الإدارة
const adminNavItems = [
  { href: '/users', label: 'المستخدمين', icon: Users },
  { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export default function Sidebar() {
  // المسار الحالي لتحديد العنصر النشط
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* رأس القائمة - الشعار والعنوان */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img
            src="/logo.png"
            alt="شعار الهيئة الوطنية لخدمات نقل الدم"
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px', background: '#ffffff' }}
          />
        </div>
        <h1 className="sidebar-title">
          الهيئة الوطنية لخدمات نقل الدم
        </h1>
        <p className="sidebar-subtitle">منظومة إدارة المخازن</p>
      </div>

      {/* قائمة التنقل */}
      <nav className="sidebar-nav">
        {/* القسم الرئيسي */}
        <div className="nav-section-title">القائمة الرئيسية</div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link href={item.href} key={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon className="nav-item-icon" size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        {/* قسم الإدارة */}
        <div className="nav-section-title">الإدارة</div>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className={`nav-item ${isActive ? 'active' : ''}`}>
                <Icon className="nav-item-icon" size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        {/* زر تسجيل الخروج */}
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <div
            className="nav-item logout-nav-item"
            onClick={() => {
              try {
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
              } catch {}
              window.location.href = '/login';
            }}
            style={{ cursor: 'pointer' }}
          >
            <LogOut className="nav-item-icon" size={20} />
            <span>تسجيل الخروج</span>
          </div>
        </div>

        {/* شارة الحماية */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          color: 'var(--text-tertiary)',
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <ShieldCheck size={14} />
          <span>نظام محمي ومؤمن</span>
        </div>
      </nav>
    </aside>
  );
}
