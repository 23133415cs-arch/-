// صفحة تقارير المخازن الطبية الشاملة
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  FileText,
  Download,
  Printer,
  Search,
  Filter,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Building2,
  PackageCheck,
  History,
  CheckCircle,
  XCircle,
  Clock,
  ThermometerSnowflake,
} from 'lucide-react';

type ReportTab =
  | 'current_stock'
  | 'inbound_outbound'
  | 'reorder_level'
  | 'expiry_status'
  | 'item_ledger';

// 1. بيانات تقرير المخزون الحالي
const currentStockData = [
  { Code: 'ITM-001', Name: 'أكياس دم مفردة 450ml', Manufacturer: 'Terumo BCT', Category: 'أكياس الدم', StorageCondition: 'ثلاجة', Location: 'ثلاجة 1 - الرف A', Stock: 2300, Unit: 'كيس', Price: 15.50 },
  { Code: 'ITM-002', Name: 'أكياس دم مزدوجة 450ml', Manufacturer: 'Fresenius Kabi', Category: 'أكياس الدم', StorageCondition: 'ثلاجة', Location: 'ثلاجة 2 - الرف B', Stock: 1100, Unit: 'كيس', Price: 22.00 },
  { Code: 'ITM-003', Name: 'أكياس دم ثلاثية 450ml', Manufacturer: 'Fresenius Kabi', Category: 'أكياس الدم', StorageCondition: 'ثلاجة', Location: 'ثلاجة 2 - الرف C', Stock: 400, Unit: 'كيس', Price: 28.50 },
  { Code: 'ITM-004', Name: 'كاشف فصيلة الدم Anti-A', Manufacturer: 'Biotest Medical', Category: 'الكواشف والمحاليل', StorageCondition: 'ثلاجة', Location: 'ثلاجة الكواشف #1', Stock: 185, Unit: 'زجاجة', Price: 45.00 },
  { Code: 'ITM-006', Name: 'كاشف فصيلة الدم Anti-D (Rh)', Manufacturer: 'Merck Healthcare', Category: 'الكواشف والمحاليل', StorageCondition: 'ثلاجة', Location: 'ثلاجة الكواشف #2', Stock: 90, Unit: 'زجاجة', Price: 48.00 },
  { Code: 'ITM-007', Name: 'إبر سحب دم معقمة 16G', Manufacturer: 'Becton Dickinson', Category: 'المستلزمات الطبية', StorageCondition: 'خارج الثلاجة', Location: 'الممر 3 - الرف C', Stock: 4800, Unit: 'صندوق', Price: 8.50 },
];

// 2. بيانات تقرير الوارد والمنصرف
const movementData = [
  { Code: 'REC-2026-0101', Type: 'وارد (إذن استلام)', Date: '2026-07-20', Entity: 'شركة Terumo BCT الدولية', PoNo: 'PO-2026-9041', ItemsCount: 2, TotalQty: 3000, Status: 'معتمد' },
  { Code: 'ISS-2026-0205', Type: 'منصرف (إذن صرف)', Date: '2026-07-28', Entity: 'مستشفى طرابلس المركزي', PoNo: '-', ItemsCount: 2, TotalQty: 400, Status: 'معتمد' },
  { Code: 'REC-2026-0102', Type: 'وارد (إذن استلام)', Date: '2026-08-01', Entity: 'شركة Biotest Medical', PoNo: 'PO-2026-9088', ItemsCount: 1, TotalQty: 500, Status: 'معلق' },
  { Code: 'ISS-2026-0206', Type: 'منصرف (إذن صرف)', Date: '2026-08-04', Entity: 'مركز سبها الطبي', PoNo: '-', ItemsCount: 1, TotalQty: 200, Status: 'معتمد' },
];

// 3. بيانات الأصناف المسجلة بنقطة إعادة الطلب
const reorderData = [
  { Code: 'ITM-003', Name: 'أكياس دم ثلاثية 450ml', Stock: 400, ReorderLevel: 500, Deficit: 100, Unit: 'كيس', ActionNeeded: 'إصدار أمر تكليف تزويد عاجل' },
  { Code: 'ITM-006', Name: 'كاشف فصيلة الدم Anti-D (Rh)', Stock: 90, ReorderLevel: 150, Deficit: 60, Unit: 'زجاجة', ActionNeeded: 'إصدار أمر شراء كواشف' },
];

