// صفحة لوحة التحكم الرئيسية
// منظومة إدارة مخازن الهيئة العامة لخدمات نقل الدم
'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  Package,
  Warehouse,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowLeftRight,
  DollarSign,
  Activity,
  ShieldAlert,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// بيانات تجريبية للإحصائيات
const statsData = {
  totalItems: 12,
  totalStock: 15_478,
  totalValue: 285_750.50,
  lowStockItems: 3,
  expiringItems: 5,
  pendingTransactions: 1,
};

// بيانات الرسم البياني - حركة المخزون الشهرية
const chartData = [
  { month: 'يناير', إدخال: 2400, صرف: 1800 },
  { month: 'فبراير', إدخال: 1800, صرف: 2200 },
  { month: 'مارس', إدخال: 3200, صرف: 2800 },
  { month: 'أبريل', إدخال: 2800, صرف: 1900 },
  { month: 'مايو', إدخال: 2000, صرف: 2400 },
  { month: 'يونيو', إدخال: 3500, صرف: 2100 },
  { month: 'يوليو', إدخال: 2900, صرف: 2600 },
  { month: 'أغسطس', إدخال: 1500, صرف: 800 },
];

// بيانات تنبيهات الصلاحية
const expiryAlerts = [
  { id: 1, name: 'كاشف Anti-B', batch: 'BTH-2025-OLD', warehouse: 'المخزن الرئيسي', date: '2026-09-01', qty: 15, status: 'critical' },
  { id: 2, name: 'محلول ملحي 0.9%', batch: 'BTH-2025-OLD', warehouse: 'مخزن بنغازي', date: '2026-08-30', qty: 50, status: 'critical' },
  { id: 3, name: 'كاشف Anti-A', batch: 'BTH-2025-OLD', warehouse: 'المخزن الرئيسي', date: '2026-09-15', qty: 25, status: 'critical' },
  { id: 4, name: 'كاشف Anti-A', batch: 'BTH-2026-004', warehouse: 'المخزن الرئيسي', date: '2026-12-31', qty: 120, status: 'warning' },
  { id: 5, name: 'كاشف Anti-B', batch: 'BTH-2026-005', warehouse: 'المخزن الرئيسي', date: '2026-12-31', qty: 115, status: 'warning' },
];

// بيانات النشاط الأخير
const recentActivity = [
  { id: 1, type: 'inbound', title: 'توريد أكياس دم', desc: 'TRX-2026-0001 - المخزن الرئيسي', user: 'أحمد محمد', time: '2026-07-15', status: 'approved' },
  { id: 2, type: 'outbound', title: 'صرف مستلزمات', desc: 'TRX-2026-0002 - لمركز بنغازي', user: 'أحمد محمد', time: '2026-07-20', status: 'approved' },
  { id: 3, type: 'inbound', title: 'توريد كواشف ومحاليل', desc: 'TRX-2026-0003 - المخزن الرئيسي', user: 'أحمد محمد', time: '2026-07-25', status: 'approved' },
  { id: 4, type: 'transfer', title: 'تحويل إلى مصراتة', desc: 'TRX-2026-0004 - من المخزن الرئيسي', user: 'أحمد محمد', time: '2026-08-01', status: 'approved' },
  { id: 5, type: 'outbound', title: 'طلب صرف إبر', desc: 'TRX-2026-0005 - المخزن الرئيسي', user: 'أحمد محمد', time: '2026-08-03', status: 'pending' },
];

// أصناف تحت الحد الأدنى
const lowStockItems = [
  { id: 1, name: 'كاشف Anti-D', code: 'ITM-006', stock: 90, min: 100, warehouse: 'المخزن الرئيسي' },
  { id: 2, name: 'كاشف Anti-A', code: 'ITM-004', stock: 40, min: 50, warehouse: 'مخزن بنغازي' },
  { id: 3, name: 'أنابيب EDTA', code: 'ITM-009', stock: 45, min: 50, warehouse: 'المخزن الرئيسي' },
];

