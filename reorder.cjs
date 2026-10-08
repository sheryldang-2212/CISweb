const fs = require('fs');
const file = 'src/components/PlatformDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

const markers = {
  headerEnd: '      {/* ALERTS ROW */}',
  alerts: '      {/* ALERTS ROW */}',
  metrics: '      {/* METRICS ROW */}',
  quickActions: '      {/* QUICK ACTIONS ROW */}',
  mainGrid: '      {/* MAIN GRID */}',
  clinicOpTable: '          {/* Clinic Operational Status Table */}',
  platformUsers: '          {/* Platform Users */}',
  clinicStatus: '          {/* Clinic Status & Setup Progress */}',
  recentActivity: '          {/* Recent Activity */}',
  endOfComponent: '        </div>\n      </div>\n    </div>\n  );\n}'
};

const getBlock = (startMarker, endMarker) => {
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  if (start === -1 || end === -1) {
    console.error('Marker not found', {startMarker, endMarker});
    process.exit(1);
  }
  return content.substring(start, end);
};

const headerPart = content.substring(0, content.indexOf(markers.alerts));
const alertsBlock = getBlock(markers.alerts, markers.metrics);
const metricsBlock = getBlock(markers.metrics, markers.quickActions);
const quickActionsBlock = getBlock(markers.quickActions, markers.mainGrid);
const clinicOpTableBlock = getBlock(markers.clinicOpTable, markers.platformUsers);
const platformUsersBlock = getBlock(markers.platformUsers, '        </div>\n        \n        {/* RIGHT COLUMN */}');
const clinicStatusBlock = getBlock(markers.clinicStatus, markers.recentActivity);
const recentActivityBlock = getBlock(markers.recentActivity, markers.endOfComponent);

const newContent = headerPart + 
'      {/* PLATFORM OPERATION SECTION */}\n' +
'      <div style={{ marginBottom: "40px" }}>\n' +
'        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "24px" }}>\n' +
'          <span style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "12px" }}>Platform Operation</span>\n' +
'        </h2>\n\n' +
quickActionsBlock + '\n' +
'        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>\n' +
platformUsersBlock + '\n' +
recentActivityBlock + '\n' +
'        </div>\n' +
'      </div>\n\n' +
'      {/* CLINIC OPERATION SECTION */}\n' +
'      <div>\n' +
'        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "24px" }}>\n' +
'          <span style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "12px" }}>Clinic Operation</span>\n' +
'        </h2>\n\n' +
alertsBlock + '\n' +
metricsBlock + '\n' +
'        <div style={{ display: "grid", gridTemplateColumns: "65% 1fr", gap: "24px" }}>\n' +
clinicOpTableBlock + '\n' +
clinicStatusBlock + '\n' +
'        </div>\n' +
'      </div>\n' +
'    </div>\n  );\n}\n';

fs.writeFileSync(file, newContent);
console.log('Done!');