// 4. بيانات الأصناف القريبة أو منتهية الصلاحية
const expiryData = [
  { Code: 'ITM-004', Name: 'كاشف فصيلة Anti-A', BatchNo: 'BTH-REG-99', Stock: 45, ExpiryDate: '2026-08-30', DaysRemaining: 19, Status: 'قريب الانتهاء (حرج)' },
  { Code: 'ITM-005', Name: 'كاشف فصيلة Anti-B', BatchNo: 'BTH-REG-88', Stock: 30, ExpiryDate: '2026-09-15', DaysRemaining: 35, Status: 'قريب الانتهاء' },
  { Code: 'ITM-010', Name: 'محلول ملحي Saline 0.9%', BatchNo: 'BTH-BAX-12', Stock: 100, ExpiryDate: '2026-06-01', DaysRemaining: -71, Status: 'منتهي الصلاحية' },
];

// 5. بيانات سجل حركة الصنف التفصيلي
const itemLedgerData = [
  { Date: '2026-07-01', VoucherNo: 'REC-2026-0080', Type: 'وارد (استلام)', Entity: 'شركة Terumo BCT', QtyIn: 3000, QtyOut: 0, Balance: 3000, Notes: 'استلام وجبة توريد سنوية' },
  { Date: '2026-07-10', VoucherNo: 'ISS-2026-0150', Type: 'منصرف (صرف)', Entity: 'مستشفى الخمس التعليمي', QtyIn: 0, QtyOut: 400, Balance: 2600, Notes: 'إذن صرف تزويد عاجل' },
  { Date: '2026-07-28', VoucherNo: 'ISS-2026-0205', Type: 'منصرف (صرف)', Entity: 'مستشفى طرابلس المركزي', QtyIn: 0, QtyOut: 300, Balance: 2300, Notes: 'إذن صرف أكياس دم مفردة' },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('current_stock');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLedgerItem, setSelectedLedgerItem] = useState('ITM-001 - أكياس دم مفردة 450ml');

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header title="التقارير الطبية والمخزنية" subtitle="الرئيسية / التقارير والسجلات" />

      <div className="page-content">
        {/* رأس الصفحة */}
        <div className="page-header">
          <div>
            <h1 className="page-header-title">تقارير ومؤشرات المخزون الطبي</h1>
            <p className="page-header-subtitle">
              إصدار التقارير التجميعية والتفصيلية الواردة بالمتطلبات (المخزون، الوارد والمنصرف، نقطة التكليف، الصلاحية، وسجل الصنف)
            </p>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
              <Printer size={16} />
              طباعة التقرير
            </button>
            <button className="btn btn-primary" onClick={() => alert('تم تصدير التقرير الحالي بصيغة Excel/PDF بنجاح')}>
              <Download size={18} />
              تصدير التقرير
            </button>
          </div>
        </div>

        {/* تبويبات التقارير الخمسة الأساسية */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '4px' }}>
          <button
            className={`btn ${activeTab === 'current_stock' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('current_stock')}
          >
            <PackageCheck size={16} />
            1. تقرير المخزون الحالي
          </button>

          <button
            className={`btn ${activeTab === 'inbound_outbound' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('inbound_outbound')}
          >
            <ArrowDownCircle size={16} />
            2. تقرير الوارد والمنصرف
          </button>

          <button
            className={`btn ${activeTab === 'reorder_level' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('reorder_level')}
          >
            <AlertTriangle size={16} />
            3. تقرير نقطة إعادة الطلب
          </button>

          <button
            className={`btn ${activeTab === 'expiry_status' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('expiry_status')}
          >
            <Calendar size={16} />
            4. تقرير منتهي / قريب الانتهاء
          </button>

          <button
            className={`btn ${activeTab === 'item_ledger' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('item_ledger')}
          >
            <History size={16} />
            5. سجل حركة كل صنف
          </button>
        </div>

        {/* 1. تقرير المخزون الحالي */}
        {activeTab === 'current_stock' && (
          <div className="table-container">
            <div className="table-toolbar">
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                تقرير المخزون الحالي الإجمالي بجميع الفروع والمخازن
              </div>
              <div className="table-search" style={{ minWidth: '260px' }}>
                <Search className="table-search-icon" size={16} />
                <input
                  type="text"
                  placeholder="بحث باسم الصنف أو الشركة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>رمز الصنف</th>
                  <th>اسم الصنف</th>
                  <th>الشركة المصنعة</th>
                  <th>التصنيف</th>
                  <th>مكان التخزين</th>
                  <th>الرصيد الحقيقي</th>
                  <th>الوحدة</th>
                  <th>سعر الوحدة</th>
                  <th>القيمة الإجمالية</th>
                </tr>
              </thead>
              <tbody>
                {currentStockData
                  .filter(i => i.Name.includes(searchTerm) || i.Manufacturer.includes(searchTerm))
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td><span className="badge badge-default">{item.Code}</span></td>
                      <td style={{ fontWeight: 700, color: '#0f172a' }}>{item.Name}</td>
                      <td>{item.Manufacturer}</td>
                      <td><span className="badge badge-info">{item.Category}</span></td>
                      <td>
                        {item.StorageCondition === 'ثلاجة' ? (
                          <span className="badge badge-primary" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                            <ThermometerSnowflake size={12} style={{ marginLeft: '4px' }} />
                            ثلاجة ({item.Location})
                          </span>
                        ) : (
                          <span className="badge badge-default">خارج الثلاجة</span>
                        )}
                      </td>
                      <td style={{ fontWeight: 800, color: '#15803d', fontSize: '1rem' }}>
                        {item.Stock.toLocaleString('ar-LY')}
                      </td>
                      <td>{item.Unit}</td>
                      <td>{item.Price.toFixed(2)} د.ل</td>
                      <td style={{ fontWeight: 700 }}>{(item.Stock * item.Price).toLocaleString('ar-LY')} د.ل</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. تقرير الوارد والمنصرف */}
        {activeTab === 'inbound_outbound' && (
          <div className="table-container">
            <div className="table-toolbar">
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                تقرير إجمالي حركات الوارد (التوريد) والمنصرف (الجهة المستفيدة)
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>رقم الإذن</th>
                  <th>نوع الحركة</th>
                  <th>تاريخ الإذن</th>
                  <th>المورد / الجهة المستفيدة</th>
                  <th>رقم أمر الشراء/التكليف</th>
                  <th>عدد الأصناف</th>
                  <th>إجمالي الكمية</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {movementData.map((m, idx) => (
                  <tr key={idx}>
                    <td><span className="badge badge-default">{m.Code}</span></td>
                    <td>
                      {m.Type.includes('وارد') ? (
                        <span className="badge badge-success" style={{ display: 'inline-flex', gap: '4px' }}>
                          <ArrowDownCircle size={14} /> {m.Type}
                        </span>
                      ) : (
                        <span className="badge badge-danger" style={{ display: 'inline-flex', gap: '4px' }}>
                          <ArrowUpCircle size={14} /> {m.Type}
                        </span>
                      )}
                    </td>
                    <td>{m.Date}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{m.Entity}</td>
                    <td>{m.PoNo}</td>
                    <td>{m.ItemsCount} أصناف</td>
                    <td style={{ fontWeight: 800, color: '#ce1126' }}>{m.TotalQty.toLocaleString('ar-LY')} قطعة</td>
                    <td><span className="badge badge-success">{m.Status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. تقرير نقطة إعادة الطلب */}
        {activeTab === 'reorder_level' && (
          <div className="table-container">
            <div className="table-toolbar" style={{ background: '#fff7ed' }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#c2410c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={20} />
                تقرير الأصناف التي وصلت لنقطة إعادة الطلب (تنبيه التوريد)
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>رمز الصنف</th>
                  <th>اسم الصنف</th>
                  <th>الرصيد الحالي</th>
                  <th>نقطة إعادة الطلب</th>
                  <th>الكمية المطلوبة لتغطية النقص</th>
                  <th>الإجراء التوصية</th>
                </tr>
              </thead>
              <tbody>
                {reorderData.map((r, idx) => (
                  <tr key={idx}>
                    <td><span className="badge badge-default">{r.Code}</span></td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{r.Name}</td>
                    <td style={{ fontWeight: 800, color: '#dc2626' }}>{r.Stock} {r.Unit}</td>
                    <td style={{ fontWeight: 700 }}>{r.ReorderLevel} {r.Unit}</td>
                    <td style={{ fontWeight: 800, color: '#c2410c' }}>{r.Deficit} {r.Unit}</td>
                    <td>
                      <span className="badge badge-warning" style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #ffedd5' }}>
                        {r.ActionNeeded}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. تقرير الأصناف منتهية أو قريبة الانتهاء */}
        {activeTab === 'expiry_status' && (
          <div className="table-container">
            <div className="table-toolbar" style={{ background: '#fef2f2' }}>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} />
                تقرير متابعة تواريخ الصلاحية والتشغيلات الحرجة
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>رمز الصنف</th>
                  <th>اسم الصنف</th>
                  <th>رقم التشغيلة (Batch No)</th>
                  <th>الكمية المتأثرة</th>
                  <th>تاريخ الصلاحية</th>
                  <th>الأيام المتبقية</th>
                  <th>حالة الصلاحية</th>
                </tr>
              </thead>
              <tbody>
                {expiryData.map((ex, idx) => (
                  <tr key={idx}>
                    <td><span className="badge badge-default">{ex.Code}</span></td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{ex.Name}</td>
                    <td><span className="badge badge-info">{ex.BatchNo}</span></td>
                    <td style={{ fontWeight: 700 }}>{ex.Stock} قطعة</td>
                    <td style={{ fontWeight: 700, color: ex.DaysRemaining <= 0 ? '#dc2626' : '#c2410c' }}>{ex.ExpiryDate}</td>
                    <td style={{ fontWeight: 800 }}>
                      {ex.DaysRemaining > 0 ? `${ex.DaysRemaining} يوم` : `منتهي منذ ${Math.abs(ex.DaysRemaining)} يوم`}
                    </td>
                    <td>
                      {ex.DaysRemaining <= 0 ? (
                        <span className="badge badge-danger">منتهي الصلاحية (سحب فوراً)</span>
                      ) : (
                        <span className="badge badge-warning">قريب الانتهاء</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. سجل حركة كل صنف (بطاقة الصنف) */}
        {activeTab === 'item_ledger' && (
          <div className="table-container">
            <div className="table-toolbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>اختر الصنف لعرض كارت الحركة:</span>
                <select
                  className="form-select"
                  style={{ minWidth: '320px', fontWeight: 700 }}
                  value={selectedLedgerItem}
                  onChange={(e) => setSelectedLedgerItem(e.target.value)}
                >
                  <option value="ITM-001 - أكياس دم مفردة 450ml">ITM-001 - أكياس دم مفردة 450ml</option>
                  <option value="ITM-004 - كاشف فصيلة الدم Anti-A">ITM-004 - كاشف فصيلة الدم Anti-A</option>
                  <option value="ITM-007 - إبر سحب دم معقمة 16G">ITM-007 - إبر سحب دم معقمة 16G</option>
                </select>
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ce1126' }}>
                بطاقة سجل الحركة التفصيلية: {selectedLedgerItem}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                تسجيل حركة الوارد والمنصرف والرصيد التراكمي للحسابات والمراجعة
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>تاريخ الحركة</th>
                  <th>رقم الإذن / الحركة</th>
                  <th>نوع الحركة</th>
                  <th>الجهة الموردة / المستفيدة</th>
                  <th>الكمية الواردة (+)</th>
                  <th>الكمية المنصرفة (-)</th>
                  <th>الرصيد المتبقي</th>
                  <th>ملاحظات الحركة</th>
                </tr>
              </thead>
              <tbody>
                {itemLedgerData.map((l, idx) => (
                  <tr key={idx}>
                    <td>{l.Date}</td>
                    <td><span className="badge badge-default">{l.VoucherNo}</span></td>
                    <td>
                      {l.QtyIn > 0 ? (
                        <span className="badge badge-success">{l.Type}</span>
                      ) : (
                        <span className="badge badge-danger">{l.Type}</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{l.Entity}</td>
                    <td style={{ fontWeight: 800, color: l.QtyIn > 0 ? '#15803d' : '#94a3b8' }}>
                      {l.QtyIn > 0 ? `+${l.QtyIn}` : '-'}
                    </td>
                    <td style={{ fontWeight: 800, color: l.QtyOut > 0 ? '#dc2626' : '#94a3b8' }}>
                      {l.QtyOut > 0 ? `-${l.QtyOut}` : '-'}
                    </td>
                    <td style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>
                      {l.Balance.toLocaleString('ar-LY')}
                    </td>
                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{l.Notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
