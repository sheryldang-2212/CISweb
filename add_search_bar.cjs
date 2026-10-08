const fs = require('fs');

let fileContent = fs.readFileSync('src/components/MobileAppSettings.tsx', 'utf8');

// 1. Add Search to imports
if (!fileContent.includes('Search } from \'lucide-react\'')) {
  fileContent = fileContent.replace(
    "Phone } from 'lucide-react';",
    "Phone, Search } from 'lucide-react';"
  );
}

// 2. Add the search bar before the Save Draft button
const searchBarCode = `
            {activeTab === 'Phone code' && (
              <div className="search-container" style={{ position: 'relative', width: '240px', display: 'flex', alignItems: 'center' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', color: '#94a3b8' }} />
                <input type="text" placeholder="Search country or code..." style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
              </div>
            )}
`;

// It's inside:
//           <div style={{ display: 'flex', gap: '12px' }}>
//             <button className="btn-secondary" onClick={handleSaveDraft} disabled={isSaving}>

fileContent = fileContent.replace(
  "          <div style={{ display: 'flex', gap: '12px' }}>\n            <button className=\"btn-secondary\"",
  "          <div style={{ display: 'flex', gap: '12px' }}>\n" + searchBarCode + "            <button className=\"btn-secondary\""
);

fs.writeFileSync('src/components/MobileAppSettings.tsx', fileContent);
console.log('Done!');
