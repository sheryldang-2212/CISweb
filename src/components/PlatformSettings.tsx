import { useState } from 'react';
import { Settings, Save, Smartphone, Shield, Lock, Globe, Building2, Link, Server, Palette } from 'lucide-react';
import './Dashboard.css';
import MobileAppSettings from './MobileAppSettings';
import PlatformNotificationSettings from './PlatformNotificationSettings';

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState('Security & Access');
  const [multiTenantEnabled, setMultiTenantEnabled] = useState(true);
  const [globalNotifEnabled, setGlobalNotifEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePlatformSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Platform settings saved and recorded in audit log.');
    }, 1000);
  };

  const navItems = [
    { id: 'Security & Access', title: 'Security & Access', subtitle: 'Password, MFA, session, SSO' },
    { id: 'Notifications', title: 'Notifications', subtitle: 'Email, SMS, push templates' },
    { id: 'Mobile App', title: 'Mobile App', subtitle: 'Versions, force update' },
    { id: 'System Operations', title: 'System Operations', subtitle: 'Maintenance, rate limits' },
    { id: 'Branding & Legal', title: 'Branding & Legal', subtitle: 'Name, logo, policies' },
  ];

  return (
    <div className="dashboard-container h-full flex flex-col relative overflow-hidden bg-slate-50">
      <div className="detail-header" style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Platform Settings</h1>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px', marginBottom: 0 }}>Manage platform-wide features, security, and mobile app configurations.</p>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '24px' }}>
        <div className="settings-container" style={{ border: 'none', borderRadius: '16px', background: 'white', minHeight: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden', display: 'flex' }}>
          
          <div className="premium-sidebar" style={{ width: '280px', flexShrink: 0, overflowY: 'auto' }}>
            <div className="settings-nav">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`premium-nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                  style={{ padding: '12px 16px' }}
                >
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-content" style={{ flex: 1, padding: '32px', overflowY: 'auto', border: 'none', borderRadius: '0' }}>

            {activeTab === 'Security & Access' && (
              <div className="max-w-3xl fadeIn">
                <div className="detail-card" style={{ padding: '32px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Security & Access</h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Last updated by [NAME] - [DATE TIME]</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Idle Session Timeout */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>
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

            {activeTab === 'Mobile App' && (
              <div className="fadeIn h-full" style={{ margin: '-32px', height: 'calc(100% + 64px)' }}>
                <MobileAppSettings />
              </div>
            )}
            

            {activeTab === 'Notifications' && (
              <div className="fadeIn h-full" style={{ margin: '-32px', height: 'calc(100% + 64px)' }}>
                <PlatformNotificationSettings />
              </div>
            )}

            {activeTab === 'Branding & Legal' && (
              <div className="max-w-3xl fadeIn">
                <div className="detail-card" style={{ padding: '32px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Branding & Legal</h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Last updated by [NAME] - [DATE TIME]</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    

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

            {activeTab !== 'Mobile App' && activeTab !== 'Notifications' && activeTab !== 'Branding & Legal' && activeTab !== 'System Operations' && (
              <div className="fadeIn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                <div style={{ textAlign: 'center' }}>
                  <Settings size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
                  <p>Configuration for {activeTab} will be available in the next release.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
