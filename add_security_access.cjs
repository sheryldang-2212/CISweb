const fs = require('fs');

let fileContent = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

const securityAccessBlock = `
            {activeTab === 'Security & Access' && (
              <div className="max-w-3xl fadeIn">
                <div className="detail-card" style={{ padding: '32px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Security & Access</h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Last updated by [NAME] - [DATE TIME]</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Idle Session Timeout */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
                      <div style={{ paddingRight: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Idle session timeout</h4>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                          Users are signed out after inactivity.
                        </p>
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <select style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', minWidth: '150px' }}>
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                        </select>
                      </div>
                    </div>

                    {/* Account Lockout */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ paddingRight: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Account lockout</h4>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                          Lock after N failed sign-ins, for the set duration.
                        </p>
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', gap: '12px' }}>
                        <input type="number" defaultValue={5} style={{ width: '80px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                        <select style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', minWidth: '150px' }}>
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Changes take effect after saving and are written to Platform Audit Logs.
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '14px', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Discard changes</button>
                      <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#92700e', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Save Settings</button>
                    </div>
                  </div>

                </div>
              </div>
            )}
`;

fileContent = fileContent.replace(
  '<div className="settings-content" style={{ flex: 1, padding: \'32px\', overflowY: \'auto\', border: \'none\', borderRadius: \'0\' }}>',
  '<div className="settings-content" style={{ flex: 1, padding: \'32px\', overflowY: \'auto\', border: \'none\', borderRadius: \'0\' }}>\n' + securityAccessBlock
);

fs.writeFileSync('src/components/PlatformSettings.tsx', fileContent);
console.log('Done!');
