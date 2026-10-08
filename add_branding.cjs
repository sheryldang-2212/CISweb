const fs = require('fs');

let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

const brandingContent = `
            {activeTab === 'Branding & Legal' && (
              <div className="max-w-3xl fadeIn">
                <div className="detail-card" style={{ padding: '32px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Branding & Legal</h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Last updated by [NAME] - [DATE TIME]</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Platform name</div>
                      <div style={{ width: '65%' }}>
                        <input type="text" defaultValue="Health Hub" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Logo</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>SVG or PNG, shown in the web app and patient app.</div>
                      </div>
                      <div style={{ width: '65%' }}>
                        <button style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '14px', color: '#3b82f6', fontWeight: 500, cursor: 'pointer' }}>Upload logo</button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Support email</div>
                      <div style={{ width: '65%' }}>
                        <input type="email" placeholder="[SUPPORT EMAIL]" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Support hotline</div>
                      <div style={{ width: '65%' }}>
                        <input type="text" placeholder="[HOTLINE]" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Terms of Service URL</div>
                      <div style={{ width: '65%' }}>
                        <input type="url" placeholder="https://" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ width: '30%', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Privacy Policy URL</div>
                      <div style={{ width: '65%' }}>
                        <input type="url" placeholder="https://" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
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

platformSettings = platformSettings.replace(
  "            {activeTab !== 'Platform Features' && activeTab !== 'Mobile App' && activeTab !== 'Notifications' && (",
  brandingContent + "\n            {activeTab !== 'Platform Features' && activeTab !== 'Mobile App' && activeTab !== 'Notifications' && activeTab !== 'Branding & Legal' && ("
);

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);

console.log('Done!');
