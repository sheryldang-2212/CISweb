const fs = require('fs');

let fileContent = fs.readFileSync('src/components/MobileAppSettings.tsx', 'utf8');

// 1. Add Phone to imports
fileContent = fileContent.replace(
  "AlertTriangle } from 'lucide-react';",
  "AlertTriangle, Phone } from 'lucide-react';"
);

// 2. Add 'Phone code' to tabs array
fileContent = fileContent.replace(
  "  const tabs = [\n    { id: 'Questionnaire', icon: FileQuestion },",
  "  const tabs = [\n    { id: 'Phone code', icon: Phone },\n    { id: 'Questionnaire', icon: FileQuestion },"
);

// 3. Add description
fileContent = fileContent.replace(
  "{activeTab === 'Questionnaire' && 'Manage questions asked during patient registration and profile updates.'}",
  "{activeTab === 'Phone code' && 'Select allowed country codes for phone number input on the mobile app.'}\n              {activeTab === 'Questionnaire' && 'Manage questions asked during patient registration and profile updates.'}"
);

// 4. Add the 'Phone code' render block
const phoneCodeRender = `
        {/* Phone Code */}
        {activeTab === 'Phone code' && (
          <div className="fadeIn">
            <div className="table-container premium-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px', textAlign: 'center' }}>
                      <input type="checkbox" defaultChecked />
                    </th>
                    <th>Country Name</th>
                    <th>Country Code</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>Vietnam</td>
                    <td>+84</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>United States</td>
                    <td>+1</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>Thailand</td>
                    <td>+66</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" defaultChecked /></td>
                    <td style={{ fontWeight: 600 }}>Singapore</td>
                    <td>+65</td>
                    <td><span className="status-pill status-ready">Active</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                    <td style={{ fontWeight: 600 }}>United Kingdom</td>
                    <td>+44</td>
                    <td><span className="status-pill status-pending" style={{ color: '#64748b', background: '#f1f5f9' }}>Inactive</span></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                    <td style={{ fontWeight: 600 }}>Australia</td>
                    <td>+61</td>
                    <td><span className="status-pill status-pending" style={{ color: '#64748b', background: '#f1f5f9' }}>Inactive</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
`;

fileContent = fileContent.replace(
  "{/* Questionnaire */}",
  phoneCodeRender + "\n        {/* Questionnaire */}"
);

fs.writeFileSync('src/components/MobileAppSettings.tsx', fileContent);
console.log('Done!');
