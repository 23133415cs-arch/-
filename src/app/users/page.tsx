// صفحة إدارة المستخدمين والصلاحيات
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Users,
  Plus,
  Search,
  Edit,
  Eye,
  X,
  Save,
  User,
  ShieldCheck,
  CheckCircle,
  XCircle,
  FileCheck2,
  Lock,
} from 'lucide-react';

export interface AppUser {
  Id: number;
  FullName: string;
  Username: string;
  Role: 'admin' | 'storekeeper' | 'committee';
  RoleLabel: 'مدير النظام' | 'مسؤول المخزن' | 'لجنة الاستلام';
  Email: string;
  Warehouse: string;
  LastLogin: string;
  IsActive: boolean;
  Permissions: {
    AddEditItem: boolean;
    ApproveReceiving: boolean; // إذن الاستلام المعاينة
    CreateIssueVoucher: boolean; // إذن الصرف
    ViewReports: boolean; // التقارير
  };
}

const initialUsersData: AppUser[] = [
  {
    Id: 1,
    FullName: 'مدير النظام الرئيسي',
    Username: 'admin',
    Role: 'admin',
    RoleLabel: 'مدير النظام',
    Email: 'admin@blood-bank.ly',
    Warehouse: 'جميع المخازن والفروع',
    LastLogin: '2026-08-05',
    IsActive: true,
    Permissions: { AddEditItem: true, ApproveReceiving: true, CreateIssueVoucher: true, ViewReports: true },
  },
  {
    Id: 2,
    FullName: 'أحمد محمد الصالح',
    Username: 'ahmed',
    Role: 'storekeeper',
    RoleLabel: 'مسؤول المخزن',
    Email: 'ahmed@blood-bank.ly',
    Warehouse: 'المخزن الرئيسي - طرابلس',
    LastLogin: '2026-08-04',
    IsActive: true,
    Permissions: { AddEditItem: true, ApproveReceiving: false, CreateIssueVoucher: true, ViewReports: true },
  },
  {
    Id: 3,
    FullName: 'د. علي الفيتوري (لجنة الاستلام)',
    Username: 'committee_ali',
    Role: 'committee',
    RoleLabel: 'لجنة الاستلام',
    Email: 'ali.committee@blood-bank.ly',
    Warehouse: 'لجنة استلام المواد الطبية',
    LastLogin: '2026-08-03',
    IsActive: true,
    Permissions: { AddEditItem: false, ApproveReceiving: true, CreateIssueVoucher: false, ViewReports: true },
  },
  {
    Id: 4,
    FullName: 'فاطمة علي الزروق',
    Username: 'fatima',
    Role: 'storekeeper',
    RoleLabel: 'مسؤول المخزن',
    Email: 'fatima@blood-bank.ly',
    Warehouse: 'مخزن بنغازي',
    LastLogin: '2026-07-28',
    IsActive: true,
    Permissions: { AddEditItem: true, ApproveReceiving: false, CreateIssueVoucher: true, ViewReports: true },
  },
];

