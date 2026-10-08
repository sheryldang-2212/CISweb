import { useState } from 'react';
import { ClipboardList, Clock, BriefcaseMedical, CheckCircle2, Stethoscope, AlertCircle, Calendar, Users as UsersIcon, ShieldCheck, Package, History, UserPlus, Settings, Lock, Key, ChevronRight, FlaskConical, Building2, Server, MoreHorizontal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LabelList } from 'recharts';
import PatientFormModal from './PatientFormModal';
import LabOrderFormModal from './LabOrderFormModal';
import PrintBarcodeModal from './PrintBarcodeModal';
import CollectSampleModal from './CollectSampleModal';
import LabOrderDetail from './LabOrderDetail';
import { Search } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  currentRole: string;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ currentRole, setActiveTab }: DashboardProps) {
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isLabOrderModalOpen, setIsLabOrderModalOpen] = useState(false);
  const [printBarcodeOrder, setPrintBarcodeOrder] = useState<string | null>(null);
  const [queueSearchTerm, setQueueSearchTerm] = useState('');
  const [collectSampleOrder, setCollectSampleOrder] = useState<any>(null);
  const [completedLabsSearchTerm, setCompletedLabsSearchTerm] = useState('');
  const [completedLabOrder, setCompletedLabOrder] = useState<any>(null);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [techDateRange, setTechDateRange] = useState({ start: todayStr, end: todayStr });
  const [doctorDateRange, setDoctorDateRange] = useState({ start: todayStr, end: todayStr });
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
  
  const [adminViewBy, setAdminViewBy] = useState('Day');
  const [adminPreset, setAdminPreset] = useState('Last 30 days');
  const [showAdminDatePopup, setShowAdminDatePopup] = useState(false);
  const [adminAppliedDate, setAdminAppliedDate] = useState({ start: thirtyDaysAgoStr, end: todayStr });
  const [adminTempDate, setAdminTempDate] = useState({ start: thirtyDaysAgoStr, end: todayStr });

  const handleAdminPresetSelect = (preset: string) => {
    setAdminPreset(preset);
    const end = new Date();
    let start = new Date();
    
    if (preset === 'Last 7 days') {
      start.setDate(start.getDate() - 6);
    } else if (preset === 'Last 30 days') {
      start.setDate(start.getDate() - 29);
    } else if (preset === 'Last 90 days') {
      start.setDate(start.getDate() - 89);
    } else if (preset === 'This month') {
      start.setDate(1);
    } else if (preset === 'Last month') {
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0); 
    }
    
    if (preset !== 'Custom range') {
      setAdminTempDate({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      });
    }
  };

  const handleAdminApplyDate = () => {
    if (new Date(adminTempDate.start) > new Date(adminTempDate.end)) {
      alert('Start date must be on or before end date.');
      return;
    }
    const endObj = new Date(adminTempDate.end);
    endObj.setHours(23, 59, 59, 999);
    if (endObj > new Date()) {
      alert('Cannot select future dates.');
      return;
    }
    setAdminAppliedDate(adminTempDate);
    setShowAdminDatePopup(false);
  };

  const formatDateStr = (dateStr: string) => {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const dateDisplay = adminPreset === 'Custom range' 
    ? `${formatDateStr(adminAppliedDate.start)} - ${formatDateStr(adminAppliedDate.end)}`
    : `${adminPreset} · ${formatDateStr(adminAppliedDate.start)} - ${formatDateStr(adminAppliedDate.end)}`;


  const renderReceptionistDashboard = () => {
    return (
      <div className="receptionist-dashboard">
        <div className="rec-header">
          <h1 className="page-title mb-0">Receptionist Dashboard</h1>
          <div className="rec-date-range">
            <span className="text-muted">Date range:</span>
            <span>07/06/2026 - 07/06/2026</span>
            <Calendar size={14} className="text-muted" />
          </div>
        </div>

        <div className="rec-action-cards">
          <div className="rec-action-card">
            <div className="rec-action-content">
              <div className="rec-action-icon-wrapper">
                <UserPlus size={24} className="text-yellow" />
              </div>
              <div className="rec-action-text">
                <h3>Register New Patient</h3>
                <p>Add a new patient profile to the system</p>
              </div>
            </div>
            <button className="btn-rec-action" onClick={() => setIsPatientModalOpen(true)}>
              + Register New Patient
            </button>
          </div>

          <div className="rec-action-card">
            <div className="rec-action-content">
              <div className="rec-action-icon-wrapper">
                <FlaskConical size={24} className="text-yellow" />
              </div>
              <div className="rec-action-text">
                <h3>Create Lab Order</h3>
                <p>Generate a new lab request</p>
              </div>
            </div>
            <button className="btn-rec-action" onClick={() => setIsLabOrderModalOpen(true)}>
              + Create Lab Order
            </button>
          </div>
        </div>

        <div className="rec-summary-cards">
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <ClipboardList size={20} className="text-yellow" />
              <span className="rec-summary-label">Today's Orders</span>
            </div>
            <div className="rec-summary-value text-yellow">15</div>
          </div>
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <Clock size={20} className="text-orange" />
              <span className="rec-summary-label">Pending Collection</span>
            </div>
            <div className="rec-summary-value text-orange">6</div>
          </div>
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <BriefcaseMedical size={20} className="text-blue" />
              <span className="rec-summary-label">In Progress</span>
            </div>
            <div className="rec-summary-value text-blue">5</div>
          </div>
          <div className="rec-summary-card">
            <div className="rec-summary-header">
              <CheckCircle2 size={20} className="text-green" />
              <span className="rec-summary-label">Completed</span>
            </div>
            <div className="rec-summary-value text-green">3</div>
          </div>
        </div>

        <div className="rec-recent-orders-section">
          <div className="rec-recent-header">
            <h2>Recent Lab Orders</h2>
            <span className="rec-badge-count">10</span>
          </div>

          <div className="rec-recent-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rec-order-card">
                <div className="rec-order-top">
                  <span className="rec-order-name">Olivia Nguyen</span>
                  <span className={`rec-status-badge ${i === 5 ? 'ready' : i === 6 ? 'sent' : 'pending'}`}>
                    {i === 5 ? 'Ready for Pickup' : i === 6 ? 'Sent to Lab' : 'Pending Collection'}
                  </span>
                </div>
                <div className="rec-order-tests">
                  <span className="rec-test-chip">HbA1c</span>
                  <span className="rec-test-chip">Fasting Glucose</span>
                  <span className="rec-test-chip">Creatinine</span>
                  <span className="rec-test-chip">BUN</span>
                  <span className="rec-test-chip more">+12</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDoctorDashboard = () => (
    <div className="doctor-dashboard-container">
      <div className="rec-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="page-title mb-0">Doctor Dashboard</h1>
          <p className="page-subtitle mt-1 text-muted">Review lab results and manage patient care</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Calendar size={16} className="text-muted" />
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginRight: '4px' }}>Date range:</span>
          <input 
            type="date" 
            value={doctorDateRange.start}
            onChange={(e) => setDoctorDateRange(prev => ({ ...prev, start: e.target.value }))}
            style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#334155', background: 'transparent' }}
          />
          <span style={{ color: '#94a3b8' }}>-</span>
          <input 
            type="date" 
            value={doctorDateRange.end}
            onChange={(e) => setDoctorDateRange(prev => ({ ...prev, end: e.target.value }))}
            style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#334155', background: 'transparent' }}
          />
        </div>
      </div>

      <div className="rec-action-cards" style={{ marginBottom: '24px' }}>
        <div className="rec-action-card">
          <div className="rec-action-content">
            <div className="rec-action-icon-wrapper">
              <FlaskConical size={24} className="text-yellow" />
            </div>
            <div className="rec-action-text">
              <h3>Create Lab Order</h3>
              <p>Order new tests for a patient</p>
            </div>
          </div>
          <button className="btn-rec-action" onClick={() => setIsLabOrderModalOpen(true)}>
            + New Lab Order
          </button>
        </div>

        <div className="rec-action-card">
          <div className="rec-action-content">
            <div className="rec-action-icon-wrapper" style={{ background: '#e0f2fe' }}>
              <ClipboardList size={24} style={{ color: '#0284c7' }} />
            </div>
            <div className="rec-action-text">
              <h3>Review Lab Results</h3>
              <p>Check pending results and reports</p>
            </div>
          </div>
          <button className="btn-rec-action" style={{ background: '#0284c7' }} onClick={() => setActiveTab('Lab Results')}>
            View Lab Results
          </button>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <Calendar size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Appointments Today</span>
            <span className="card-value text-info">24</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Critical Results</span>
            <span className="card-value text-danger">2</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            <Stethoscope size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Patients Seen</span>
            <span className="card-value text-success">14</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTechnicianDashboard = () => {
    const mockTechQueue = [
      { id: 'ORD007', name: 'James Wilson', mrn: 'MRN020', tests: 'Vitamin D, B12', status: 'pending', priority: 'routine', date: '2026-08-09T10:00:00' },
      { id: 'ORD006', name: 'Sarah Connor', mrn: 'MRN018', tests: 'Urinalysis, Microalbumin', status: 'pending', priority: 'routine', date: '2026-08-09T09:45:00' },
      { id: 'ORD005', name: 'David Lee', mrn: 'MRN015', tests: 'Lipid Panel, TSH', status: 'pending', priority: 'routine', date: '2026-08-09T09:30:00' },
      { id: 'ORD004', name: 'Emma Clark', mrn: 'MRN012', tests: 'CBC, HbA1c...', status: 'pending', priority: 'routine', date: '2026-08-09T09:15:00' },
      { id: 'ORD003', name: 'Michael Thompson', mrn: 'MRN007', tests: 'MRI Brain, Neurological Panel', status: 'pending', priority: 'urgent', date: '2026-08-09T09:00:00' },
      { id: 'ORD002', name: 'Lisa Brown', mrn: 'MRN004', tests: 'Peak Flow, IgE Level', status: 'pending', priority: 'routine', date: '2026-08-09T08:45:00' },
      { id: 'ORD001', name: 'John Smith', mrn: 'MRN001', tests: 'Complete Blood Count, HbA1c...', status: 'pending', priority: 'routine', date: '2026-08-09T08:30:00' },
    ];

    const filteredQueue = mockTechQueue.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(queueSearchTerm.toLowerCase()) || 
                          item.mrn.toLowerCase().includes(queueSearchTerm.toLowerCase());
      if (!matchSearch) return false;
      if (techDateRange.start && techDateRange.end) {
        const itemDate = item.date.split('T')[0];
        if (itemDate < techDateRange.start || itemDate > techDateRange.end) return false;
      }
      return true;
    });

    const mockCompletedLabs = [
      { id: 'CLN2023-20260710-EMP001-002', name: 'Emily Johnson', mrn: 'MRN002', patientName: 'Emily Johnson', tests: 'Glucose, HbA1c', status: 'Completed', priority: 'routine', date: '2026-08-09T08:00:00' },
      { id: 'CLN2023-20260701-EMP003-002', name: 'David Wilson', mrn: 'MRN003', patientName: 'David Wilson', tests: 'Troponin, ECG', status: 'Completed', priority: 'urgent', date: '2026-08-09T07:30:00' },
      { id: 'CLN2023-20260701-EMP001-003', name: 'John Smith', mrn: 'MRN001', patientName: 'John Smith', tests: 'Complete Blood Count', status: 'Completed', priority: 'routine', date: '2026-08-09T07:00:00' },
      { id: 'CLN2023-20260701-EMP001-004', name: 'William Turner', mrn: 'MRN005', patientName: 'William Turner', tests: 'Thyroid Panel', status: 'Completed', priority: 'routine', date: '2026-08-08T16:00:00' },
      { id: 'CLN2023-20260701-EMP005-001', name: 'Michael Thompson', mrn: 'MRN007', patientName: 'Michael Thompson', tests: 'MRI Brain', status: 'Completed', priority: 'urgent', date: '2026-08-08T15:30:00' },
      { id: 'CLN2023-20260701-EMP006-001', name: 'Emma Clark', mrn: 'MRN012', patientName: 'Emma Clark', tests: 'CBC, HbA1c', status: 'Completed', priority: 'routine', date: '2026-08-08T14:00:00' },
      { id: 'CLN2023-20260701-EMP007-001', name: 'Sarah Connor', mrn: 'MRN018', patientName: 'Sarah Connor', tests: 'Urinalysis', status: 'Completed', priority: 'routine', date: '2026-08-08T13:00:00' }
    ];

    const filteredCompletedLabs = mockCompletedLabs.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(completedLabsSearchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(completedLabsSearchTerm.toLowerCase());
      if (!matchSearch) return false;
      if (techDateRange.start && techDateRange.end) {
        const itemDate = item.date.split('T')[0];
        if (itemDate < techDateRange.start || itemDate > techDateRange.end) return false;
      }
      return true;
    });

    if (completedLabOrder) {
      return (
        <LabOrderDetail 
          order={completedLabOrder}
          onBack={() => setCompletedLabOrder(null)}
          onEdit={() => {}}
          onPrint={() => setPrintBarcodeOrder(completedLabOrder.id)}
        />
      );
    }

    return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Technician Dashboard</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <Calendar size={16} className="text-muted" />
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginRight: '4px' }}>Date Range:</span>
          <input 
            type="date" 
            value={techDateRange.start}
            onChange={(e) => setTechDateRange(prev => ({ ...prev, start: e.target.value }))}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155' }}
          />
          <span style={{ color: '#94a3b8' }}>-</span>
          <input 
            type="date" 
            value={techDateRange.end}
            onChange={(e) => setTechDateRange(prev => ({ ...prev, end: e.target.value }))}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155' }}
          />
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Clock size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Pending Collection</span>
            <span className="card-value text-warning">6</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
            <ClipboardList size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Samples Collected</span>
            <span className="card-value" style={{ color: '#6366f1' }}>15</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)' }}>
            <BriefcaseMedical size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Sent to Lab</span>
            <span className="card-value text-info">5</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="card-content">
            <span className="card-label">Results Ready</span>
            <span className="card-value text-success">18</span>
          </div>
        </div>
      </div>

      <div className="tech-dashboard-grid mt-6" style={{ alignItems: 'stretch' }}>
        {/* Sample Collection Queue */}
        <div className="premium-widget" style={{ height: '100%' }}>
          <div className="premium-widget-header" style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div>
                <div className="premium-widget-title">
                  <ClipboardList size={20} style={{ color: '#6b7280' }} />
                  <span>Sample Collection Queue</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
                  Orders awaiting sample collection
                </span>
              </div>
              <div className="search-input-wrapper" style={{ width: '200px', position: 'relative' }}>
                <Search size={14} className="search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search queue..." 
                  value={queueSearchTerm}
                  onChange={(e) => setQueueSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '6px 12px 6px 32px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>
          
          <div className="recent-orders-list" style={{ borderTop: '1px solid var(--border-color)', flex: 1, overflowY: 'auto', maxHeight: '450px' }}>
            {filteredQueue.length > 0 ? filteredQueue.map(item => (
              <div 
                key={item.id} 
                className="tech-queue-item hover-effect cursor-pointer" 
                style={{ cursor: 'pointer' }}
                onClick={() => setCollectSampleOrder(item)}
              >
                <div className="tech-queue-info">
                  <div className="tech-queue-header">
                    <Clock size={14} className="text-muted" />
                    <span className="tech-queue-name">{item.name}</span>
                  </div>
                  <div className="tech-queue-tests">{item.tests}</div>
                  <div className="tech-queue-mrn">MRN: {item.mrn}</div>
                </div>
                <div className="tech-queue-badges">
                  <span className="status-pill outline status-pending">pending</span>
                  <span className={item.priority === 'urgent' ? 'badge-urgent' : 'badge-routine'}>{item.priority}</span>
                </div>
              </div>
            )) : (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                No pending collections found.
              </div>
            )}
          </div>
        </div>

        {/* Labs Completed */}
        <div className="premium-widget" style={{ height: '100%' }}>
          <div className="premium-widget-header" style={{ paddingBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
              <div>
                <div className="premium-widget-title">
                  <CheckCircle2 size={20} style={{ color: '#6b7280' }} />
                  <span>Labs Completed</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
                  Completed lab orders returned from the lab
                </span>
              </div>
              <div className="search-input-wrapper" style={{ width: '200px', position: 'relative' }}>
                <Search size={14} className="search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search completed..." 
                  value={completedLabsSearchTerm}
                  onChange={(e) => setCompletedLabsSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '6px 12px 6px 32px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>
          
          <div className="recent-orders-list" style={{ borderTop: '1px solid var(--border-color)', flex: 1, overflowY: 'auto', maxHeight: '450px' }}>
            {filteredCompletedLabs.length > 0 ? filteredCompletedLabs.map(lab => (
              <div 
                key={lab.id} 
                className="tech-queue-item hover-effect cursor-pointer" 
                style={{ cursor: 'pointer' }}
                onClick={() => setCompletedLabOrder(lab)}
              >
                <div className="tech-queue-info">
                  <div className="tech-queue-header">
                    <CheckCircle2 size={14} className="text-success" />
                    <span className="tech-queue-name">{lab.name}</span>
                  </div>
                  <div className="tech-queue-mrn" style={{ marginLeft: '22px' }}>{lab.id}</div>
                </div>
                <div className="tech-queue-badges">
                  <span className="badge-routine" style={{ backgroundColor: 'transparent', color: '#111' }}>COMPLETED</span>
                </div>
              </div>
            )) : (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                No completed labs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

  const renderAdminDashboard = () => {
    const getDaysDiff = (start: string, end: string) => {
      const d1 = new Date(start);
      const d2 = new Date(end);
      return Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1;
    };

    const daysDiff = getDaysDiff(adminAppliedDate.start, adminAppliedDate.end);
    let actualView = adminViewBy;
    const viewText = actualView === 'Day' ? 'Daily totals' : actualView === 'Week' ? 'Weekly totals' : 'Monthly totals';

    const getChartData = (startDateStr: string, endDateStr: string, viewBy: string, isPatient: boolean) => {
      const start = new Date(startDateStr);
      start.setHours(0,0,0,0);
      const end = new Date(endDateStr);
      end.setHours(23,59,59,999);
      
      const dailyData = [];
      const cur = new Date(start);
      while(cur <= end) {
        const dayOfMonth = cur.getDate();
        const count = isPatient ? (5 + (dayOfMonth % 3)) : (15 + (dayOfMonth % 5));
        dailyData.push({ date: new Date(cur), count });
        cur.setDate(cur.getDate() + 1);
      }

      const grouped = new Map<string, number>();
      
      dailyData.forEach(d => {
        let key = '';
        if (viewBy === 'Month') {
          key = d.date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).replace(/ /g, ' ');
        } else if (viewBy === 'Week') {
          const temp = new Date(d.date);
          temp.setDate(temp.getDate() - (temp.getDay() === 0 ? 6 : temp.getDay() - 1));
          const wEnd = new Date(temp);
          wEnd.setDate(wEnd.getDate() + 6);
          key = `${temp.getDate()} ${temp.toLocaleDateString('en-GB', {month:'short'})} - ${wEnd.getDate()} ${wEnd.toLocaleDateString('en-GB', {month:'short'})}`;
        } else {
          key = `${String(d.date.getDate()).padStart(2, '0')} ${d.date.toLocaleDateString('en-GB', {month:'short'})}`;
        }
        grouped.set(key, (grouped.get(key) || 0) + d.count);
      });

      return Array.from(grouped.entries()).map(([name, count]) => ({ name, count }));
    };

    const patientData = getChartData(adminAppliedDate.start, adminAppliedDate.end, actualView, true);
    const labOrderData = getChartData(adminAppliedDate.start, adminAppliedDate.end, actualView, false);

    const patientTotal = patientData.reduce((sum, item) => sum + item.count, 0);
    const labOrderTotal = labOrderData.reduce((sum, item) => sum + item.count, 0);
    const showPatientLabels = patientData.length <= 12;
    const showLabLabels = labOrderData.length <= 12;

    return (
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header" style={{ marginBottom: '16px' }}>
          <div>
            <h1 className="page-title mb-0">Clinic Overview</h1>
            <p className="page-subtitle mt-1">Manage users, clinic settings, and monitor system activity.</p>
          </div>
        </div>
      
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b' }}>Current clinic totals</h3>
      </div>
      <div className="admin-metrics-grid" style={{ marginBottom: '24px' }}>
        <div className="admin-metric-card" style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '16px' }}>
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UsersIcon size={24} />
          </div>
          <div className="metric-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="metric-label" style={{ fontSize: '13px', color: '#64748b' }}>Total Staff</span>
            <span className="metric-value text-blue-600" style={{ fontSize: '28px', fontWeight: 'bold' }}>24</span>
          </div>
        </div>
        
        <div className="admin-metric-card" style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '16px' }}>
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Key size={24} />
          </div>
          <div className="metric-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="metric-label" style={{ fontSize: '13px', color: '#64748b' }}>Active Roles</span>
            <span className="metric-value text-purple-600" style={{ fontSize: '28px', fontWeight: 'bold' }}>8</span>
          </div>
        </div>
        
        <div className="admin-metric-card" style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '16px' }}>
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={24} />
          </div>
          <div className="metric-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="metric-label" style={{ fontSize: '13px', color: '#64748b' }}>Active Tests</span>
            <span className="metric-value text-green-600" style={{ fontSize: '28px', fontWeight: 'bold' }}>45</span>
          </div>
        </div>

        <div className="admin-metric-card" style={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '16px' }}>
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UsersIcon size={24} />
          </div>
          <div className="metric-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="metric-label" style={{ fontSize: '13px', color: '#64748b' }}>Total Patients</span>
            <span className="metric-value" style={{ color: '#0ea5e9', fontSize: '28px', fontWeight: 'bold' }}>1,284</span>
          </div>
        </div>
      </div>

      <div className="admin-section-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', margin: 0 }}>Activity Overview</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>{viewText} • Applies to both charts</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowAdminDatePopup(!showAdminDatePopup)}
                style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                <Calendar size={16} className="text-muted" />
                <span style={{ fontSize: '13px', color: '#334155' }}>{dateDisplay}</span>
              </div>
              
              {showAdminDatePopup && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 50, width: '320px', padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                      {['Last 7 days', 'Last 30 days', 'Last 90 days', 'This month', 'Last month', 'Custom range'].map(preset => (
                        <div 
                          key={preset}
                          onClick={() => handleAdminPresetSelect(preset)}
                          style={{ padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', backgroundColor: adminPreset === preset ? '#eff6ff' : 'transparent', color: adminPreset === preset ? '#2563eb' : '#475569', fontWeight: adminPreset === preset ? 500 : 400 }}
                        >
                          {preset}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>From date</span>
                        <input 
                          type="date" 
                          value={adminTempDate.start}
                          onChange={(e) => { setAdminPreset('Custom range'); setAdminTempDate(prev => ({ ...prev, start: e.target.value })); }}
                          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>To date</span>
                        <input 
                          type="date" 
                          value={adminTempDate.end}
                          onChange={(e) => { setAdminPreset('Custom range'); setAdminTempDate(prev => ({ ...prev, end: e.target.value })); }}
                          style={{ padding: '6px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                    <button onClick={() => setShowAdminDatePopup(false)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleAdminApplyDate} style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', background: '#3b82f6', color: 'white', fontSize: '13px', cursor: 'pointer' }}>Apply</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>View by:</span>
              <select value={adminViewBy} onChange={(e) => setAdminViewBy(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#334155', background: 'transparent', fontWeight: 500 }}>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#0ea5e9', display: 'inline-block', marginRight: '12px' }}>{patientTotal}</span>
              <div style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: 0 }}>New Patient Registrations</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>New clinic patient profiles</p>
              </div>
            </div>
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={patientData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPatient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="linear" dataKey="count" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorPatient)" activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}>
                    {showPatientLabels && <LabelList dataKey="count" position="top" fill="#0ea5e9" fontSize={12} fontWeight={600} offset={10} />}
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {patientTotal === 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>No activity in this period.</span>
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', display: 'inline-block', marginRight: '12px' }}>{labOrderTotal}</span>
              <div style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: 0 }}>Lab Order Volume</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Lab orders created</p>
              </div>
            </div>
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={labOrderData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 250]} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {showLabLabels && <LabelList dataKey="count" position="top" fill="#8b5cf6" fontSize={12} fontWeight={600} offset={10} />}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {labOrderTotal === 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>No activity in this period.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="admin-main-grid" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="admin-section-card">
          <div className="section-header" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Quick Actions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <button 
              onClick={() => setActiveTab('User Management')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '8px', border: 'none', backgroundColor: '#d97706', color: 'white', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <UserPlus size={20} />
                <span style={{ fontWeight: 600, fontSize: '15px' }}>Invite Staff</span>
              </div>
              <ChevronRight size={18} opacity={0.8} />
            </button>
            
            <button 
              onClick={() => setActiveTab('Roles & Permissions')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#1e293b', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#8b5cf6' }}><Key size={20} /></div>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>Manage Roles</span>
              </div>
              <ChevronRight size={18} color="#94a3b8" />
            </button>

            <button 
              onClick={() => setActiveTab('Clinic Settings')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#1e293b', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#f59e0b' }}><Settings size={20} /></div>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>Clinic Settings</span>
              </div>
              <ChevronRight size={18} color="#94a3b8" />
            </button>

            <button 
              onClick={() => setActiveTab('Audit Logs')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#1e293b', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#64748b' }}><History size={20} /></div>
                <span style={{ fontWeight: 600, fontSize: '15px' }}>View Audit Logs</span>
              </div>
              <ChevronRight size={18} color="#94a3b8" />
            </button>
          </div>
        </div>

        <div className="admin-section-card">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Recent System Activity</h2>
            <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => setActiveTab('Audit Logs')}>
              View all logs <ChevronRight size={14} />
            </button>
          </div>
          <div className="audit-log-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 1, action: 'Updated Clinic Working Hours', user: 'Admin User', time: '10 mins ago', timestamp: '06 Oct 2026, 10:24', type: 'settings' },
              { id: 2, action: 'Created new role: Senior Technician', user: 'Admin User', time: '1 hour ago', timestamp: '06 Oct 2026, 09:18', type: 'roles' },
              { id: 3, action: 'Failed login attempt (IP: 192.168.1.104)', user: 'Unknown', time: '3 hours ago', timestamp: '06 Oct 2026, 06:43', type: 'security' },
              { id: 4, action: 'Added new service: Comprehensive Blood Test', user: 'Admin User', time: 'Yesterday', timestamp: '05 Oct 2026, 16:11', type: 'services' },
              { id: 5, action: 'Password reset requested for Dr. Wilson', user: 'System', time: 'Yesterday', timestamp: '05 Oct 2026, 11:27', type: 'security' }
            ].map((log, index) => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: index < 4 ? '16px' : '0', borderBottom: index < 4 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: log.type === 'settings' ? '#fef3c7' : log.type === 'roles' ? '#f3e8ff' : log.type === 'security' ? '#fee2e2' : '#dcfce7',
                    color: log.type === 'settings' ? '#d97706' : log.type === 'roles' ? '#9333ea' : log.type === 'security' ? '#ef4444' : '#16a34a'
                  }}>
                    {log.type === 'settings' && <Settings size={16} />}
                    {log.type === 'roles' && <Key size={16} />}
                    {log.type === 'security' && <ShieldCheck size={16} />}
                    {log.type === 'services' && <Package size={16} />}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{log.action}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>By {log.user} • {log.time}</span>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  };

  const renderPlatformAdminDashboard = () => (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="page-title mb-0">Multi-Clinic Overview</h1>
          <p className="page-subtitle mt-1">Global view of all managed clinics on the Health Hub platform.</p>
        </div>
        <div className="admin-status-badge">
          <span className="status-indicator online"></span>
          Platform Status: 100% Uptime
        </div>
      </div>
      
      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Building2 size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Active Clinics</span>
            <span className="metric-value text-blue-600">45</span>
            <span className="metric-trend positive">↑ 3 this month</span>
          </div>
        </div>
        
        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <UsersIcon size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Platform Users</span>
            <span className="metric-value text-purple-600">1,204</span>
            <span className="metric-trend positive">↑ 56 this month</span>
          </div>
        </div>
        
        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <FlaskConical size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">Total Lab Orders (YTD)</span>
            <span className="metric-value text-green-600">84,500</span>
            <span className="metric-trend positive">On track</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }}>
            <Server size={24} />
          </div>
          <div className="metric-content">
            <span className="metric-label">API Usage Limit</span>
            <span className="metric-value text-gray-700">42%</span>
            <span className="metric-trend neutral">Normal</span>
          </div>
        </div>
      </div>

      <div className="platform-clinics-section mt-6">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Managed Clinics</h2>
          <div className="search-input-wrapper" style={{ width: '250px', position: 'relative' }}>
            <Search size={14} className="search-icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search clinics..." 
              style={{ width: '100%', padding: '8px 12px 8px 32px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
            />
          </div>
        </div>
        
        <div className="platform-table-container">
          <table className="platform-table">
            <thead>
              <tr>
                <th>Clinic Name</th>
                <th>Status</th>
                <th>Users</th>
                <th>Tier</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Downtown Medical Center', status: 'Active', users: 45, tier: 'Enterprise', lastActive: '2 mins ago' },
                { name: 'Uptown Family Care', status: 'Active', users: 12, tier: 'Standard', lastActive: '15 mins ago' },
                { name: 'Westside Clinic', status: 'Suspended', users: 8, tier: 'Standard', lastActive: '2 days ago' },
                { name: 'City Hospital Annex', status: 'Active', users: 124, tier: 'Enterprise', lastActive: 'Just now' },
                { name: 'Northgate Pediatrics', status: 'Active', users: 22, tier: 'Standard', lastActive: '1 hour ago' },
              ].map((clinic, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500, color: '#0f172a' }}>{clinic.name}</td>
                  <td>
                    <span className={`status-pill ${clinic.status === 'Active' ? 'status-ready' : 'status-pending'}`} style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', backgroundColor: clinic.status === 'Active' ? '#dcfce7' : '#fef08a', color: clinic.status === 'Active' ? '#166534' : '#854d0e', fontWeight: 500, display: 'inline-block' }}>
                      {clinic.status}
                    </span>
                  </td>
                  <td>{clinic.users}</td>
                  <td>
                    <span style={{ fontSize: '12px', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#475569' }}>
                      {clinic.tier}
                    </span>
                  </td>
                  <td style={{ color: '#64748b' }}>{clinic.lastActive}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="icon-btn" title="Manage" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}>
                      <Settings size={16} />
                    </button>
                    <button className="icon-btn" title="More" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}>
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {currentRole === 'Receptionist' && renderReceptionistDashboard()}
      {currentRole === 'Doctor' && renderDoctorDashboard()}
      {currentRole === 'Technician' && renderTechnicianDashboard()}
      {currentRole === 'Admin' && renderAdminDashboard()}
      {currentRole === 'Clinic Admin' && renderAdminDashboard()}
      {currentRole === 'Platform Admin' && renderPlatformAdminDashboard()}
      {/* Modals for Quick Actions */}
      <PatientFormModal 
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        mode="create"
      />
      
      <LabOrderFormModal 
        isOpen={isLabOrderModalOpen} 
        onClose={() => setIsLabOrderModalOpen(false)} 
        mode="create" 
        onRegisterPatient={() => {
          setIsLabOrderModalOpen(false);
          setIsPatientModalOpen(true);
        }}
        onPrintLabels={(id) => setPrintBarcodeOrder(id)}
      />

      {printBarcodeOrder && (
        <PrintBarcodeModal
          orderId={printBarcodeOrder}
          onClose={() => setPrintBarcodeOrder(null)}
          onPrint={() => setPrintBarcodeOrder(null)}
        />
      )}

      {collectSampleOrder && (
        <CollectSampleModal
          order={{...collectSampleOrder, patientName: collectSampleOrder.name}}
          onClose={() => setCollectSampleOrder(null)}
          onPrintBarcode={() => {
            setPrintBarcodeOrder(collectSampleOrder.id);
          }}
          onComplete={() => setCollectSampleOrder(null)}
        />
      )}
    </div>
  );
}
