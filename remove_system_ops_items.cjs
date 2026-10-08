const fs = require('fs');

let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// Find the block for "API rate limit" and "Backups" and remove it
const apiRateLimitStr = `
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>API rate limit (requests / minute / client)</div>
                      <div style={{ width: '150px' }}>
                        <input type="number" placeholder="[N]" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>`;

const backupsStr = `

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Backups</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Read-only status from infrastructure monitoring.</div>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#475569', marginTop: '4px' }}>
                        Last successful: [DATE TIME]
                      </div>
                    </div>`;

platformSettings = platformSettings.replace(apiRateLimitStr, '');
platformSettings = platformSettings.replace(backupsStr, '');

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);
console.log('Done!');
