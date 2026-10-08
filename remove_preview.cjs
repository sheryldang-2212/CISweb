const fs = require('fs');
const file = 'src/components/MobileAppSettings.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove from tabs array
content = content.replace(
  "    { id: 'Consent Content', icon: ShieldCheck },\n    { id: 'Preview & Publish', icon: Eye }\n  ];",
  "    { id: 'Consent Content', icon: ShieldCheck }\n  ];"
);

// 2. Remove from section description
content = content.replace(
  "              {activeTab === 'Consent Content' && 'Configure text for T&C, Privacy Policy, and Data Sharing explanations.'}\n              {activeTab === 'Preview & Publish' && 'Review changes and publish to the live patient application.'}\n",
  "              {activeTab === 'Consent Content' && 'Configure text for T&C, Privacy Policy, and Data Sharing explanations.'}\n"
);

// 3. Remove "Review & Publish" button
content = content.replace(
  "            {activeTab !== 'Preview & Publish' && (\n              <button className=\"btn-primary\" onClick={() => setActiveTab('Preview & Publish')}>\n                Review & Publish <ChevronRight size={16} style={{ marginLeft: '4px' }} />\n              </button>\n            )}",
  ""
);

// 4. Remove the Preview & Publish section content
const previewStart = content.indexOf('        {/* Preview & Publish */}');
if (previewStart !== -1) {
  // Find the end of the section
  // It ends before the last two `</div>`
  const previewEndStr = "        )}\n\n      </div>\n    </div>\n  );\n}";
  const previewEnd = content.indexOf(previewEndStr);
  if (previewEnd !== -1) {
    content = content.substring(0, previewStart) + previewEndStr;
  }
}

fs.writeFileSync(file, content);
console.log('Done!');
