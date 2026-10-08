import { useState } from 'react';
import { Download, FlaskConical, Activity, Box, Users, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';
import './ReportsAnalytics.css';

const platformVolumeData = [
  { date: '2024-01-16', orders: 6, tests: 14, packages: 0 },
  { date: '2026-08-19', orders: 1, tests: 1, packages: 0 },
  { date: '2026-08-27', orders: 1, tests: 2, packages: 0 },
  { date: '2026-09-03', orders: 1, tests: 2, packages: 0 },
  { date: '2026-09-09', orders: 4, tests: 12, packages: 0 },
  { date: '2026-09-10', orders: 8, tests: 20, packages: 0 },
  { date: '2026-09-11', orders: 9, tests: 30, packages: 0 },
];

const platformTestData = [
  { name: 'HbA1c', count: 11 },
  { name: 'CBC', count: 11 },
  { name: 'Creatinine', count: 7 },
  { name: 'TSH', count: 5 },
  { name: 'ALT', count: 5 },
  { name: 'Total Cholesterol', count: 5 },
  { name: 'Lipid Panel', count: 4 },
  { name: 'Troponin', count: 4 }
];

const platformClinicData = [
  { name: 'Downtown Medical Center', count: 27 },
  { name: 'Suburban Family Clinic', count: 9 },
  { name: 'Emergency Care Center', count: 6 }
];

const platformAgeData = [
  { name: '0-18', count: 2 },
  { name: '19-35', count: 8 },
  { name: '36-55', count: 10 },
  { name: '56-75', count: 5 },
  { name: '75+', count: 0 }
];

const platformGenderData = [
  { name: 'male', count: 13, fill: '#3b82f6' },
  { name: 'female', count: 12, fill: '#22c55e' }
];

const platformPatientRegData = [
  { date: '2024-01-08', count: 1 },
  { date: '2024-01-12', count: 1 },
  { date: '2026-01-14', count: 1 },
  { date: '2026-03-25', count: 1 },
  { date: '2026-05-30', count: 1 },
  { date: '2026-06-28', count: 1 }
];

const platformPatientClinicData = [
  { name: 'Downtown Medical Center', count: 10 },
  { name: 'Suburban Family Clinic', count: 9 },
  { name: 'Emergency Care Center', count: 6 }
];

const platformDemographicsLabData = [
  { group: '36-55 · male', test: 'HbA1c', orders: 5 },
  { group: '36-55 · male', test: 'CBC', orders: 5 },
  { group: '36-55 · male', test: 'Creatinine', orders: 4 },
  { group: '36-55 · male', test: 'Total Cholesterol', orders: 3 },
  { group: '19-35 · female', test: 'Vitamin D', orders: 3 },
  { group: '19-35 · female', test: 'CBC', orders: 3 },
  { group: '36-55 · male', test: 'Lipid Panel', orders: 2 },
  { group: '36-55 · male', test: 'ALT', orders: 2 },
  { group: '36-55 · male', test: 'PSA', orders: 2 },
  { group: '36-55 · male', test: 'ESR', orders: 2 },
  { group: '36-55 · male', test: 'TSH', orders: 2 },
  { group: '36-55 · male', test: 'Fasting Blood Sugar', orders: 2 },
  { group: '36-55 · male', test: 'LDL-C', orders: 2 },
  { group: '36-55 · male', test: 'HDL-C', orders: 2 },
  { group: '36-55 · male', test: 'Triglycerides', orders: 2 },
  { group: '19-35 · female', test: 'HbA1c', orders: 2 },
  { group: '19-35 · female', test: 'Lipid Panel', orders: 2 },
  { group: '19-35 · female', test: 'Vitamin B12', orders: 2 },
  { group: '19-35 · female', test: 'ALT', orders: 2 },
  { group: '19-35 · female', test: 'AST', orders: 2 }
];

const clinicVolumeData = [
  { date: '2024-01-16', orders: 4, tests: 11, packages: 0 },
  { date: '2026-08-19', orders: 1, tests: 1, packages: 0 },
  { date: '2026-08-27', orders: 1, tests: 1, packages: 0 },
  { date: '2026-09-03', orders: 1, tests: 2, packages: 0 },
  { date: '2026-09-08', orders: 2, tests: 10, packages: 0 },
  { date: '2026-09-09', orders: 6, tests: 16, packages: 0 },
  { date: '2026-09-10', orders: 5, tests: 22, packages: 0 },
  { date: '2026-09-11', orders: 6, tests: 15, packages: 0 },
];

const clinicTestData = [
  { name: 'HbA1c', count: 8 },
  { name: 'TSH', count: 5 },
  { name: 'CBC', count: 5 },
  { name: 'Total Cholesterol', count: 5 },
  { name: 'Lipid Panel', count: 4 },
  { name: 'Triglycerides', count: 4 },
  { name: 'Vitamin D', count: 3 },
  { name: 'Free T4', count: 3 }
];

const clinicPatientClinicData = [
  { name: 'Downtown Medical Center', count: 26 }
];

const clinicAgeData = [
  { name: '19-35', count: 5 },
  { name: '36-55', count: 4 },
  { name: '56-75', count: 1 }
];

const clinicGenderData = [
  { name: 'male', count: 5, fill: '#3b82f6' },
  { name: 'female', count: 5, fill: '#22c55e' }
];

const clinicRegData = [
  { date: '2024-01-08', count: 1 },
  { date: '2024-01-12', count: 1 },
  { date: '2026-03-25', count: 1 },
  { date: '2026-05-14', count: 1 },
  { date: '2026-06-28', count: 1 }
];

const clinicPatientCountData = [
  { name: 'Downtown Medical Center', count: 10 }
];

const clinicDemographicsLabData = [
  { group: '36-55 · male', test: 'HbA1c', orders: 4 },
  { group: '36-55 · male', test: 'Total Cholesterol', orders: 3 },
  { group: '19-35 · female', test: 'Vitamin D', orders: 3 },
  { group: '36-55 · male', test: 'Lipid Panel', orders: 2 },
  { group: '36-55 · male', test: 'PSA', orders: 2 },
  { group: '36-55 · male', test: 'CBC', orders: 2 },
  { group: '36-55 · male', test: 'TSH', orders: 2 },
  { group: '36-55 · male', test: 'Fasting Blood Sugar', orders: 2 },
  { group: '36-55 · male', test: 'LDL-C', orders: 2 },
  { group: '36-55 · male', test: 'HDL-C', orders: 2 },
  { group: '36-55 · male', test: 'Triglycerides', orders: 2 },
  { group: '36-55 · male', test: 'Creatinine', orders: 2 },
  { group: '19-35 · female', test: 'CBC', orders: 2 },
  { group: '19-35 · female', test: 'HbA1c', orders: 2 },
  { group: '19-35 · female', test: 'Lipid Panel', orders: 2 }
];


const activePatientsByMonth = [
  { name: 'Apr', active: 9 },
  { name: 'May', active: 11 },
  { name: 'Jun', active: 12 },
  { name: 'Jul', active: 14 },
  { name: 'Aug', active: 15 },
  { name: 'Sep', active: 17 }
];

const newVsReturningData = [
  { name: 'Apr', new: 1, returning: 0 },
  { name: 'May', new: 2, returning: 1 },
  { name: 'Jun', new: 1, returning: 1 },
  { name: 'Jul', new: 1, returning: 2 },
  { name: 'Aug', new: 2, returning: 2 },
  { name: 'Sep', new: 2, returning: 2 }
];

const patientActivityByClinicData = [
  { clinic: 'Downtown Medical Center', total: 10, active: 7, rate: 70, new: 4, returning: 3 },
  { clinic: 'Suburban Family Clinic', total: 9, active: 6, rate: 67, new: 3, returning: 3 },
  { clinic: 'Emergency Care Center', total: 6, active: 4, rate: 67, new: 2, returning: 2 }
];


const serviceInsightData = [
  { test: 'HbA1c', female: 5, male: 6, total: 11 },
  { test: 'CBC', female: 6, male: 5, total: 11 },
  { test: 'Creatinine', female: 3, male: 4, total: 7 },
  { test: 'TSH', female: 4, male: 1, total: 5 },
  { test: 'ALT', female: 2, male: 3, total: 5 },
  { test: 'Total Cholesterol', female: 2, male: 3, total: 5 },
  { test: 'Lipid Panel', female: 2, male: 2, total: 4 },
  { test: 'Troponin', female: 1, male: 3, total: 4 },
];

interface ReportsAnalyticsProps {
  currentRole?: string;
  currentClinic?: any;
}

export default function ReportsAnalytics({ currentRole }: ReportsAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('Lab Volume');

  const isPlatform = currentRole === 'Platform Admin';

  const activeVolumeData = isPlatform ? platformVolumeData : clinicVolumeData;
  const activeTestData = isPlatform ? platformTestData : clinicTestData;
  const activeClinicData = isPlatform ? platformClinicData : clinicPatientClinicData;
  const activeAgeData = isPlatform ? platformAgeData : clinicAgeData;
  const activeGenderData = isPlatform ? platformGenderData : clinicGenderData;
  const activePatientRegData = isPlatform ? platformPatientRegData : clinicRegData;
  const activePatientCountData = isPlatform ? platformPatientClinicData : clinicPatientCountData;
  const activeDemographicsLabData = isPlatform ? platformDemographicsLabData : clinicDemographicsLabData;

  const totalLabOrders = isPlatform ? 30 : 26;
  const totalTestsPerformed = isPlatform ? 84 : 78;
  const totalPackagesUsed = isPlatform ? 0 : 0;
  const totalRegisteredPatients = isPlatform ? 25 : 10;

  return (
    <div className="reports-analytics-container fadeIn">
      <div className="reports-header">
        <div>
          <h1 className="reports-title">Reports & Analytics</h1>
          <p className="reports-subtitle">Operational volume, lab demand, package demand, and patient demographics</p>
        </div>
        <button className="export-btn">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="filters-section">
        <div className="filters-title">Filters</div>
        <div className="filters-grid">
          {isPlatform && (
            <div className="filter-group">
              <label>Clinic</label>
              <select className="filter-select"><option>All clinics</option></select>
            </div>
          )}
          <div className="filter-group">
            <label>Start date</label>
            <div className="date-input-container">
              <input type="text" placeholder="mm/dd/yyyy" className="filter-input" />
              <Calendar size={16} className="calendar-icon" />
            </div>
          </div>
          <div className="filter-group">
            <label>End date</label>
            <div className="date-input-container">
              <input type="text" placeholder="mm/dd/yyyy" className="filter-input" />
              <Calendar size={16} className="calendar-icon" />
            </div>
          </div>
          <div className="filter-group">
            <label>Package</label>
            <select className="filter-select"><option>All packages</option></select>
          </div>
          <div className="filter-group">
            <label>Test</label>
            <select className="filter-select"><option>All tests</option></select>
          </div>
          <div className="filter-group">
            <label>Age group</label>
            <select className="filter-select"><option>All ages</option></select>
          </div>
          <div className="filter-group">
            <label>Gender</label>
            <select className="filter-select"><option>All</option></select>
          </div>
        </div>
      </div>

      <div className="reports-kpis">
        <div className="reports-kpi-card">
          <div className="reports-kpi-header">
            <span className="reports-kpi-title">Total Lab Orders</span>
            <FlaskConical size={16} className="reports-kpi-icon" />
          </div>
          <div className="reports-kpi-value">{totalLabOrders}</div>
        </div>
        
        <div className="reports-kpi-card">
          <div className="reports-kpi-header">
            <span className="reports-kpi-title">Tests Performed</span>
            <Activity size={16} className="reports-kpi-icon" />
          </div>
          <div className="reports-kpi-value">{totalTestsPerformed}</div>
        </div>
        
        <div className="reports-kpi-card">
          <div className="reports-kpi-header">
            <span className="reports-kpi-title">Packages Used</span>
            <Box size={16} className="reports-kpi-icon" />
          </div>
          <div className="reports-kpi-value">{totalPackagesUsed}</div>
        </div>
        
        <div className="reports-kpi-card">
          <div className="reports-kpi-header">
            <span className="reports-kpi-title">Registered Patients</span>
            <Users size={16} className="reports-kpi-icon" />
          </div>
          <div className="reports-kpi-value">{totalRegisteredPatients}</div>
        </div>
      </div>

      <div className="tabs-container">
        <div 
          className={`tab-item ${activeTab === 'Lab Volume' ? 'active' : ''}`}
          onClick={() => setActiveTab('Lab Volume')}
        >
          Lab Volume
        </div>
        <div 
          className={`tab-item ${activeTab === 'Patient Demographics' ? 'active' : ''}`}
          onClick={() => setActiveTab('Patient Demographics')}
        >
          Patient Demographics
        </div>
      </div>

      {activeTab === 'Lab Volume' && (
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Lab Order Volume Over Time</h3>
            <p className="chart-subtitle">Orders, tests, and packages per day</p>
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeVolumeData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <YAxis tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{fontSize: 12, fontWeight: 500}} />
                  <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={{r: 3, fill: '#fff', strokeWidth: 2}} activeDot={{r: 5}} />
                  <Line type="monotone" dataKey="tests" stroke="#22c55e" strokeWidth={2} dot={{r: 3, fill: '#fff', strokeWidth: 2}} activeDot={{r: 5}} />
                  <Line type="monotone" dataKey="packages" stroke="#f59e0b" strokeWidth={2} dot={{r: 3, fill: '#fff', strokeWidth: 2}} activeDot={{r: 5}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card">
            <h3 className="chart-title">Most Used Tests</h3>
            <p className="chart-subtitle">Top individual lab tests by order count</p>
            
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeTestData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} angle={-25} textAnchor="end" />
                  <YAxis tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="count" fill="#2563eb" radius={[2, 2, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Most Used Health Packages</h3>
            <p className="chart-subtitle">Top packages by order count</p>
            
            <div className="chart-empty-state">
              <p>No package usage in this filter range.</p>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Lab Volume by Clinic</h3>
            <p className="chart-subtitle">{isPlatform ? 'Orders across all clinics' : 'Your clinic'}</p>
            
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeClinicData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <YAxis tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="count" fill="#22c55e" radius={[2, 2, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          <div className="chart-card" style={{ gridColumn: '1 / -1', marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '32px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600, marginBottom: '8px' }}>Show</div>
                <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden' }}>
                  <button style={{ padding: '6px 16px', backgroundColor: '#f8fafc', border: '1px solid #2563eb', fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>Tests</button>
                  <button style={{ padding: '6px 16px', backgroundColor: 'white', border: '1px solid #cbd5e1', borderLeft: 'none', fontSize: '13px', color: '#64748b', cursor: 'pointer', borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}>Packages</button>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600, marginBottom: '8px' }}>Break down by</div>
                <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden' }}>
                  <button style={{ padding: '6px 16px', backgroundColor: 'white', border: '1px solid #cbd5e1', fontSize: '13px', color: '#64748b', cursor: 'pointer', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px' }}>Age group</button>
                  <button style={{ padding: '6px 16px', backgroundColor: '#f8fafc', border: '1px solid #2563eb', borderLeft: 'none', fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer', borderTopRightRadius: '6px', borderBottomRightRadius: '6px' }}>Gender</button>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600, marginBottom: '8px' }}>Measure</div>
                <select style={{ padding: '6px 12px', border: '2px solid #2563eb', borderRadius: '6px', fontSize: '13px', color: '#0f172a', backgroundColor: 'white', minWidth: '200px', fontWeight: 500 }}>
                  <option>Number of tests ordered</option>
                </select>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
              <h3 className="chart-title" style={{ marginBottom: '4px', fontSize: '16px' }}>Test Demand by Gender</h3>
              <p className="chart-subtitle" style={{ marginBottom: '16px' }}>Share of each test ordered by female and male patients</p>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}><div style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '2px' }}></div> Female</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' }}><div style={{ width: '12px', height: '12px', backgroundColor: '#2563eb', borderRadius: '2px' }}></div> Male</div>
              </div>

              <div style={{ height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceInsightData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }} barSize={24}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="test" tick={{fontSize: 13, fill: '#1e293b'}} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} />
                    <Bar dataKey="female" stackId="a" fill="#22c55e" radius={[4, 0, 0, 4]}>
                       <LabelList dataKey="female" position="insideLeft" fill="#fff" fontSize={12} fontWeight={600} offset={12} />
                    </Bar>
                    <Bar dataKey="male" stackId="a" fill="#2563eb" radius={[0, 4, 4, 0]}>
                       <LabelList dataKey="male" position="insideRight" fill="#fff" fontSize={12} fontWeight={600} offset={12} />
                    </Bar>
                    {/* Hack to show total at the end of the bar */}
                    <Bar dataKey="total" fill="transparent" barSize={0}>
                      <LabelList dataKey="total" position="right" fill="#64748b" fontSize={13} offset={12} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'Patient Demographics' && (
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Age Distribution</h3>
            <p className="chart-subtitle">Calculated from date of birth</p>
            
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeAgeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <YAxis tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="count" fill="#2563eb" radius={[2, 2, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card">
            <h3 className="chart-title">Gender Distribution</h3>
            <p className="chart-subtitle">Based on existing registration data</p>
            
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeGenderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    dataKey="count"
                    stroke="#fff"
                    strokeWidth={2}
                    label={({ value }) => `${value}`}
                    labelLine={false}
                  >
                    {activeGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="square" wrapperStyle={{fontSize: 12}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">New Patient Registrations Over Time</h3>
            
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activePatientRegData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <YAxis tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} tickCount={5} domain={[0, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot={{r: 3, fill: '#fff', strokeWidth: 2}} activeDot={{r: 5}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Patient Count by Clinic</h3>
            
            <div className="chart-container" style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activePatientCountData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <YAxis tick={{fontSize: 11, fill: '#64748b'}} tickLine={false} axisLine={{stroke: '#e2e8f0'}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[2, 2, 0, 0]} barSize={80} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Active vs Total Patients and New vs Returning Patients */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', gridColumn: '1 / -1', marginTop: '24px' }}>
            
            {/* Active vs Total Patients */}
            <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="chart-title">Active vs Total Patients</h3>
                  <p className="chart-subtitle">Active = at least one lab order in the activity window</p>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Activity window</div>
                  <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', marginTop: '24px', gap: '24px' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Active', value: 17, fill: '#2563eb' },
                          { name: 'Inactive', value: 8, fill: '#e2e8f0' }
                        ]}
                        cx="50%" cy="50%" innerRadius={40} outerRadius={55} dataKey="value" stroke="none"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>68%</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>active</div>
                  </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#2563eb', borderRadius: '2px' }}></div> Active</div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>17</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '2px' }}></div> Inactive</div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>8</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e2e8f0', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Total registered</div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>25</div>
                  </div>
                  <button style={{ width: '100%', padding: '6px 0', border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: 'white', color: '#2563eb', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>View 8 inactive patients</button>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '16px' }}>Active patients by month</h4>
                <div style={{ height: '120px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activePatientsByMonth} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{fill: '#f1f5f9'}} />
                      <Bar dataKey="active" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={24}>
                        {activePatientsByMonth.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.active === 17 ? '#2563eb' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* New vs Returning Patients */}
            <div className="chart-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 className="chart-title">New vs Returning Patients</h3>
              <p className="chart-subtitle">Patients with a lab order in each month, split by first visit or repeat visit</p>
              
              <div style={{ display: 'flex', height: '32px', borderRadius: '6px', overflow: 'hidden', marginTop: '16px', marginBottom: '16px' }}>
                <div style={{ width: '53%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', paddingLeft: '12px', color: 'white', fontSize: '12px', fontWeight: 600 }}>New 9 - 53%</div>
                <div style={{ width: '47%', backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center', paddingLeft: '12px', color: 'white', fontSize: '12px', fontWeight: 600 }}>Returning 8 - 47%</div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#2563eb', borderRadius: '2px' }}></div> New</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#f59e0b', borderRadius: '2px' }}></div> Returning</div>
              </div>

              <div style={{ flex: 1, minHeight: '160px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={newVsReturningData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} />
                    <Bar dataKey="new" stackId="a" fill="#2563eb" barSize={32} radius={[0, 0, 2, 2]} />
                    <Bar dataKey="returning" stackId="a" fill="#f59e0b" barSize={32} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Avg. days between visits<br/>(returning)</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>120 days</div>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>New patients who returned<br/>within 90 days</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>35%</div>
                </div>
              </div>
            </div>

          </div>

          {/* Patient Activity by Clinic */}
          <div className="chart-card" style={{ gridColumn: '1 / -1', marginTop: '24px' }}>
            <h3 className="chart-title">Patient Activity by Clinic</h3>
            <p className="chart-subtitle" style={{ marginBottom: '24px' }}>Compare engagement and retention across clinics</p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>Clinic</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>Total patients</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>Active</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>Active rate</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>New</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>Returning</th>
                  </tr>
                </thead>
                <tbody>
                  {patientActivityByClinicData.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < patientActivityByClinicData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 600, color: '#1e293b' }}>{row.clinic}</td>
                      <td style={{ padding: '16px 8px', color: '#475569' }}>{row.total}</td>
                      <td style={{ padding: '16px 8px', color: '#475569' }}>{row.active}</td>
                      <td style={{ padding: '16px 8px', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${row.rate}%`, height: '100%', backgroundColor: '#2563eb' }}></div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 500 }}>{row.rate}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 8px', color: '#475569' }}>{row.new}</td>
                      <td style={{ padding: '16px 8px', color: '#475569' }}>{row.returning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
