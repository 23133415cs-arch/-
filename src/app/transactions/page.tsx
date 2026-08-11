// صفحة حركة المخزون - إذونات الاستلام والصرف وأوامر الشراء والتكليف
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  Plus,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  X,
  Save,
  Download,
  Building2,
  FileCheck2,
  UserCheck,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';

type TransactionType = 'inbound' | 'outbound' | 'transfer';
type TransactionStatus = 'approved' | 'pending' | 'rejected';

interface TransactionItem {
  ItemCode: string;
  ItemName: string;
  Qty: number;
  Unit: string;
  BatchNo: string;
  ExpiryDate: string;
}

interface MedicalTransaction {
  Id: number;
  Code: string; // رقم إذن الاستلام أو الصرف
  PoNumber?: string; // رقم أمر الشراء / التكليف
  Type: TransactionType;
  TypeLabel: 'إذن استلام' | 'إذن صرف' | 'تحويل مخزني';
  Date: string; // تاريخ الاستلام / الحركة
  Warehouse: string;
  BeneficiaryOrSupplier: string; // المورد أو الجهة المستفيدة
  CommitteeMember?: string; // رئيس / لجنة الاستلام
  ItemsCount: number;
  TotalQty: number;
  Notes: string;
  User: string;
  Status: TransactionStatus;
  ItemsDetails: TransactionItem[];
}

