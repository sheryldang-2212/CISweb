const fs = require('fs');
const file = 'src/components/PlatformNotificationSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import React, { useState } from 'react';",
  "import React, { useState } from 'react';\nimport EditNotificationModal from './EditNotificationModal';"
);

content = content.replace(
  "const [activeTab, setActiveTab] = useState('patient');",
  "const [activeTab, setActiveTab] = useState('patient');\n  const [editingNotification, setEditingNotification] = useState<any>(null);"
);

content = content.replace(
  "function NotificationRow({ event, trigger, channels }: { event: string, trigger: string, channels: string[] }) {",
  "function NotificationRow({ event, trigger, channels, category, onEdit }: { event: string, trigger: string, channels: string[], category: string, onEdit: () => void }) {"
);

content = content.replace(
  "<button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>",
  "<button onClick={onEdit} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>"
);

// Add category to each NotificationRow call
content = content.replace(/<NotificationRow event="(.*?)" trigger="(.*?)" channels=\{\[\'App\'\]\} \/>/g, (match, event, trigger) => {
  let category = '';
  if (event.includes('Lab report')) category = 'Lab reports';
  else if (event.includes('health check') || event.includes('Pre-employment')) category = 'Health check results';
  else if (event.includes('score') || event.includes('Wearable')) category = 'Health insights';
  else if (event.includes('message') || event.includes('Support')) category = 'Messages & support';
  else category = 'Account & security';

  return `<NotificationRow event="${event}" trigger="${trigger}" channels={['App']} category="${category}" onEdit={() => setEditingNotification({ event: "${event}", category: "${category}", trigger: "${trigger}", channels: ['App'] })} />`;
});

content = content.replace(
  "  return (\n    <div className=\"admin-section-card fadeIn\"",
  "  return (\n    <div className=\"admin-section-card fadeIn\""
);

// Add the modal rendering just before the end of the main component return
content = content.replace(
  "    </div>\n  );\n}",
  "      {editingNotification && (\n        <EditNotificationModal\n          notification={editingNotification}\n          onClose={() => setEditingNotification(null)}\n          onSave={() => setEditingNotification(null)}\n        />\n      )}\n    </div>\n  );\n}"
);

fs.writeFileSync(file, content);
console.log('Done!');
