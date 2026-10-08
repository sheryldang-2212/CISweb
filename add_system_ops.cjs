const fs = require('fs');

let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

const systemOpsContent = `
            {activeTab === 'System Operations' && (
              <div className="max-w-3xl fadeIn">
                <div className="detail-card" style={{ padding: '32px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>System Operations</h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Last updated by [NAME] - [DATE TIME]</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
                      <div style={{ paddingRight: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Platform maintenance mode</h4>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>HIGH IMPACT</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                          Blocks sign-in for all non-admin users across every clinic.
                        </p>
                      </div>
                      <label className="toggle-switch shrink-0" style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                        <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#cbd5e1', transition: '.4s', borderRadius: '24px' }}>
                          <span style={{ position: 'absolute', height: '18px', width: '18px', left: '3px', bottom: '3px', backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                        </span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>Scheduled start</label>
                        <input type="datetime-local" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#475569' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>Scheduled end</label>
                        <input type="datetime-local" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', color: '#475569' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '2px' }}>Announcement banner</label>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' }}>Shown to all users before and during maintenance.</p>
                      <textarea rows={3} placeholder="[BANNER TEXT]" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>API rate limit (requests / minute / client)</div>
                      <div style={{ width: '150px' }}>
                        <input type="number" placeholder="[N]" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>Backups</div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Read-only status from infrastructure monitoring.</div>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#475569', marginTop: '4px' }}>
                        Last successful: [DATE TIME]
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
  "            {activeTab !== 'Platform Features' && activeTab !== 'Mobile App' && activeTab !== 'Notifications' && activeTab !== 'Branding & Legal' && (",
  systemOpsContent + "\n            {activeTab !== 'Platform Features' && activeTab !== 'Mobile App' && activeTab !== 'Notifications' && activeTab !== 'Branding & Legal' && activeTab !== 'System Operations' && ("
);

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);

console.log('Done!');
