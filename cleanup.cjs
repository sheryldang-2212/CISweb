const fs = require('fs');

function removeUnused(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  fs.writeFileSync(filePath, content);
}

// ClinicSettings.tsx
removeUnused('src/components/ClinicSettings.tsx', [
  { search: /Bell,\s*/g, replace: '' },
  { search: /const NOTIFICATION_SECTIONS = \[[\s\S]*?\];/g, replace: '' },
  { search: /function NotificationRow\(\{.*?\}\) \{[\s\S]*?\n\}/g, replace: '' }
]);

// Dashboard.tsx
removeUnused('src/components/Dashboard.tsx', [
  { search: /Lock,\s*/g, replace: '' },
  { search: /const daysDiff = Math.floor\(diffTime \/ \(1000 \* 60 \* 60 \* 24\)\);/g, replace: '' }
]);

// EditClinicNotificationModal.tsx
removeUnused('src/components/EditClinicNotificationModal.tsx', [
  { search: /import React(,\s*\{\s*useState\s*\})? from 'react';/, replace: "import { useState } from 'react';" }
]);

// EditNotificationModal.tsx
removeUnused('src/components/EditNotificationModal.tsx', [
  { search: /import React(,\s*\{\s*useState\s*\})? from 'react';/, replace: "import { useState } from 'react';" }
]);

// PatientForm.tsx
removeUnused('src/components/PatientForm.tsx', [
  { search: /import React(,\s*\{\s*useState\s*\})? from 'react';/, replace: "import { useState } from 'react';" }
]);

// PlatformNotificationSettings.tsx
removeUnused('src/components/PlatformNotificationSettings.tsx', [
  { search: /import React(,\s*\{\s*useState\s*\})? from 'react';/, replace: "import { useState } from 'react';" },
  { search: /\(category, categoryIndex\)/g, replace: "(_category, categoryIndex)" },
  { search: /\(category\)/g, replace: "(_category)" }
]);

// MobileAppSettings.tsx
removeUnused('src/components/MobileAppSettings.tsx', [
  { search: /LayoutDashboard, Activity, Eye, CheckCircle2, ChevronRight, Globe,\s*/g, replace: '' },
  { search: /LayoutDashboard,\s*Activity,\s*Eye,\s*CheckCircle2,\s*ChevronRight,\s*Globe(,\s*)?/g, replace: '' },
  { search: /const \[lastSaved, setLastSaved\] = useState\(''\);/g, replace: '' },
  { search: /const handlePublish = \(\) => \{[\s\S]*?\};/g, replace: '' }
]);

// PlatformDashboard.tsx
removeUnused('src/components/PlatformDashboard.tsx', [
  { search: /RefreshCw,\s*/g, replace: '' }
]);

// PlatformSettings.tsx
removeUnused('src/components/PlatformSettings.tsx', [
  { search: /Save, Smartphone, Shield, Lock, Globe, Building2, Link, Server, Palette(,\s*)?/g, replace: '' },
  { search: /Save,\s*Smartphone,\s*Shield,\s*Lock,\s*Globe,\s*Building2,\s*Link,\s*Server,\s*Palette(,\s*)?/g, replace: '' },
  { search: /const \[multiTenantEnabled, setMultiTenantEnabled\] = useState\(true\);/g, replace: '' },
  { search: /const \[globalNotifEnabled, setGlobalNotifEnabled\] = useState\(true\);/g, replace: '' },
  { search: /const \[isSaving, setIsSaving\] = useState\(false\);/g, replace: '' },
  { search: /const handleSavePlatformSettings = async \(\) => \{[\s\S]*?setIsSaving\(false\);\n  \};/g, replace: '' }
]);

// ReportsAnalytics.tsx
removeUnused('src/components/ReportsAnalytics.tsx', [
  { search: /const activeDemographicsLabData = [^;]*;/g, replace: '' }
]);

// Sidebar.tsx
removeUnused('src/components/Sidebar.tsx', [
  { search: /Bell,\s*/g, replace: '' }
]);

// UserManagement.tsx
removeUnused('src/components/UserManagement.tsx', [
  { search: /PowerOff, /g, replace: '' },
  { search: /Play, Shield, /g, replace: '' },
  { search: /const handleResendInvite = \([^)]*\) => \{[\s\S]*?\};\n/g, replace: '' },
  { search: /const handleCancelInvite = \([^)]*\) => \{[\s\S]*?\};\n/g, replace: '' },
  { search: /const handleReactivate = \([^)]*\) => \{[\s\S]*?\};\n/g, replace: '' }
]);

// VerifyIdentityModal.tsx
removeUnused('src/components/VerifyIdentityModal.tsx', [
  { search: /import \{\s*useState\s*\}\s*from\s*'react';/g, replace: '' } // If it's unused
]);

console.log('Cleanup script executed.');
