const fs = require('fs');

// 1. Remove from Sidebar.tsx
let sidebar = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(
  "          { name: 'Platform Settings', icon: Settings },\n          { name: 'Notification Settings', icon: Bell },\n          { name: 'Global Test Master', icon: Database }",
  "          { name: 'Platform Settings', icon: Settings },\n          { name: 'Global Test Master', icon: Database }"
);
fs.writeFileSync('src/components/Sidebar.tsx', sidebar);

// 2. Remove from App.tsx rendering
let app = fs.readFileSync('src/App.tsx', 'utf8');
// remove import PlatformNotificationSettings from App.tsx
app = app.replace(
  "import PlatformNotificationSettings from './components/PlatformNotificationSettings';\n",
  ""
);
// remove route mapping
app = app.replace(
  "          {activeTab === 'Notification Settings' && <PlatformNotificationSettings />}\n",
  ""
);
fs.writeFileSync('src/App.tsx', app);

// 3. Add to PlatformSettings.tsx
let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// Add import
if (!platformSettings.includes('import PlatformNotificationSettings')) {
  platformSettings = platformSettings.replace(
    "import MobileAppSettings from './MobileAppSettings';",
    "import MobileAppSettings from './MobileAppSettings';\nimport PlatformNotificationSettings from './PlatformNotificationSettings';"
  );
}

// Add navItem
platformSettings = platformSettings.replace(
  "{ id: 'Integrations', title: 'Integrations', subtitle: 'SMS, payment, HL7/FHIR' },",
  "{ id: 'Integrations', title: 'Integrations', subtitle: 'SMS, payment, HL7/FHIR' },\n    { id: 'Notifications', title: 'Notifications', subtitle: 'Email, SMS, push templates' },"
);

// Add rendering for Notifications tab
const notificationRender = `
            {activeTab === 'Notifications' && (
              <div className="fadeIn h-full" style={{ margin: '-32px', height: 'calc(100% + 64px)' }}>
                <PlatformNotificationSettings />
              </div>
            )}
`;

platformSettings = platformSettings.replace(
  "            {activeTab !== 'Platform Features' && activeTab !== 'Mobile App' && (",
  notificationRender + "            {activeTab !== 'Platform Features' && activeTab !== 'Mobile App' && activeTab !== 'Notifications' && ("
);

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);

// 4. Update PlatformNotificationSettings to not have its own padding/margins if it's nested.
let notifSettings = fs.readFileSync('src/components/PlatformNotificationSettings.tsx', 'utf8');
notifSettings = notifSettings.replace(
  /<div className="dashboard-container h-full flex flex-col relative overflow-hidden bg-slate-50">/g,
  `<div className="settings-container" style={{ border: 'none', background: 'transparent', height: '100%', overflow: 'hidden' }}>`
);
// Since PlatformNotificationSettings also has detail-header, maybe we should remove it to prevent double header.
// It has:
//       <div className="detail-header" style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white' }}>
//         <div>
//           <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Platform Notification Settings</h1>
//           <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', marginBottom: 0 }}>Manage platform-wide notification templates and channels.</p>
//         </div>
//       </div>
// We can change its header to match the inner view style or just keep it but change its wrapper.
// Also it uses `detail-tabs`. Let's replace the outer container and let the header be.
fs.writeFileSync('src/components/PlatformNotificationSettings.tsx', notifSettings);

console.log('Done!');
