const fs = require('fs');

let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// 1. Remove from navItems
platformSettings = platformSettings.replace(
  "{ id: 'Platform Features', title: 'Platform Features', subtitle: 'Module feature flags' },\n    ",
  ""
);

// 2. Change default activeTab
platformSettings = platformSettings.replace(
  "const [activeTab, setActiveTab] = useState('Platform Features');",
  "const [activeTab, setActiveTab] = useState('Security & Access');"
);

// 3. Remove the Platform Features render block
const blockStart = "            {activeTab === 'Platform Features' && (";
// find the closing div of this block which is before `            {activeTab === 'Mobile App' && (`
const blockEndStr = "            {activeTab === 'Mobile App' && (";
const blockStartIndex = platformSettings.indexOf(blockStart);
const blockEndIndex = platformSettings.indexOf(blockEndStr);

if (blockStartIndex !== -1 && blockEndIndex !== -1) {
  platformSettings = platformSettings.substring(0, blockStartIndex) + platformSettings.substring(blockEndIndex);
}

// 4. Update the fallback logic
platformSettings = platformSettings.replace(
  "activeTab !== 'Platform Features' && ",
  ""
);

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);
console.log('Done!');
