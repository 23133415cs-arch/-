// صفحة إعدادات النظام
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { useTheme } from '@/context/ThemeContext';
import {
  Settings,
  Save,
  Database,
  Bell,
  Shield,
  Globe,
  Palette,
  Info,
  CheckCircle,
  AlertTriangle,
  Server,
  RefreshCw,
  Sun,
  Moon,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  // الإعدادات العامة
  const [orgName, setOrgName] = useState('الهيئة الوطنية لخدمات نقل الدم - ليبيا');
  const [systemName, setSystemName] = useState('منظومة إدارة المخازن');
  const [defaultWarehouse, setDefaultWarehouse] = useState('المخزن الرئيسي - طرابلس');
  const [currency, setCurrency] = useState('دينار ليبي (د.ل)');

  // إعدادات التنبيهات
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [expiryAlert, setExpiryAlert] = useState(true);
  const [expiryDays, setExpiryDays] = useState(90);
  const [emailNotif, setEmailNotif] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'عام', icon: Globe },
    { id: 'theme', label: 'المظهر (Light/Dark)', icon: Palette },
    { id: 'notifications', label: 'التنبيهات', icon: Bell },
    { id: 'database', label: 'قاعدة البيانات', icon: Database },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'about', label: 'حول النظام', icon: Info },
  ];

  return (
    <>
      <Header title="إعدادات النظام" subtitle="الرئيسية / الإعدادات" />

      <div className="page-content">
        {/* عنوان الصفحة */}
        <div className="page-header">
          <div>
            <h1 className="page-header-title">إعدادات النظام</h1>
            <p className="page-header-subtitle">تكوين وضبط إعدادات منظومة إدارة المخازن</p>
          </div>
          {saved && (
            <div className="alert" style={{ background: 'var(--success-50)', border: '1px solid var(--success-500)', color: 'var(--success-700)', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: 'var(--radius-md)' }}>
              <CheckCircle size={16} />
              تم حفظ الإعدادات بنجاح
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', alignItems: 'start' }}>
          {/* قائمة التبويبات */}
          <div className="card" style={{ position: 'sticky', top: '80px' }}>
            <div className="card-body" style={{ padding: '8px' }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: activeTab === tab.id ? 'var(--primary-50)' : 'transparent',
                      color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--text-secondary)',
                      fontFamily: 'Cairo',
                      fontWeight: activeTab === tab.id ? 700 : 500,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'right',
                      marginBottom: '2px',
                    }}
                  >
                    <Icon size={17} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* محتوى الإعدادات */}
          <div>
            {/* الإعدادات العامة */}
            {activeTab === 'general' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><Globe size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} /> الإعدادات العامة</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">اسم المؤسسة</label>
                    <input
                      type="text"
                      className="form-input"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">اسم النظام</label>
                    <input
                      type="text"
                      className="form-input"
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">المخزن الافتراضي</label>
                      <select className="form-select" value={defaultWarehouse} onChange={(e) => setDefaultWarehouse(e.target.value)}>
                        <option>المخزن الرئيسي - طرابلس</option>
                        <option>مخزن بنغازي</option>
                        <option>مخزن مصراتة</option>
                        <option>مخزن سبها</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">العملة</label>
                      <select className="form-select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option>دينار ليبي (د.ل)</option>
                        <option>دولار أمريكي ($)</option>
                        <option>يورو (€)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">اللغة</label>
                      <select className="form-select">
                        <option>العربية</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">تنسيق التاريخ</label>
                      <select className="form-select">
                        <option>YYYY-MM-DD</option>
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px' }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                      <Save size={16} />
                      حفظ الإعدادات
                    </button>
                    <button className="btn btn-secondary">إلغاء</button>
                  </div>
                </div>
              </div>
            )}

            {/* إعدادات المظهر والوضع */}
            {activeTab === 'theme' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <Palette size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} />
                    إعدادات المظهر والوضع
                  </h3>
                </div>
                <div className="card-body">
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>
                    اختر وضع الرؤية المفضل لديك في المنظومة. الوضع النهارى (Light Mode) هو الوضع الافتراضي للواجهة.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    {/* خيار الوضع النهاري */}
                    <div
                      onClick={() => setTheme('light')}
                      style={{
                        padding: '24px',
                        borderRadius: 'var(--radius-lg)',
                        border: `2px solid ${theme === 'light' ? 'var(--primary-600)' : 'var(--border-light)'}`,
                        background: '#ffffff',
                        color: '#0f172a',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: theme === 'light' ? '0 4px 14px rgba(220,38,38,0.15)' : 'none',
                      }}
                    >
                      {theme === 'light' && (
                        <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--primary-600)', color: 'white', borderRadius: '50%', padding: '4px' }}>
                          <Check size={14} />
                        </span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: '#fee2e2', color: '#dc2626' }}>
                          <Sun size={24} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>الوضع النهاري (Light Mode)</div>
                          <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>الافتراضي</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        خلفية بيضاء مريحة للعين مع تباين عالي للنصوص والجداول، مناسب لبيئة العمل أثناء النهار.
                      </p>
                    </div>

                    {/* خيار الوضع الليلي */}
                    <div
                      onClick={() => setTheme('dark')}
                      style={{
                        padding: '24px',
                        borderRadius: 'var(--radius-lg)',
                        border: `2px solid ${theme === 'dark' ? 'var(--primary-600)' : 'var(--border-light)'}`,
                        background: '#0f172a',
                        color: '#f8fafc',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: theme === 'dark' ? '0 4px 14px rgba(220,38,38,0.3)' : 'none',
                      }}
                    >
                      {theme === 'dark' && (
                        <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--primary-600)', color: 'white', borderRadius: '50%', padding: '4px' }}>
                          <Check size={14} />
                        </span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: '#334155', color: '#f59e0b' }}>
                          <Moon size={24} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#f8fafc' }}>الوضع الليلي (Dark Mode)</div>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>مظهر داكن أنيق</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                        خلفية داكنة تقلل من إجهاد العين في الإضاءة المنخفضة مع إبراز العناصر الهامة بقوة.
                      </p>
                    </div>
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                      <Save size={16} />
                      حفظ التفضيلات
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* إعدادات التنبيهات */}
            {activeTab === 'notifications' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><Bell size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} /> إعدادات التنبيهات</h3>
                </div>
                <div className="card-body">
                  {/* تنبيه نقص المخزون */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>تنبيه نقص المخزون</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>تنبيه عند وصول الأصناف للحد الأدنى</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={lowStockAlert} onChange={(e) => setLowStockAlert(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: '13px',
                        background: lowStockAlert ? 'var(--success-500)' : 'var(--border-medium)',
                        transition: '0.3s ease',
                      }}>
                        <span style={{
                          position: 'absolute',
                          width: '20px', height: '20px', top: '3px',
                          left: lowStockAlert ? '25px' : '3px',
                          background: 'white', borderRadius: '50%',
                          transition: '0.3s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* تنبيه انتهاء الصلاحية */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>تنبيه انتهاء الصلاحية</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>تنبيه عند اقتراب انتهاء الصلاحية</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={expiryAlert} onChange={(e) => setExpiryAlert(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: '13px',
                        background: expiryAlert ? 'var(--success-500)' : 'var(--border-medium)',
                        transition: '0.3s ease',
                      }}>
                        <span style={{
                          position: 'absolute',
                          width: '20px', height: '20px', top: '3px',
                          left: expiryAlert ? '25px' : '3px',
                          background: 'white', borderRadius: '50%',
                          transition: '0.3s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }} />
                      </span>
                    </label>
                  </div>

                  {expiryAlert && (
                    <div className="form-group">
                      <label className="form-label">
                        <AlertTriangle size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
                        التنبيه قبل انتهاء الصلاحية بـ (أيام)
                      </label>
                      <input
                        type="number"
                        className="form-input"
                        value={expiryDays}
                        onChange={(e) => setExpiryDays(Number(e.target.value))}
                        style={{ maxWidth: '200px' }}
                        min={7} max={365}
                      />
                    </div>
                  )}

                  {/* التنبيهات عبر البريد الإلكتروني */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>التنبيهات عبر البريد الإلكتروني</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>إرسال التنبيهات إلى البريد الإلكتروني للمسؤولين</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: '13px',
                        background: emailNotif ? 'var(--success-500)' : 'var(--border-medium)',
                        transition: '0.3s ease',
                      }}>
                        <span style={{
                          position: 'absolute',
                          width: '20px', height: '20px', top: '3px',
                          left: emailNotif ? '25px' : '3px',
                          background: 'white', borderRadius: '50%',
                          transition: '0.3s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }} />
                      </span>
                    </label>
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    <button className="btn btn-primary" onClick={handleSave}>
                      <Save size={16} />
                      حفظ الإعدادات
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* قاعدة البيانات */}
            {activeTab === 'database' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><Database size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} /> إعدادات قاعدة البيانات</h3>
                </div>
                <div className="card-body">
                  <div style={{ padding: '16px', background: 'var(--success-50)', borderRadius: 'var(--radius-md)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={18} style={{ color: 'var(--success-600)' }} />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--success-700)', fontSize: '0.9rem' }}>حالة الاتصال: متصل</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--success-600)' }}>SQL Server - BloodBankWMS</div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label"><Server size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} /> الخادم</label>
                      <input type="text" className="form-input" defaultValue="localhost" style={{ direction: 'ltr' }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">اسم قاعدة البيانات</label>
                      <input type="text" className="form-input" defaultValue="BloodBankWMS" style={{ direction: 'ltr' }} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">اسم المستخدم</label>
                      <input type="text" className="form-input" defaultValue="sa" style={{ direction: 'ltr' }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">كلمة المرور</label>
                      <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    <button className="btn btn-secondary">
                      <RefreshCw size={16} />
                      اختبار الاتصال
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                      <Save size={16} />
                      حفظ
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* الأمان */}
            {activeTab === 'security' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><Shield size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} /> إعدادات الأمان</h3>
                </div>
                <div className="card-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">الحد الأدنى لطول كلمة المرور</label>
                      <input type="number" className="form-input" defaultValue={8} min={6} max={20} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">مدة انتهاء الجلسة (دقائق)</label>
                      <input type="number" className="form-input" defaultValue={60} min={15} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">عدد محاولات تسجيل الدخول الفاشلة قبل الإيقاف</label>
                    <input type="number" className="form-input" defaultValue={5} min={3} max={10} style={{ maxWidth: '200px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>تسجيل سجل النشاط (Audit Log)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>تسجيل جميع عمليات المستخدمين</div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', inset: 0, borderRadius: '13px', background: 'var(--success-500)' }}>
                        <span style={{ position: 'absolute', width: '20px', height: '20px', top: '3px', left: '25px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                      </span>
                    </label>
                  </div>
                  <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    <button className="btn btn-primary" onClick={handleSave}><Save size={16} /> حفظ</button>
                  </div>
                </div>
              </div>
            )}

            {/* حول النظام */}
            {activeTab === 'about' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><Info size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px' }} /> حول النظام</h3>
                </div>
                <div className="card-body">
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', borderRadius: 'var(--radius-lg)', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Settings size={40} style={{ color: 'var(--primary-600)' }} />
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>منظومة إدارة المخازن</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>الهيئة الوطنية لخدمات نقل الدم - ليبيا</p>
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>الإصدار 1.0.0</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { label: 'الإصدار', value: '1.0.0' },
                      { label: 'إطار العمل', value: 'Next.js 15' },
                      { label: 'قاعدة البيانات', value: 'SQL Server 2019' },
                      { label: 'تاريخ الإصدار', value: '2026-08-01' },
                      { label: 'اللغة', value: 'TypeScript' },
                      { label: 'بيئة التشغيل', value: 'Node.js' },
                    ].map((item) => (
                      <div key={item.label} style={{ padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontWeight: 700 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
