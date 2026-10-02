import { useState } from 'react';
import { Download, FlaskConical, Activity, Box, Users, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
        <div 
          className={`tab-item ${activeTab === 'Demographics x Lab Usage' ? 'active' : ''}`}
          onClick={() => setActiveTab('Demographics x Lab Usage')}
        >
          Demographics x Lab Usage
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
        </div>
      )}

      {activeTab === 'Demographics x Lab Usage' && (
        <div className="chart-card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="chart-title">Demographic Group × Test Usage</h3>
          <p className="chart-subtitle">Top 20 combinations within current filters. Use filters above to drill down.</p>
          
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Demographic Group</th>
                  <th>Test</th>
                  <th style={{textAlign: 'right'}}>Orders</th>
                </tr>
              </thead>
              <tbody>
                {activeDemographicsLabData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.group}</td>
                    <td>{row.test}</td>
                    <td style={{textAlign: 'right'}}>{row.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
