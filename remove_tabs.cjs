const fs = require('fs');
const file = 'src/components/MobileAppSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Initial State
content = content.replace(
  "const [activeTab, setActiveTab] = useState('Dashboard Display');",
  "const [activeTab, setActiveTab] = useState('Questionnaire');"
);

// 2. Tabs array
content = content.replace(
  "    { id: 'Dashboard Display', icon: LayoutDashboard },\n    { id: 'Test Metrics', icon: Activity },\n",
  ""
);

// 3. Mock data
content = content.replace(
  "  // Mock data for Dashboard Display\n  const [categories] = useState([\n    { id: 'c1', nameEn: 'Metabolic', nameTh: 'เมตาบอลิก', order: 1, status: 'Active', metrics: 'Glucose, HbA1c, Insulin, Lipid Profile' },\n    { id: 'c2', nameEn: 'Cardio', nameTh: 'คาร์ดิโอ', order: 2, status: 'Active', metrics: 'hs-CRP, Homocysteine' },\n  ]);\n\n  // Mock data for Test Metrics\n  const [metrics] = useState([\n    { id: 'm1', code: 'LDL', nameEn: 'LDL Cholesterol', nameTh: 'LDL โคเลสเตอรอล', category: 'Cardio / Metabolic', unit: 'mg/dL', refLabel: 'Normal / High / Critical', order: 3, status: 'Active' },\n  ]);\n\n",
  ""
);

// 4. Section description
content = content.replace(
  "              {activeTab === 'Dashboard Display' && 'Configure health groups and mapping for the mobile dashboard.'}\n              {activeTab === 'Test Metrics' && 'Configure how specific lab metrics are displayed to patients.'}\n",
  ""
);

// 5. Sections to remove
const dashStart = content.indexOf('        {/* Dashboard Display */}');
const questStart = content.indexOf('        {/* Questionnaire */}');
content = content.substring(0, dashStart) + content.substring(questStart);

// 6. Preview & Publish change log
content = content.replace(
  "                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-main)' }}>\n                    <CheckCircle2 size={16} style={{ color: 'var(--success)' }} /> Modified display order in \"Dashboard Display\"\n                  </li>\n",
  ""
);

fs.writeFileSync(file, content);
console.log('Done!');
