// صفحة إدارة الأصناف الطبية
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Package,
  Download,
  X,
  Save,
  AlertCircle,
  ThermometerSnowflake,
  Box,
  Building2,
  MapPin,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export interface MedicalItem {
  Id: number;
  Code: string;
  Name: string;
  Manufacturer: string;
  Category: string;
  Unit: 'علبة' | 'صندوق' | 'كيس' | 'زجاجة' | 'أمبول' | 'لفة';
  StorageCondition: 'ثلاجة' | 'خارج الثلاجة';
  DetailedLocation: string;
  MinQty: number;
  MaxQty: number;
  ReorderLevel: number;
  Stock: number;
  Price: number;
  Status: 'متوفر' | 'منخفض' | 'نفذت الكمية';
}

// بيانات الأصناف الطبية الشاملة
const initialItemsData: MedicalItem[] = [
  { Id: 1, Code: 'ITM-001', Name: 'أكياس دم مفردة 450ml', Manufacturer: 'Terumo BCT', Category: 'أكياس الدم', Unit: 'كيس', StorageCondition: 'ثلاجة', DetailedLocation: 'ثلاجة حفظ أكياس الدم #1 - الرف A', MinQty: 200, MaxQty: 5000, ReorderLevel: 500, Stock: 2300, Price: 15.50, Status: 'متوفر' },
  { Id: 2, Code: 'ITM-002', Name: 'أكياس دم مزدوجة 450ml', Manufacturer: 'Fresenius Kabi', Category: 'أكياس الدم', Unit: 'كيس', StorageCondition: 'ثلاجة', DetailedLocation: 'ثلاجة حفظ أكياس الدم #2 - الرف B', MinQty: 150, MaxQty: 3000, ReorderLevel: 400, Stock: 1100, Price: 22.00, Status: 'متوفر' },
  { Id: 3, Code: 'ITM-003', Name: 'أكياس دم ثلاثية 450ml', Manufacturer: 'Fresenius Kabi', Category: 'أكياس الدم', Unit: 'كيس', StorageCondition: 'ثلاجة', DetailedLocation: 'ثلاجة حفظ أكياس الدم #2 - الرف C', MinQty: 100, MaxQty: 2000, ReorderLevel: 300, Stock: 400, Price: 28.50, Status: 'منخفض' },
  { Id: 4, Code: 'ITM-004', Name: 'كاشف فصيلة الدم Anti-A', Manufacturer: 'Biotest Medical', Category: 'الكواشف والمحاليل', Unit: 'زجاجة', StorageCondition: 'ثلاجة', DetailedLocation: 'ثلاجة الكواشف والمحاليل #1 - الرف 2', MinQty: 50, MaxQty: 500, ReorderLevel: 100, Stock: 185, Price: 45.00, Status: 'متوفر' },
  { Id: 5, Code: 'ITM-005', Name: 'كاشف فصيلة الدم Anti-B', Manufacturer: 'Biotest Medical', Category: 'الكواشف والمحاليل', Unit: 'زجاجة', StorageCondition: 'ثلاجة', DetailedLocation: 'ثلاجة الكواشف والمحاليل #1 - الرف 2', MinQty: 50, MaxQty: 500, ReorderLevel: 100, Stock: 130, Price: 45.00, Status: 'متوفر' },
  { Id: 6, Code: 'ITM-006', Name: 'كاشف فصيلة الدم Anti-D (Rh)', Manufacturer: 'Merck Healthcare', Category: 'الكواشف والمحاليل', Unit: 'زجاجة', StorageCondition: 'ثلاجة', DetailedLocation: 'ثلاجة الكواشف والمحاليل #2 - الرف 1', MinQty: 80, MaxQty: 600, ReorderLevel: 150, Stock: 90, Price: 48.00, Status: 'منخفض' },
  { Id: 7, Code: 'ITM-007', Name: 'إبر سحب دم معقمة 16G', Manufacturer: 'Becton Dickinson', Category: 'المستلزمات الطبية', Unit: 'صندوق', StorageCondition: 'خارج الثلاجة', DetailedLocation: 'مخزن المستلزمات الجافة - الممر 3 - الرف C', MinQty: 300, MaxQty: 10000, ReorderLevel: 1000, Stock: 4800, Price: 8.50, Status: 'متوفر' },
  { Id: 8, Code: 'ITM-008', Name: 'قفازات طبية لاتكس بدون بودرة M', Manufacturer: 'Ansell Healthcare', Category: 'مستلزمات السلامة', Unit: 'علبة', StorageCondition: 'خارج الثلاجة', DetailedLocation: 'مخزن الوقاية والسلامة - الممر 1 - الرف A', MinQty: 200, MaxQty: 8000, ReorderLevel: 800, Stock: 2800, Price: 12.00, Status: 'متوفر' },
  { Id: 9, Code: 'ITM-009', Name: 'أنابيب اختبار فحص الدم EDTA K3', Manufacturer: 'Greiner Bio-One', Category: 'المواد المخبرية', Unit: 'صندوق', StorageCondition: 'خارج الثلاجة', DetailedLocation: 'مخزن الفحوصات المخبرية - الممر 2 - الرف B', MinQty: 100, MaxQty: 3000, ReorderLevel: 300, Stock: 500, Price: 18.00, Status: 'متوفر' },
  { Id: 10, Code: 'ITM-010', Name: 'محلول ملحي معقم Saline 0.9% 500ml', Manufacturer: 'Baxter Medical', Category: 'الكواشف والمحاليل', Unit: 'زجاجة', StorageCondition: 'خارج الثلاجة', DetailedLocation: 'مخزن المحاليل الطبية - الممر 4 - الرف D', MinQty: 200, MaxQty: 4000, ReorderLevel: 500, Stock: 850, Price: 5.50, Status: 'متوفر' },
];

