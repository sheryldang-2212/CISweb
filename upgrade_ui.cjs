const fs = require('fs');

// 1. Update PlatformSettings.tsx
let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// Modernize the Tabs
platformSettings = platformSettings.replace(
  /<div className="detail-tabs" style={{ padding: '0 24px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>/g,
  `<div className="detail-tabs" style={{ padding: '16px 24px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '12px' }}>`
);

platformSettings = platformSettings.replace(
  /<button \n          className={`detail-tab \${activeTab === 'Platform' \? 'active' : ''}`}\n          onClick={\(\) => setActiveTab\('Platform'\)}\n        >\n          <Settings size={16} \/> Platform Features\n        <\/button>/g,
  `<button 
          className={\`premium-tab \${activeTab === 'Platform' ? 'active' : ''}\`}
          onClick={() => setActiveTab('Platform')}
        >
          <Settings size={16} /> Platform Features
        </button>`
);

platformSettings = platformSettings.replace(
  /<button \n          className={`detail-tab \${activeTab === 'Mobile App' \? 'active' : ''}`}\n          onClick={\(\) => setActiveTab\('Mobile App'\)}\n        >\n          <Smartphone size={16} \/> Mobile App Settings\n        <\/button>/g,
  `<button 
          className={\`premium-tab \${activeTab === 'Mobile App' ? 'active' : ''}\`}
          onClick={() => setActiveTab('Mobile App')}
        >
          <Smartphone size={16} /> Mobile App Settings
        </button>`
);

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);

// 2. Update MobileAppSettings.tsx
let mobileSettings = fs.readFileSync('src/components/MobileAppSettings.tsx', 'utf8');

// Update the container
mobileSettings = mobileSettings.replace(
  /<div className="settings-container" style={{ border: '1px solid var\(--border-color\)', borderRadius: '12px', background: 'white', minHeight: '600px' }}>/g,
  `<div className="settings-container" style={{ border: 'none', borderRadius: '16px', background: 'white', minHeight: '600px', boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>`
);

// Update sidebar background
mobileSettings = mobileSettings.replace(
  /<div className="settings-sidebar" style={{ width: '250px' }}>/g,
  `<div className="settings-sidebar premium-sidebar" style={{ width: '260px' }}>`
);

// Update active state in nav
mobileSettings = mobileSettings.replace(
  /className={`settings-nav-item \${activeTab === tab.id \? 'active' : ''}`}/g,
  `className={\`premium-nav-item \${activeTab === tab.id ? 'active' : ''}\`}`
);

// Update Table container
mobileSettings = mobileSettings.replace(
  /<div className="table-container">/g,
  `<div className="table-container premium-table-wrapper">`
);

// Update Warning box
mobileSettings = mobileSettings.replace(
  /<div style={{ padding: '16px', backgroundColor: 'rgba\(245, 158, 11, 0.05\)', border: '1px solid rgba\(245, 158, 11, 0.3\)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>/g,
  `<div className="premium-alert warning" style={{ marginBottom: '24px' }}>`
);

fs.writeFileSync('src/components/MobileAppSettings.tsx', mobileSettings);

// 3. Update PlatformPremium.css (or create if needed) to add these modern classes
let premiumCss = fs.readFileSync('src/components/PlatformPremium.css', 'utf8');

const newStyles = `
/* Modern Tabs */
.premium-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  background: #f8fafc;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-tab:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.premium-tab.active {
  background: #fef3c7;
  color: #d97706;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.15);
}

/* Modern Sidebar */
.premium-sidebar {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
  padding: 32px 24px;
}

.premium-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.premium-nav-item:hover {
  background: rgba(255, 255, 255, 0.5);
  color: #0f172a;
}

.premium-nav-item.active {
  background: white;
  color: #d97706;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.premium-nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #d97706;
  border-radius: 0 4px 4px 0;
}

/* Modern Table */
.premium-table-wrapper {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  overflow: hidden;
}

.premium-table-wrapper table {
  width: 100%;
  border-collapse: collapse;
}

.premium-table-wrapper th {
  background: #f8fafc;
  padding: 16px;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
}

.premium-table-wrapper td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #334155;
}

.premium-table-wrapper tr:last-child td {
  border-bottom: none;
}

.premium-table-wrapper tr:hover td {
  background: #f8fafc;
}

/* Premium Alert */
.premium-alert {
  padding: 20px;
  border-radius: 12px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}

.premium-alert.warning {
  background: linear-gradient(to right, #fffbeb, #fef3c7);
  border-left: 4px solid #f59e0b;
  border-top: 1px solid rgba(245, 158, 11, 0.2);
  border-right: 1px solid rgba(245, 158, 11, 0.2);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
}
`;

if (!premiumCss.includes('.premium-tab')) {
  fs.appendFileSync('src/components/PlatformPremium.css', newStyles);
}

console.log('Done!');