// بيانات الحركات التجريبية المطابقة لدورة العمل
const initialTransactions: MedicalTransaction[] = [
  {
    Id: 1,
    Code: 'REC-2026-0101',
    PoNumber: 'PO-2026-9041',
    Type: 'inbound',
    TypeLabel: 'إذن استلام',
    Date: '2026-07-20',
    Warehouse: 'المخزن الرئيسي - طرابلس',
    BeneficiaryOrSupplier: 'شركة Terumo BCT الدولية',
    CommitteeMember: 'د. علي الفيتوري (رئيس لجنة الاستلام)',
    ItemsCount: 2,
    TotalQty: 3000,
    Notes: 'استلام وجبة أكياس دم وفق أمر الشراء رقم PO-2026-9041 وتم المعاينة بواسطة لجنة الاستلام',
    User: 'أحمد محمد - أمين مخزن',
    Status: 'approved',
    ItemsDetails: [
      { ItemCode: 'ITM-001', ItemName: 'أكياس دم مفردة 450ml', Qty: 2000, Unit: 'كيس', BatchNo: 'BTH-2026-A1', ExpiryDate: '2028-06-30' },
      { ItemCode: 'ITM-002', ItemName: 'أكياس دم مزدوجة 450ml', Qty: 1000, Unit: 'كيس', BatchNo: 'BTH-2026-A2', ExpiryDate: '2028-06-30' },
    ],
  },
  {
    Id: 2,
    Code: 'ISS-2026-0205',
    Type: 'outbound',
    TypeLabel: 'إذن صرف',
    Date: '2026-07-28',
    Warehouse: 'المخزن الرئيسي - طرابلس',
    BeneficiaryOrSupplier: 'مستشفى طرابلس المركزي - قسم العناية',
    ItemsCount: 2,
    TotalQty: 400,
    Notes: 'إذن صرف عاجل لتزويد المستشفى بأكياس الدم والكواشف الطبية',
    User: 'أحمد محمد - أمين مخزن',
    Status: 'approved',
    ItemsDetails: [
      { ItemCode: 'ITM-001', ItemName: 'أكياس دم مفردة 450ml', Qty: 300, Unit: 'كيس', BatchNo: 'BTH-2026-A1', ExpiryDate: '2028-06-30' },
      { ItemCode: 'ITM-004', ItemName: 'كاشف فصيلة الدم Anti-A', Qty: 100, Unit: 'زجاجة', BatchNo: 'BTH-REG-99', ExpiryDate: '2027-01-15' },
    ],
  },
  {
    Id: 3,
    Code: 'REC-2026-0102',
    PoNumber: 'PO-2026-9088',
    Type: 'inbound',
    TypeLabel: 'إذن استلام',
    Date: '2026-08-01',
    Warehouse: 'مخزن بنغازي المركز الإقليمي',
    BeneficiaryOrSupplier: 'شركة Biotest Medical',
    CommitteeMember: 'لجنة استلام المواد المخبرية',
    ItemsCount: 1,
    TotalQty: 500,
    Notes: 'استلام كواشف ومحاليل مخبرية قيد التدقيق والمعاينة',
    User: 'فاطمة علي - أمين مخزن',
    Status: 'pending',
    ItemsDetails: [
      { ItemCode: 'ITM-006', ItemName: 'كاشف فصيلة الدم Anti-D (Rh)', Qty: 500, Unit: 'زجاجة', BatchNo: 'BTH-BIO-44', ExpiryDate: '2027-08-20' },
    ],
  },
  {
    Id: 4,
    Code: 'ISS-2026-0206',
    Type: 'outbound',
    TypeLabel: 'إذن صرف',
    Date: '2026-08-04',
    Warehouse: 'المخزن الرئيسي - طرابلس',
    BeneficiaryOrSupplier: 'مركز سبها الطبي - بنك الدم الفرعي',
    ItemsCount: 1,
    TotalQty: 200,
    Notes: 'إذن صرف تزويد بنك الدم بمدينة سبها',
    User: 'أحمد محمد - أمين مخزن',
    Status: 'approved',
    ItemsDetails: [
      { ItemCode: 'ITM-007', ItemName: 'إبر سحب دم معقمة 16G', Qty: 200, Unit: 'صندوق', BatchNo: 'BTH-BD-88', ExpiryDate: '2029-01-01' },
    ],
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<MedicalTransaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('الكل');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<MedicalTransaction | null>(null);

  // نموذج إضافة إذن جديد
  const [txType, setTxType] = useState<TransactionType>('inbound');
  const [newTx, setNewTx] = useState({
    Code: 'REC-2026-0105',
    PoNumber: 'PO-2026-9100',
    Warehouse: 'المخزن الرئيسي - طرابلس',
    BeneficiaryOrSupplier: '',
    CommitteeMember: 'لجنة الاستلام المعتمدة',
    Notes: '',
    ItemCode: 'ITM-001',
    ItemName: 'أكياس دم مفردة 450ml',
    Qty: '500',
    Unit: 'كيس',
    BatchNo: 'BTH-2026-X90',
    ExpiryDate: '2028-12-31',
  });

  // حفظ الحركة الجديدة
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.BeneficiaryOrSupplier) return;

    const qty = parseInt(newTx.Qty) || 100;
    const typeLabel = txType === 'inbound' ? 'إذن استلام' : txType === 'outbound' ? 'إذن صرف' : 'تحويل مخزني';
    const codePrefix = txType === 'inbound' ? 'REC-2026-010' : txType === 'outbound' ? 'ISS-2026-020' : 'TRF-2026-030';

    const createdTx: MedicalTransaction = {
      Id: transactions.length + 1,
      Code: `${codePrefix}${transactions.length + 1}`,
      PoNumber: txType === 'inbound' ? newTx.PoNumber : undefined,
      Type: txType,
      TypeLabel: typeLabel,
      Date: new Date().toISOString().split('T')[0],
      Warehouse: newTx.Warehouse,
      BeneficiaryOrSupplier: newTx.BeneficiaryOrSupplier,
      CommitteeMember: txType === 'inbound' ? newTx.CommitteeMember : undefined,
      ItemsCount: 1,
      TotalQty: qty,
      Notes: newTx.Notes || (txType === 'inbound' ? 'إذن استلام بنجاح' : 'إذن صرف بنجاح للجهة المستفيدة'),
      User: 'مدير النظام',
      Status: 'approved',
      ItemsDetails: [
        {
          ItemCode: newTx.ItemCode,
          ItemName: newTx.ItemName,
          Qty: qty,
          Unit: newTx.Unit,
          BatchNo: newTx.BatchNo,
          ExpiryDate: newTx.ExpiryDate,
        },
      ],
    };

    setTransactions([createdTx, ...transactions]);
    setShowAddModal(false);
  };

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.PoNumber && tx.PoNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tx.BeneficiaryOrSupplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.Warehouse.toLowerCase().includes(searchTerm.toLowerCase());

    const matchType =
      typeFilter === 'الكل' ||
      (typeFilter === 'إذن استلام' && tx.Type === 'inbound') ||
      (typeFilter === 'إذن صرف' && tx.Type === 'outbound') ||
      (typeFilter === 'تحويل' && tx.Type === 'transfer');

    return matchSearch && matchType;
  });

  const handleView = (tx: MedicalTransaction) => {
    setSelectedTx(tx);
    setShowViewModal(true);
  };

  return (
    <>
      <Header title="إذونات الاستلام والصرف" subtitle="الرئيسية / التوريد والصرف" />

      <div className="page-content">
        {/* رأس الصفحة */}
        <div className="page-header">
          <div>
            <h1 className="page-header-title">إذونات التوريد، الاستلام، والصرف</h1>
            <p className="page-header-subtitle">
              إنشاء ومتابعة إذونات الاستلام المرتبطة بأوامر التكليف، إذونات الصرف للجهات المستفيدة، واعتماد لجنة الاستلام
            </p>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => alert('تم تصدير سجل الإذونات بنجاح')}>
              <Download size={16} />
              تصدير السجل
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setTxType('inbound');
                setShowAddModal(true);
              }}
            >
              <Plus size={18} />
              إنشاء إذن استلام / صرف جديد
            </button>
          </div>
        </div>

        {/* بطاقات الإحصاء السريع */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowDownCircle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>إذونات الاستلام (الوارد)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16a34a' }}>
                {transactions.filter(t => t.Type === 'inbound').length} إذن
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpCircle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>إذونات الصرف (المنصرف)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>
                {transactions.filter(t => t.Type === 'outbound').length} إذن
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>أوامر شراء / تكليف نشطة</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb' }}>14 أمر</div>
            </div>
          </div>
        </div>

        {/* شريط الفلترة والجدول */}
        <div className="table-container">
          <div className="table-toolbar">
            <div className="table-toolbar-right" style={{ gap: '12px' }}>
              <div className="table-search" style={{ minWidth: '280px' }}>
                <Search className="table-search-icon" size={16} />
                <input
                  type="text"
                  placeholder="بحث برقم الإذن، أمر الشراء، أو الجهة المستفيدة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="form-select"
                style={{ width: '180px', padding: '9px 12px' }}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="الكل">جميع الإذونات</option>
                <option value="إذن استلام">إذونات الاستلام</option>
                <option value="إذن صرف">إذونات الصرف</option>
                <option value="تحويل">تحويلات المخازن</option>
              </select>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                عرض {filtered.length} من أصل {transactions.length} حركة
              </span>
            </div>
          </div>

          {/* جدول الإذونات */}
          <table className="data-table">
            <thead>
              <tr>
                <th>رقم الإذن</th>
                <th>أمر التكليف/الشراء</th>
                <th>نوع الحركة</th>
                <th>المورد / الجهة المستفيدة</th>
                <th>المخزن</th>
                <th>التاريخ</th>
                <th>عدد الأصناف</th>
                <th>الحالة والتوقيع</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.Id}>
                  <td>
                    <span className="badge badge-default" style={{ fontWeight: 700 }}>{tx.Code}</span>
                  </td>
                  <td>
                    {tx.PoNumber ? (
                      <span className="badge badge-info" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                        {tx.PoNumber}
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>-</span>
                    )}
                  </td>
                  <td>
                    {tx.Type === 'inbound' ? (
                      <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowDownCircle size={14} /> إذن استلام
                      </span>
                    ) : tx.Type === 'outbound' ? (
                      <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowUpCircle size={14} /> إذن صرف
                      </span>
                    ) : (
                      <span className="badge badge-info">تحويل</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={14} style={{ color: '#64748b' }} />
                      {tx.BeneficiaryOrSupplier}
                    </span>
                  </td>
                  <td style={{ color: '#475569', fontSize: '0.88rem' }}>{tx.Warehouse}</td>
                  <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{tx.Date}</td>
                  <td style={{ fontWeight: 700 }}>{tx.TotalQty} قطعة ({tx.ItemsCount} صنف)</td>
                  <td>
                    {tx.Status === 'approved' ? (
                      <span className="badge badge-success">معتمد ومسجل</span>
                    ) : (
                      <span className="badge badge-warning">قيد المعاينة</span>
                    )}
                  </td>
                  <td>
                    <button className="btn-icon" title="عرض تفاصيل الإذن" onClick={() => handleView(tx)}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* نافذة إضافة إذن استلام أو إذن صرف */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
              <div className="modal-header">
                <h3 className="modal-title">
                  {txType === 'inbound' ? 'إنشاء إذن استلام جديد (توريد)' : 'إنشاء إذن صرف جديد'}
                </h3>
                <button className="modal-close" onClick={() => setShowAddModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveTransaction}>
                <div className="modal-body">
                  {/* اختيار نوع الإذن */}
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                    <button
                      type="button"
                      className={`btn ${txType === 'inbound' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                      onClick={() => setTxType('inbound')}
                    >
                      <ArrowDownCircle size={16} />
                      إذن استلام (توريد من مورد)
                    </button>
                    <button
                      type="button"
                      className={`btn ${txType === 'outbound' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1 }}
                      onClick={() => setTxType('outbound')}
                    >
                      <ArrowUpCircle size={16} />
                      إذن صرف (لجهة مستفيدة)
                    </button>
                  </div>

                  {txType === 'inbound' && (
                    <div className="form-group">
                      <label className="form-label">رقم أمر الشراء / امر التكليف <span className="required">*</span></label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="مثال: PO-2026-9041"
                        required
                        value={newTx.PoNumber}
                        onChange={(e) => setNewTx({ ...newTx, PoNumber: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">
                      {txType === 'inbound' ? 'اسم المورد / الشركة الموردة' : 'الجهة المستفيدة (مستشفى / فرع / قسم)'}{' '}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder={txType === 'inbound' ? 'مثال: شركة Terumo BCT' : 'مثال: مستشفى طرابلس المركزي - قسم العمليات'}
                      required
                      value={newTx.BeneficiaryOrSupplier}
                      onChange={(e) => setNewTx({ ...newTx, BeneficiaryOrSupplier: e.target.value })}
                    />
                  </div>

                  {txType === 'inbound' && (
                    <div className="form-group">
                      <label className="form-label">لجنة الاستلام المعتمدة</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="اسم رئيس وأعضاء لجنة الاستلام"
                        value={newTx.CommitteeMember}
                        onChange={(e) => setNewTx({ ...newTx, CommitteeMember: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">الصنف المطلوب</label>
                      <select
                        className="form-select"
                        value={newTx.ItemName}
                        onChange={(e) => setNewTx({ ...newTx, ItemName: e.target.value })}
                      >
                        <option value="أكياس دم مفردة 450ml">أكياس دم مفردة 450ml</option>
                        <option value="أكياس دم مزدوجة 450ml">أكياس دم مزدوجة 450ml</option>
                        <option value="كاشف فصيلة الدم Anti-A">كاشف فصيلة الدم Anti-A</option>
                        <option value="إبر سحب دم معقمة 16G">إبر سحب دم معقمة 16G</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">الكمية <span className="required">*</span></label>
                      <input
                        type="number"
                        className="form-input"
                        required
                        value={newTx.Qty}
                        onChange={(e) => setNewTx({ ...newTx, Qty: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">رقم التشغيلة / الوجبة (Batch No)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="مثال: BTH-2026-99"
                        value={newTx.BatchNo}
                        onChange={(e) => setNewTx({ ...newTx, BatchNo: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">تاريخ الصلاحية</label>
                      <input
                        type="date"
                        className="form-input"
                        value={newTx.ExpiryDate}
                        onChange={(e) => setNewTx({ ...newTx, ExpiryDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">ملاحظات الإذن</label>
                    <textarea
                      className="form-input"
                      rows={2}
                      placeholder="أي ملاحظات تفصيلية للإذن..."
                      value={newTx.Notes}
                      onChange={(e) => setNewTx({ ...newTx, Notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} />
                    حفظ وإصدار الإذن
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نافذة معاينة تفاصيل الإذن */}
        {showViewModal && selectedTx && (
          <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
              <div className="modal-header">
                <h3 className="modal-title">
                  تفاصيل {selectedTx.TypeLabel} ({selectedTx.Code})
                </h3>
                <button className="modal-close" onClick={() => setShowViewModal(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedTx.PoNumber && (
                  <div style={{ background: '#eff6ff', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: '#1d4ed8' }}>مرتبط بأمر الشراء / التكليف:</span>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#1e40af' }}>{selectedTx.PoNumber}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>الجهة / المورد:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedTx.BeneficiaryOrSupplier}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>المخزن:</span>
                    <div style={{ fontWeight: 700 }}>{selectedTx.Warehouse}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>تاريخ الإذن:</span>
                    <div style={{ fontWeight: 700 }}>{selectedTx.Date}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>المستخدم المسؤول:</span>
                    <div style={{ fontWeight: 700 }}>{selectedTx.User}</div>
                  </div>
                </div>

                {selectedTx.CommitteeMember && (
                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRight: '4px solid #ce1126', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'block' }}>اعتماد لجنة الاستلام:</span>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{selectedTx.CommitteeMember}</span>
                  </div>
                )}

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>جدول الأصناف المتضمنة بالإذن:</h4>
                  <table className="data-table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th>رمز الصنف</th>
                        <th>اسم الصنف</th>
                        <th>الكمية</th>
                        <th>رقم التشغيلة</th>
                        <th>تاريخ الصلاحية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTx.ItemsDetails.map((itm, idx) => (
                        <tr key={idx}>
                          <td>{itm.ItemCode}</td>
                          <td style={{ fontWeight: 700 }}>{itm.ItemName}</td>
                          <td style={{ fontWeight: 800, color: '#ce1126' }}>{itm.Qty} {itm.Unit}</td>
                          <td><span className="badge badge-default">{itm.BatchNo}</span></td>
                          <td>{itm.ExpiryDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