const categories = ['الكل', 'أكياس الدم', 'الكواشف والمحاليل', 'المستلزمات الطبية', 'مستلزمات السلامة', 'المواد المخبرية'];
const storageConditions = ['الكل', 'ثلاجة', 'خارج الثلاجة'];
const unitTypes = ['علبة', 'صندوق', 'كيس', 'زجاجة', 'أمبول', 'لفة'];

export default function InventoryPage() {
  const [items, setItems] = useState<MedicalItem[]>(initialItemsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedStorage, setSelectedStorage] = useState('الكل');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MedicalItem | null>(null);

  // نموذج إضافة صنف جديد
  const [newItem, setNewItem] = useState({
    Code: `ITM-0${items.length + 1}`,
    Name: '',
    Manufacturer: '',
    Category: 'أكياس الدم',
    Unit: 'علبة' as MedicalItem['Unit'],
    StorageCondition: 'ثلاجة' as MedicalItem['StorageCondition'],
    DetailedLocation: '',
    MinQty: '100',
    MaxQty: '2000',
    ReorderLevel: '300',
    Stock: '500',
    Price: '10.00',
  });

  // فلترة الأصناف
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || item.Category === selectedCategory;
    const matchesStorage = selectedStorage === 'الكل' || item.StorageCondition === selectedStorage;

    return matchesSearch && matchesCategory && matchesStorage;
  });

  // حفظ صنف جديد
  const handleSaveNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.Name || !newItem.Code) return;

    const min = parseInt(newItem.MinQty) || 0;
    const stock = parseInt(newItem.Stock) || 0;
    const reorder = parseInt(newItem.ReorderLevel) || 0;

    let status: MedicalItem['Status'] = 'متوفر';
    if (stock <= 0) status = 'نفذت الكمية';
    else if (stock <= reorder) status = 'منخفض';

    const itemToAdd: MedicalItem = {
      Id: items.length + 1,
      Code: newItem.Code,
      Name: newItem.Name,
      Manufacturer: newItem.Manufacturer || 'شركة عامة',
      Category: newItem.Category,
      Unit: newItem.Unit,
      StorageCondition: newItem.StorageCondition,
      DetailedLocation: newItem.DetailedLocation || 'المخزن الرئيسي',
      MinQty: min,
      MaxQty: parseInt(newItem.MaxQty) || 1000,
      ReorderLevel: reorder,
      Stock: stock,
      Price: parseFloat(newItem.Price) || 0,
      Status: status,
    };

    setItems([itemToAdd, ...items]);
    setShowAddModal(false);
    setNewItem({
      Code: `ITM-0${items.length + 2}`,
      Name: '',
      Manufacturer: '',
      Category: 'أكياس الدم',
      Unit: 'علبة',
      StorageCondition: 'ثلاجة',
      DetailedLocation: '',
      MinQty: '100',
      MaxQty: '2000',
      ReorderLevel: '300',
      Stock: '500',
      Price: '10.00',
    });
  };

  const handleView = (item: MedicalItem) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  return (
    <>
      <Header title="إدارة الأصناف الطبية" subtitle="الرئيسية / إدارة الأصناف والمخزون" />

      <div className="page-content">
        {/* رأس الصفحة */}
        <div className="page-header">
          <div>
            <h1 className="page-header-title">سجل الأصناف والمواد الطبية</h1>
            <p className="page-header-subtitle">
              متابعة مواصفات الأصناف، الشركة المصنعة، أماكن التخزين (ثلاجة / خارج ثلاجة)، ونقاط إعادة الطلب
            </p>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => alert('تم تصدير سجل الأصناف بنجاح')}>
              <Download size={16} />
              تصدير الأصناف
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <Plus size={18} />
              إضافة صنف جديد
            </button>
          </div>
        </div>

        {/* كروت ملخص الرصيد والتبريد */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ce1126' }}>
              <Package size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>إجمالي الأصناف المسجلة</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>{items.length} صنف</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <ThermometerSnowflake size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>أصناف مبردة (ثلاجة)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb' }}>
                {items.filter(i => i.StorageCondition === 'ثلاجة').length} صنف
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>أصناف عند نقطة التكليف</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ea580c' }}>
                {items.filter(i => i.Stock <= i.ReorderLevel).length} صنف
              </div>
            </div>
          </div>
        </div>

        {/* شريط البحث والفلترة */}
        <div className="table-container">
          <div className="table-toolbar">
            <div className="table-toolbar-right" style={{ flexWrap: 'wrap', gap: '10px' }}>
              <div className="table-search" style={{ minWidth: '260px' }}>
                <Search className="table-search-icon" size={16} />
                <input
                  type="text"
                  placeholder="بحث باسم الصنف، الرمز، أو المصنّع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* فلتر التصنيف */}
              <select
                className="form-select"
                style={{ width: '180px', padding: '9px 12px' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>التصنيف: {cat}</option>
                ))}
              </select>

              {/* فلتر التخزين (ثلاجة / خارج ثلاجة) */}
              <select
                className="form-select"
                style={{ width: '180px', padding: '9px 12px' }}
                value={selectedStorage}
                onChange={(e) => setSelectedStorage(e.target.value)}
              >
                {storageConditions.map((st) => (
                  <option key={st} value={st}>التخزين: {st}</option>
                ))}
              </select>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                عرض {filteredItems.length} من أصل {items.length} صنف
              </span>
            </div>
          </div>

          {/* جدول عرض الأصناف */}
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>رمز الصنف</th>
                <th>اسم الصنف</th>
                <th>الشركة المصنعة</th>
                <th>نوع الوحدة</th>
                <th>مكان التخزين</th>
                <th>الرصيد الحالي</th>
                <th>نقطة إعادة الطلب</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.Id}>
                  <td style={{ color: '#94a3b8', fontWeight: 600 }}>{index + 1}</td>
                  <td>
                    <span className="badge badge-default" style={{ fontWeight: 700 }}>{item.Code}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{item.Name}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#475569' }}>
                      <Building2 size={13} style={{ color: '#64748b' }} />
                      {item.Manufacturer}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-info">{item.Unit}</span>
                  </td>
                  <td>
                    {item.StorageCondition === 'ثلاجة' ? (
                      <span className="badge badge-primary" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                        <ThermometerSnowflake size={13} style={{ marginLeft: '4px' }} />
                        ثلاجة mبردة
                      </span>
                    ) : (
                      <span className="badge badge-default" style={{ background: '#f8fafc', color: '#475569' }}>
                        <Box size={13} style={{ marginLeft: '4px' }} />
                        خارج الثلاجة
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: item.Stock <= item.ReorderLevel ? '#dc2626' : '#15803d'
                    }}>
                      {item.Stock.toLocaleString('ar-LY')} {item.Unit}
                    </span>
                  </td>
                  <td style={{ color: '#64748b', fontSize: '0.88rem' }}>
                    {item.ReorderLevel} {item.Unit}
                  </td>
                  <td>
                    {item.Stock <= item.ReorderLevel ? (
                      <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <AlertTriangle size={12} /> إعادة طلب
                      </span>
                    ) : (
                      <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={12} /> كافٍ
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className="btn-icon"
                        title="عرض تفاصيل الصنف"
                        onClick={() => handleView(item)}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* نافذة إضافة صنف جديد */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
              <div className="modal-header">
                <h3 className="modal-title">
                  <Package size={20} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '8px', color: '#ce1126' }} />
                  إضافة صنف طبي جديد
                </h3>
                <button className="modal-close" onClick={() => setShowAddModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveNewItem}>
                <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">رقم / رمز الصنف <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        value={newItem.Code}
                        onChange={(e) => setNewItem({ ...newItem, Code: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">اسم الصنف <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="مثال: كاشف فصائل Anti-D"
                        required
                        value={newItem.Name}
                        onChange={(e) => setNewItem({ ...newItem, Name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">الشركة المصنعة <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="مثال: Terumo BCT / Fresenius"
                        required
                        value={newItem.Manufacturer}
                        onChange={(e) => setNewItem({ ...newItem, Manufacturer: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">التصنيف</label>
                      <select
                        className="form-select"
                        value={newItem.Category}
                        onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })}
                      >
                        {categories.filter(c => c !== 'الكل').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">نوع الوحدة <span className="required">*</span></label>
                      <select
                        className="form-select"
                        value={newItem.Unit}
                        onChange={(e) => setNewItem({ ...newItem, Unit: e.target.value as MedicalItem['Unit'] })}
                      >
                        {unitTypes.map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">مكان التخزين <span className="required">*</span></label>
                      <select
                        className="form-select"
                        value={newItem.StorageCondition}
                        onChange={(e) => setNewItem({ ...newItem, StorageCondition: e.target.value as MedicalItem['StorageCondition'] })}
                      >
                        <option value="ثلاجة">ثلاجة مبردة (Cold Storage 2-8°C)</option>
                        <option value="خارج الثلاجة">خارج الثلاجة (Ambient Room Temp)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">موقع التخزين بالتفصيل</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: ثلاجة حفظ أكياس الدم #2 - الرف B"
                      value={newItem.DetailedLocation}
                      onChange={(e) => setNewItem({ ...newItem, DetailedLocation: e.target.value })}
                    />
                  </div>

                  <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div className="form-group">
                      <label className="form-label">الحد الأدنى</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newItem.MinQty}
                        onChange={(e) => setNewItem({ ...newItem, MinQty: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">نقطة إعادة الطلب</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newItem.ReorderLevel}
                        onChange={(e) => setNewItem({ ...newItem, ReorderLevel: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">الحد الأقصى</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newItem.MaxQty}
                        onChange={(e) => setNewItem({ ...newItem, MaxQty: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    حفظ الصنف
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نافذة عرض تفاصيل الصنف */}
        {showViewModal && selectedItem && (
          <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <div className="modal-header">
                <h3 className="modal-title">تفاصيل الصنف الطبي</h3>
                <button className="modal-close" onClick={() => setShowViewModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{selectedItem.Name}</h2>
                    <span className="badge badge-default">{selectedItem.Code}</span>
                  </div>
                  <span className="badge badge-primary">{selectedItem.Category}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>الشركة المصنعة:</span>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{selectedItem.Manufacturer}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>نوع الوحدة:</span>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{selectedItem.Unit}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>حالة ومكان التخزين:</span>
                    <div style={{ fontWeight: 700, color: selectedItem.StorageCondition === 'ثلاجة' ? '#2563eb' : '#475569' }}>
                      {selectedItem.StorageCondition}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>الموقع التفصيلي:</span>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{selectedItem.DetailedLocation}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>الرصيد الحالي:</span>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#15803d' }}>{selectedItem.Stock} {selectedItem.Unit}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>نقطة إعادة الطلب:</span>
                    <div style={{ fontWeight: 700, color: '#ea580c' }}>{selectedItem.ReorderLevel} {selectedItem.Unit}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>الحد الأدنى:</span>
                    <div style={{ fontWeight: 700 }}>{selectedItem.MinQty} {selectedItem.Unit}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>الحد الأقصى:</span>
                    <div style={{ fontWeight: 700 }}>{selectedItem.MaxQty} {selectedItem.Unit}</div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
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