const roleBadgeColor: Record<string, string> = {
  admin: 'badge-danger',
  storekeeper: 'badge-primary',
  committee: 'badge-warning',
};

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>(initialUsersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);

  const [newUser, setNewUser] = useState({
    FullName: '',
    Username: '',
    Role: 'storekeeper' as AppUser['Role'],
    Email: '',
    Warehouse: 'المخزن الرئيسي - طرابلس',
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.FullName || !newUser.Username) return;

    let roleLabel: AppUser['RoleLabel'] = 'مسؤول المخزن';
    if (newUser.Role === 'admin') roleLabel = 'مدير النظام';
    if (newUser.Role === 'committee') roleLabel = 'لجنة الاستلام';

    const userObj: AppUser = {
      Id: users.length + 1,
      FullName: newUser.FullName,
      Username: newUser.Username,
      Role: newUser.Role,
      RoleLabel: roleLabel,
      Email: newUser.Email || `${newUser.Username}@blood-bank.ly`,
      Warehouse: newUser.Warehouse,
      LastLogin: 'لم يدخل بعد',
      IsActive: true,
      Permissions: {
        AddEditItem: newUser.Role !== 'committee',
        ApproveReceiving: newUser.Role === 'admin' || newUser.Role === 'committee',
        CreateIssueVoucher: newUser.Role !== 'committee',
        ViewReports: true,
      },
    };

    setUsers([...users, userObj]);
    setShowAddModal(false);
  };

  const filtered = users.filter(
    (u) =>
      u.FullName.includes(searchTerm) ||
      u.Username.includes(searchTerm) ||
      u.RoleLabel.includes(searchTerm)
  );

  return (
    <>
      <Header title="المستخدمون والصلاحيات" subtitle="الرئيسية / المستخدمون والصلاحيات" />

      <div className="page-content">
        {/* رأس الصفحة */}
        <div className="page-header">
          <div>
            <h1 className="page-header-title">إدارة المستخدمين والأدوار الوظيفية</h1>
            <p className="page-header-subtitle">
              تحديد الصلاحيات الأدوار: مدير النظام، مسؤول المخزن، ولجنة الاستلام للمعايتنة والإقرار
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            إضافة مستخدم جديد
          </button>
        </div>

        {/* بطاقات الأدوار الثلاثة الأساسية */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef2f2', color: '#ce1126', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>مديرو النظام</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>
                {users.filter(u => u.Role === 'admin').length} مستخدم
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>مسؤولو المخازن</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb' }}>
                {users.filter(u => u.Role === 'storekeeper').length} مستخدم
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={26} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>أعضاء لجنة الاستلام</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ea580c' }}>
                {users.filter(u => u.Role === 'committee').length} مستخدم
              </div>
            </div>
          </div>
        </div>

        {/* جدول المستخدمين والصلاحيات */}
        <div className="table-container">
          <div className="table-toolbar">
            <div className="table-search" style={{ minWidth: '280px' }}>
              <Search className="table-search-icon" size={16} />
              <input
                type="text"
                placeholder="بحث باسم المستخدم أو الدور..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                عرض {filtered.length} مستخدم مسجل
              </span>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>اسم المستخدم</th>
                <th>اسم الحساب</th>
                <th>الدور والصلاحية</th>
                <th>المخزن التابع</th>
                <th>صلاحية إذن الاستلام</th>
                <th>صلاحية إذن الصرف</th>
                <th>صلاحية التقارير</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.Id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{u.FullName}</td>
                  <td><span className="badge badge-default">{u.Username}</span></td>
                  <td>
                    <span className={`badge ${roleBadgeColor[u.Role] || 'badge-default'}`}>
                      {u.RoleLabel}
                    </span>
                  </td>
                  <td style={{ color: '#475569', fontSize: '0.88rem' }}>{u.Warehouse}</td>
                  <td>
                    {u.Permissions.ApproveReceiving ? (
                      <span className="badge badge-success">مخول للمعاينة والاعتماد</span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>غير مخول</span>
                    )}
                  </td>
                  <td>
                    {u.Permissions.CreateIssueVoucher ? (
                      <span className="badge badge-primary">مخول للصرف</span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>غير مخول</span>
                    )}
                  </td>
                  <td>
                    {u.Permissions.ViewReports ? (
                      <span className="badge badge-success">متاح</span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>محظور</span>
                    )}
                  </td>
                  <td>
                    {u.IsActive ? (
                      <span className="badge badge-success">نشط</span>
                    ) : (
                      <span className="badge badge-danger">معطل</span>
                    )}
                  </td>
                  <td>
                    <button className="btn-icon" title="عرض تفاصيل الصلاحيات" onClick={() => setSelectedUser(u)}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* نافذة إضافة مستخدم جديد */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
              <div className="modal-header">
                <h3 className="modal-title">إضافة مستخدم وتحديد الصلاحية</h3>
                <button className="modal-close" onClick={() => setShowAddModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateUser}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">الاسم الكامل <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: د. طارق علي"
                      required
                      value={newUser.FullName}
                      onChange={(e) => setNewUser({ ...newUser, FullName: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">اسم المستخدم (Username) <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="tariq"
                        required
                        value={newUser.Username}
                        onChange={(e) => setNewUser({ ...newUser, Username: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">الدور الوظيفي <span className="required">*</span></label>
                      <select
                        className="form-select"
                        value={newUser.Role}
                        onChange={(e) => setNewUser({ ...newUser, Role: e.target.value as AppUser['Role'] })}
                      >
                        <option value="admin">مدير النظام (جميع الصلاحيات)</option>
                        <option value="storekeeper">مسؤول المخزن (إضافة وإذن صرف)</option>
                        <option value="committee">لجنة الاستلام (معاينة واعتماد التوريد)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">البريد الإلكتروني</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="tariq@blood-bank.ly"
                      value={newUser.Email}
                      onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">المخزن المسؤول عنه</label>
                    <select
                      className="form-select"
                      value={newUser.Warehouse}
                      onChange={(e) => setNewUser({ ...newUser, Warehouse: e.target.value })}
                    >
                      <option value="جميع المخازن والفروع">جميع المخازن والفروع</option>
                      <option value="المخزن الرئيسي - طرابلس">المخزن الرئيسي - طرابلس</option>
                      <option value="مخزن بنغازي">مخزن بنغازي</option>
                      <option value="مخزن مصراتة">مخزن مصراتة</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    حفظ المستخدم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نافذة تفاصيل صلاحيات المستخدم */}
        {selectedUser && (
          <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
              <div className="modal-header">
                <h3 className="modal-title">صلاحيات حساب {selectedUser.FullName}</h3>
                <button className="modal-close" onClick={() => setSelectedUser(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>الدور الوظيفي: {selectedUser.RoleLabel}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>المخزن: {selectedUser.Warehouse}</div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>جدول الصلاحيات الممنوحة:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>إضافة وتعديل الأصناف الطبية:</span>
                    {selectedUser.Permissions.AddEditItem ? <CheckCircle size={18} style={{ color: '#16a34a' }} /> : <XCircle size={18} style={{ color: '#dc2626' }} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>معاينة واعتماد إذونات الاستلام (لجنة الاستلام):</span>
                    {selectedUser.Permissions.ApproveReceiving ? <CheckCircle size={18} style={{ color: '#16a34a' }} /> : <XCircle size={18} style={{ color: '#dc2626' }} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>إنشاء وإكتمال إذونات الصرف للجهات المستفيدة:</span>
                    {selectedUser.Permissions.CreateIssueVoucher ? <CheckCircle size={18} style={{ color: '#16a34a' }} /> : <XCircle size={18} style={{ color: '#dc2626' }} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>استعراض واستخراج التقارير الخمسة:</span>
                    {selectedUser.Permissions.ViewReports ? <CheckCircle size={18} style={{ color: '#16a34a' }} /> : <XCircle size={18} style={{ color: '#dc2626' }} />}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
