const fs = require('fs');

let fileContent = fs.readFileSync('src/components/ReportsAnalytics.tsx', 'utf8');

// 1. Add new mock data
const mockDataCode = `
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
`;

if (!fileContent.includes('activePatientsByMonth')) {
  fileContent = fileContent.replace(
    "interface ReportsAnalyticsProps {",
    mockDataCode + "\ninterface ReportsAnalyticsProps {"
  );
}

// 2. The JSX block
const jsxBlock = `
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
                          <Cell key={\`cell-\${index}\`} fill={entry.active === 17 ? '#2563eb' : '#3b82f6'} />
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
                            <div style={{ width: \`\${row.rate}%\`, height: '100%', backgroundColor: '#2563eb' }}></div>
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
`;

if (!fileContent.includes('Active vs Total Patients and New vs Returning Patients')) {
  fileContent = fileContent.replace(
    "          </div>\n        </div>\n      )}",
    jsxBlock + "\n        </div>\n      )}"
  );
}

fs.writeFileSync('src/components/ReportsAnalytics.tsx', fileContent);
console.log('Done!');
