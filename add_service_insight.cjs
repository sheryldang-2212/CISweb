const fs = require('fs');

let fileContent = fs.readFileSync('src/components/ReportsAnalytics.tsx', 'utf8');

// 1. Add LabelList to imports if not present
if (!fileContent.includes('LabelList')) {
  fileContent = fileContent.replace(
    "import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';",
    "import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';"
  );
}

// 2. Add serviceInsightData
const mockDataCode = `
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
`;

if (!fileContent.includes('serviceInsightData')) {
  fileContent = fileContent.replace(
    "interface ReportsAnalyticsProps {",
    mockDataCode + "\ninterface ReportsAnalyticsProps {"
  );
}

// 3. Add the Service Insight block right after the "Lab Volume by Clinic" chart-card.
const jsxBlock = `
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
`;

if (!fileContent.includes('Test Demand by Gender')) {
  // Find the exact place to insert.
  // It's in the Lab Volume block, right after Lab Volume by Clinic.
  // The block ends with:
  /*
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Patient Demographics' && (
  */
  const insertMarker = "          </div>\n\n</div>\n        </div>\n      )}"; // Look at view_file, line 366
  
  // Wait, line 366 had:
  // 365: 
  // 366: </div>
  // 367:         </div>
  // 368:       )}
  
  // Let's just use string replace for that exact sequence.
  fileContent = fileContent.replace(
    "\n</div>\n        </div>\n      )}",
    "\n          </div>\n" + jsxBlock + "\n        </div>\n      )}"
  );
}

fs.writeFileSync('src/components/ReportsAnalytics.tsx', fileContent);
console.log('Done!');
