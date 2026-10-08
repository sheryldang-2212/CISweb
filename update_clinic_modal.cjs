const fs = require('fs');
const file = 'src/components/PlatformNotificationSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import EditNotificationModal from './EditNotificationModal';",
  "import EditNotificationModal from './EditNotificationModal';\nimport EditClinicNotificationModal from './EditClinicNotificationModal';"
);

content = content.replace(
  "      {editingNotification && (",
  "      {editingNotification && activeTab === 'patient' && ("
);

content = content.replace(
  "        />\n      )}\n    </div>\n  );\n}",
  "        />\n      )}\n      {editingNotification && activeTab === 'clinic' && (\n        <EditClinicNotificationModal\n          notification={editingNotification}\n          onClose={() => setEditingNotification(null)}\n          onSave={() => setEditingNotification(null)}\n        />\n      )}\n    </div>\n  );\n}"
);

fs.writeFileSync(file, content);
console.log('Done!');