export default function DashboardPage() {
  return (
    <>
      {/* الشريط العلوي */}
      <Header title="لوحة التحكم" subtitle="نظرة عامة على المخازن" />

      <div className="page-content">
        {/* بطاقات الإحصائيات */}
        <div className="stats-grid">
          {/* إجمالي الأصناف */}
          <div className="stat-card primary">
            <div className="stat-icon primary">
              <Package size={26} />
            </div>
            <div className="stat-content">
              <div className="stat-label">إجمالي الأصناف</div>
              <div className="stat-value">{statsData.totalItems}</div>
              <div className="stat-change up">
                <TrendingUp size={14} />
                <span>صنف مسجل في المنظومة</span>
              </div>
            </div>
          </div>

          {/* إجمالي المخزون */}
          <div className="stat-card success">
            <div className="stat-icon success">
              <Warehouse size={26} />
            </div>
            <div className="stat-content">
              <div className="stat-label">إجمالي المخزون</div>
              <div className="stat-value">{statsData.totalStock.toLocaleString('ar-LY')}</div>
              <div className="stat-change up">
                <TrendingUp size={14} />
                <span>وحدة في جميع المخازن</span>
              </div>
            </div>
          </div>

          {/* قيمة المخزون */}
          <div className="stat-card info">
            <div className="stat-icon info">
              <DollarSign size={26} />
            </div>
            <div className="stat-content">
              <div className="stat-label">قيمة المخزون</div>
              <div className="stat-value" style={{ fontSize: '1.4rem' }}>
                {statsData.totalValue.toLocaleString('ar-LY', { minimumFractionDigits: 2 })}
              </div>
              <div className="stat-change up">
                <span>دينار ليبي</span>
              </div>
            </div>
          </div>

          {/* أصناف تحت الحد الأدنى */}
          <div className="stat-card warning">
            <div className="stat-icon warning">
              <AlertTriangle size={26} />
            </div>
            <div className="stat-content">
              <div className="stat-label">أصناف تحت الحد الأدنى</div>
              <div className="stat-value">{statsData.lowStockItems}</div>
              <div className="stat-change down">
                <TrendingDown size={14} />
                <span>تحتاج إعادة طلب</span>
              </div>
            </div>
          </div>

          {/* أصناف قريبة من انتهاء الصلاحية */}
          <div className="stat-card danger">
            <div className="stat-icon danger">
              <ShieldAlert size={26} />
            </div>
            <div className="stat-content">
              <div className="stat-label">تنبيهات الصلاحية</div>
              <div className="stat-value">{statsData.expiringItems}</div>
              <div className="stat-change down">
                <TrendingDown size={14} />
                <span>صنف قريب من الانتهاء</span>
              </div>
            </div>
          </div>

          {/* حركات معلقة */}
          <div className="stat-card primary">
            <div className="stat-icon primary">
              <Clock size={26} />
            </div>
            <div className="stat-content">
              <div className="stat-label">حركات معلقة</div>
              <div className="stat-value">{statsData.pendingTransactions}</div>
              <div className="stat-change">
                <Activity size={14} />
                <span>بانتظار الاعتماد</span>
              </div>
            </div>
          </div>
        </div>

        {/* الرسم البياني وتنبيهات الصلاحية */}
        <div className="dashboard-grid">
          {/* الرسم البياني */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📊 حركة المخزون الشهرية</h3>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fontFamily: 'Cairo' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fontFamily: 'Cairo' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip
                      contentStyle={{
                        fontFamily: 'Cairo',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontFamily: 'Cairo', fontSize: '13px' }}
                    />
                    <Bar dataKey="إدخال" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="صرف" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* تنبيهات الصلاحية */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚠️ تنبيهات انتهاء الصلاحية</h3>
              <span className="badge badge-danger">{expiryAlerts.length} تنبيه</span>
            </div>
            <div className="card-body" style={{ padding: '16px 24px' }}>
              <ul className="expiry-list">
                {expiryAlerts.map((item) => (
                  <li key={item.id} className="expiry-item">
                    <span className={`expiry-indicator ${item.status}`}></span>
                    <div className="expiry-info">
                      <div className="expiry-name">{item.name}</div>
                      <div className="expiry-details">
                        {item.warehouse} • الكمية: {item.qty} • الدفعة: {item.batch}
                      </div>
                    </div>
                    <span className={`expiry-date ${item.status}`}>
                      <Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
                      {item.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* النشاط الأخير وأصناف تحت الحد */}
        <div className="dashboard-grid">
          {/* النشاط الأخير */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🕐 آخر الحركات</h3>
              <a href="/transactions" className="btn btn-ghost btn-sm">عرض الكل</a>
            </div>
            <div className="card-body" style={{ padding: '8px 24px' }}>
              <ul className="activity-list">
                {recentActivity.map((item) => (
                  <li key={item.id} className="activity-item">
                    <div className={`activity-icon ${item.type}`}>
                      {item.type === 'inbound' && <ArrowDownCircle size={20} />}
                      {item.type === 'outbound' && <ArrowUpCircle size={20} />}
                      {item.type === 'transfer' && <ArrowLeftRight size={20} />}
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">
                        {item.title}
                        <span
                          className={`badge ${
                            item.status === 'approved' ? 'badge-success' : 'badge-warning'
                          }`}
                          style={{ marginRight: '8px' }}
                        >
                          {item.status === 'approved' ? 'معتمد' : 'معلق'}
                        </span>
                      </div>
                      <div className="activity-desc">{item.desc}</div>
                    </div>
                    <span className="activity-time">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* أصناف تحت الحد الأدنى */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📦 أصناف تحت الحد الأدنى</h3>
              <span className="badge badge-warning">{lowStockItems.length} صنف</span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الصنف</th>
                    <th>الرمز</th>
                    <th>الرصيد</th>
                    <th>الحد الأدنى</th>
                    <th>المخزن</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((item) => {
                    const percentage = Math.round((item.stock / item.min) * 100);
                    return (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 600 }}>{item.name}</td>
                        <td>
                          <span className="badge badge-default">{item.code}</span>
                        </td>
                        <td style={{ fontWeight: 700, color: 'var(--danger-600)' }}>{item.stock}</td>
                        <td>{item.min}</td>
                        <td style={{ fontSize: '0.82rem' }}>{item.warehouse}</td>
                        <td>
                          <div style={{
                            width: '100%',
                            height: '6px',
                            background: 'var(--bg-tertiary)',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              width: `${Math.min(percentage, 100)}%`,
                              height: '100%',
                              background: percentage < 70 ? 'var(--danger-500)' : 'var(--warning-500)',
                              borderRadius: '3px',
                              transition: 'width 0.5s ease',
                            }}></div>
                          </div>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{percentage}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
