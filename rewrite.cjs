const fs = require('fs');
const content = fs.readFileSync('src/components/PlatformDashboard.tsx', 'utf-8');

const getSection = (startStr, endStr) => {
    const start = content.indexOf(startStr);
    if (start === -1) return '';
    const end = endStr ? content.indexOf(endStr, start) : content.length;
    if (end === -1) return '';
    return content.substring(start, end);
};

const alertsRow = getSection('{/* ALERTS ROW */}', '{/* METRICS ROW */}');
const metricsRow = getSection('{/* METRICS ROW */}', '{/* QUICK ACTIONS ROW */}');

const addClinicBtn = getSection('<button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#eff6ff\', color: \'#3b82f6\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <Plus size={18} />', '          <button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#f0fdf4\', color: \'#16a34a\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <UserPlus size={18} />');

const inviteClinicAdminBtn = getSection('<button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#f0fdf4\', color: \'#16a34a\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <UserPlus size={18} />', '          <button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#fff7ed\', color: \'#f97316\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <Package size={18} />');

const configPackageBtn = getSection('<button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#fff7ed\', color: \'#f97316\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <Package size={18} />', '          <button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#f5f3ff\', color: \'#8b5cf6\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <FileText size={18} />');

const reviewAuditBtn = getSection('<button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\', border: \'1px solid #e2e8f0\', borderRadius: \'12px\', cursor: \'pointer\', boxShadow: \'0 1px 2px rgba(0,0,0,0.02)\' }}>\n            <div style={{ display: \'flex\', alignItems: \'center\', gap: \'12px\' }}>\n              <div style={{ width: \'36px\', height: \'36px\', borderRadius: \'20px\', backgroundColor: \'#f5f3ff\', color: \'#8b5cf6\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\' }}>\n                <FileText size={18} />', '        </div>\n      </div>\n\n      {/* MAIN GRID */}');

const clinicStatusTable = getSection('{/* Clinic Operational Status Table */}', '{/* Platform Users */}');
const platformUsers = getSection('{/* Platform Users */}', '{/* RIGHT COLUMN */}');
const clinicSetupProgress = getSection('{/* Clinic Status & Setup Progress */}', '{/* Recent Activity */}');
const recentActivity = getSection('{/* Recent Activity */}', '        </div>\n      </div>\n      </>\n      ) : (');

const headerPart = content.substring(0, content.indexOf("{activeTab === 'Platform Operation' ? ("));
const footerPart = content.substring(content.indexOf('    </div>\n  );\n}'));

const newContent = `${headerPart}      {activeTab === 'Clinic Operation' && (
        <>
${alertsRow}${metricsRow}      {/* QUICK ACTIONS ROW */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ width: '4px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
${addClinicBtn}${inviteClinicAdminBtn}        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '65% 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          ${clinicStatusTable}        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          ${clinicSetupProgress}        </div>
      </div>
        </>
      )}

      {activeTab === 'Platform Operation' && (
        <>
      {/* QUICK ACTIONS ROW */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ width: '4px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
${configPackageBtn}${reviewAuditBtn}        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          ${platformUsers}        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          ${recentActivity}        </div>
      </div>
        </>
      )}
${footerPart}`;

fs.writeFileSync('src/components/PlatformDashboard.tsx', newContent);
console.log('Dashboard restructured successfully!');
