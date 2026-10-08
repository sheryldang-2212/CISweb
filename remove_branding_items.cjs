const fs = require('fs');

let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// Find the block for "Platform name" and "Logo" and remove it
const platformNameStr = `
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Platform name</div>
                      <div style={{ width: '65%' }}>
                        <input type="text" defaultValue="Health Hub" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>`;

const logoStr = `

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Logo</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>SVG or PNG, shown in the web app and patient app.</div>
                      </div>
                      <div style={{ width: '65%' }}>
                        <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '14px', color: '#3b82f6', fontWeight: 500, cursor: 'pointer' }}>Upload logo</button>
                      </div>
                    </div>`;

platformSettings = platformSettings.replace(platformNameStr, '');
platformSettings = platformSettings.replace(logoStr, '');

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);
console.log('Done!');
