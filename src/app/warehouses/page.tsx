// صفحة إدارة المخازن وأماكن التخزين
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Warehouse,
  Plus,
  MapPin,
  User,
  Package,
  CheckCircle,
  XCircle,
  ThermometerSnowflake,
  Box,
  Layers,
  X,
  Save,
} from 'lucide-react';

interface StorageSection {
  Name: string;
  Type: 'ثلاجة مبردة' | 'مخزن جاف' | 'ثلاجة تجميد';
  Capacity: string;
  ItemsCount: number;
}

interface MedicalWarehouse {
  Id: number;
  Name: string;
  Code: string;
  Location: string;
  Type: 'رئيسي' | 'إقليمي / فرعي';
  Manager: string;
  ColdStorageCount: number;
  AmbientStorageCount: number;
  TotalStock: number;
  IsActive: boolean;
  Sections: StorageSection[];
}

const warehousesData: MedicalWarehouse[] = [
  {
    Id: 1,
    Name: 'المخزن الرئيسي المركز - طرابلس',
    Code: 'WH-001',
    Location: 'طرابلس - المقر الرئيسي الهيئة',
    Type: 'رئيسي',
    Manager: 'د. علي الفيتوري',
    ColdStorageCount: 8,
    AmbientStorageCount: 12,
    TotalStock: 14200,
    IsActive: true,
    Sections: [
      { Name: 'ثلاجة حفظ أكياس الدم #1 (4°C)', Type: 'ثلاجة مبردة', Capacity: '5,000 كيس', ItemsCount: 3400 },
      { Name: 'ثلاجة حفظ أكياس الدم #2 (4°C)', Type: 'ثلاجة مبردة', Capacity: '5,000 كيس', ItemsCount: 2800 },
      { Name: 'ثلاجة الكواشف والمحاليل #1 (2-8°C)', Type: 'ثلاجة مبردة', Capacity: '1,000 عبوة', ItemsCount: 450 },
      { Name: 'مخزن المستلزمات الطبية الجافة', Type: 'مخزن جاف', Capacity: '20,000 صندوق', ItemsCount: 7550 },
    ],
  },
  {
    Id: 2,
    Name: 'مخزن المركز الإقليمي - بنغازي',
    Code: 'WH-002',
    Location: 'بنغازي - شارع الهواري',
    Type: 'إقليمي / فرعي',
    Manager: 'أحمد محمد الصالح',
    ColdStorageCount: 4,
    AmbientStorageCount: 6,
    TotalStock: 5800,
    IsActive: true,
    Sections: [
      { Name: 'ثلاجة حفظ الدم بنغازي #1', Type: 'ثلاجة مبردة', Capacity: '3,000 كيس', ItemsCount: 1800 },
      { Name: 'ثلاجة تجميد البلازما (-20°C)', Type: 'ثلاجة تجميد', Capacity: '2,000 كيس', ItemsCount: 950 },
      { Name: 'مخزن الإبر والأجهزة', Type: 'مخزن جاف', Capacity: '10,000 صندوق', ItemsCount: 3050 },
    ],
  },
  {
    Id: 3,
    Name: 'مخزن المركز الإقليمي - مصراتة',
    Code: 'WH-003',
    Location: 'مصراتة - قرب المجمع الطبي',
    Type: 'إقليمي / فرعي',
    Manager: 'فاطمة علي الزروق',
    ColdStorageCount: 3,
    AmbientStorageCount: 5,
    TotalStock: 4200,
    IsActive: true,
    Sections: [
      { Name: 'ثلاجة الدم وكواشف مصراتة', Type: 'ثلاجة مبردة', Capacity: '2,500 كيس', ItemsCount: 1200 },
      { Name: 'مخزن المواد الجافة والوقاية', Type: 'مخزن جاف', Capacity: '8,000 صندوق', ItemsCount: 3000 },
    ],
  },
];

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<MedicalWarehouse[]>(warehousesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<MedicalWarehouse | null>(null);

  const [newWh, setNewWh] = useState({
    Name: '',
    Code: `WH-00${warehouses.length + 1}`,
    Location: '',
    Type: 'إقليمي / فرعي' as MedicalWarehouse['Type'],
    Manager: '',
    ColdStorageCount: '2',
    AmbientStorageCount: '3',
  });

  const handleCreateWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWh.Name) return;

    const wh: MedicalWarehouse = {
      Id: warehouses.length + 1,
      Name: newWh.Name,
      Code: newWh.Code,
      Location: newWh.Location || 'ليبيا',
      Type: newWh.Type,
      Manager: newWh.Manager || 'مسؤول مخزن',
      ColdStorageCount: parseInt(newWh.ColdStorageCount) || 2,
      AmbientStorageCount: parseInt(newWh.AmbientStorageCount) || 3,
      TotalStock: 0,
      IsActive: true,
      Sections: [
        { Name: 'ثلاجة حفظ أكياس الدم الرئيسي', Type: 'ثلاجة مبردة', Capacity: '2,000 كيس', ItemsCount: 0 },
        { Name: 'قسم المستلزمات الجافة', Type: 'مخزن جاف', Capacity: '5,000 وحدة', ItemsCount: 0 },
      ],
    };

    setWarehouses([...warehouses, wh]);
    setShowAddModal(false);
  };

  return (
    <>
      <Header title="أماكن والمخازن الطبية" subtitle="الرئيسية / إدارة المخازن وأماكن التخزين" />

      <div className="page-content">
        {/* رأس الصفحة */}
        <div className="page-header">
          <div>
            <h1 className="page-header-title">المخازن وأماكن التخزين التفصيلية</h1>
            <p className="page-header-subtitle">
              تحديد وحصر مواقع التخزين للمواد الطبية (ثلاجات تبريد أكياس الدم والكواشف / المخازن الجافة)
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            إضافة مخزن جديد
          </button>
        </div>

        {/* عرض بطاقات المخازن */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
          {warehouses.map((wh) => (
            <div
              key={wh.Id}
              className="card"
              style={{ cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}
              onClick={() => setSelectedWarehouse(wh)}
            >
              <div className="card-body">
                {/* رأس المخزن */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: wh.Type === 'رئيسي' ? '#fef2f2' : '#eff6ff',
                        color: wh.Type === 'رئيسي' ? '#ce1126' : '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Warehouse size={26} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>{wh.Name}</h3>
                      <span className="badge badge-default" style={{ marginTop: '4px' }}>{wh.Code}</span>
                    </div>
                  </div>
                  <span className={`badge ${wh.Type === 'رئيسي' ? 'badge-danger' : 'badge-primary'}`}>
                    {wh.Type}
                  </span>
                </div>

                {/* تفاصيل الموقع والمسؤول */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', fontSize: '0.88rem', color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} style={{ color: '#ce1126' }} />
                    <span>{wh.Location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={15} style={{ color: '#64748b' }} />
                    <span>المسؤول: <strong>{wh.Manager}</strong></span>
                  </div>
                </div>

                {/* وحدات التخزين والمخزون */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '12px', background: '#f8fafc', borderRadius: '10px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ThermometerSnowflake size={18} style={{ color: '#2563eb' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ثلاجات تبريد</div>
                      <div style={{ fontWeight: 800, color: '#1e293b' }}>{wh.ColdStorageCount} ثلاجة</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Box size={18} style={{ color: '#ea580c' }} />
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>مخازن جافة</div>
                      <div style={{ fontWeight: 800, color: '#1e293b' }}>{wh.AmbientStorageCount} مواقع</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748b' }}>إجمالي المخزون:</span>
                  <span style={{ fontWeight: 800, color: '#15803d', fontSize: '1rem' }}>
                    {wh.TotalStock.toLocaleString('ar-LY')} وحدة
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* نافذة إضافة مخزن جديد */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
              <div className="modal-header">
                <h3 className="modal-title">إضافة مخزن / موقع تخزين جديد</h3>
                <button className="modal-close" onClick={() => setShowAddModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateWarehouse}>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">اسم المخزن <span className="required">*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: مخزن المركز الإقليمي - طبرق"
                      required
                      value={newWh.Name}
                      onChange={(e) => setNewWh({ ...newWh, Name: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">رمز المخزن</label>
                      <input
                        type="text"
                        className="form-input"
                        value={newWh.Code}
                        onChange={(e) => setNewWh({ ...newWh, Code: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">النوع</label>
                      <select
                        className="form-select"
                        value={newWh.Type}
                        onChange={(e) => setNewWh({ ...newWh, Type: e.target.value as MedicalWarehouse['Type'] })}
                      >
                        <option value="رئيسي">رئيسي</option>
                        <option value="إقليمي / فرعي">إقليمي / فرعي</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">الموقع الجغرافي</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="مثال: طبرق - مجمع خدمات نقل الدم"
                      value={newWh.Location}
                      onChange={(e) => setNewWh({ ...newWh, Location: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">عدد ثلاجات التبريد</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newWh.ColdStorageCount}
                        onChange={(e) => setNewWh({ ...newWh, ColdStorageCount: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">عدد أقسام المخزن الجاف</label>
                      <input
                        type="number"
                        className="form-input"
                        value={newWh.AmbientStorageCount}
                        onChange={(e) => setNewWh({ ...newWh, AmbientStorageCount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">مسؤول المخزن</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="اسم مسؤول المخزن"
                      value={newWh.Manager}
                      onChange={(e) => setNewWh({ ...newWh, Manager: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    حفظ المخزن
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نافذة عرض الأقسام والثلاجات بالمخزن */}
        {selectedWarehouse && (
          <div className="modal-overlay" onClick={() => setSelectedWarehouse(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
              <div className="modal-header">
                <h3 className="modal-title">أماكن ومواقع التخزين التفصيلية - {selectedWarehouse.Name}</h3>
                <button className="modal-close" onClick={() => setSelectedWarehouse(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>
                  وحدات التبريد والمخازن التابعة للمركز:
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedWarehouse.Sections.map((sec, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {sec.Type.includes('ثلاجة') ? (
                          <ThermometerSnowflake size={22} style={{ color: '#2563eb' }} />
                        ) : (
                          <Box size={22} style={{ color: '#ea580c' }} />
                        )}
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{sec.Name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>السعة الاستيعابية: {sec.Capacity}</div>
                        </div>
                      </div>
                      <span className="badge badge-success">{sec.ItemsCount.toLocaleString('ar-LY')} صنف مخزن</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedWarehouse(null)}>
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
